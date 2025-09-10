// src/components/JobCard.jsx
import React, { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, Paperclip, Wallet, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import NegotiationModal from "./NegotiationModal";

/**
 * JobCard — liquid glass style, optimized, memoized
 *
 * Props:
 * - role: "worker" | "client"
 * - job: object (id, title, description, fee, feeLabel, distance, time, attachments, paymentMethod, type)
 * - visible: boolean
 * - onClose: fn(jobId) optional (used for swipe-to-dismiss)
 * - onAcceptClick: fn(job) optional (action for accept)
 * - onAccepted: fn(amount) optional (callback after acceptance)
 */

const safeText = (v = "") =>
    String(v || "")
        .replace(/<[^>]*>/g, "") // strip tags
        .replace(/\b(?:https?:|mailto:|ftp:|javascript:)[^\s]*/gi, "") // strip protocols/links
        .replace(/https?:\/\/[^\s]+/gi, "")
        .replace(/\s{2,}/g, " ")
        .trim()
        .slice(0, 1200);

const formatCurrency = (num) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num || 0);

function Pill({ children, className = "" }) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
            role="status"
            aria-hidden
        >
            {children}
        </span>
    );
}

function JobCardInner({
    role,
    job,
    onClose,
    onAcceptClick,
    onAccepted,
    reduceMotion,
}) {
    const [expanded, setExpanded] = useState(false);
    const [showNegotiation, setShowNegotiation] = useState(false);
    const [proposals, setProposals] = useState([]);
    const [actionState, setActionState] = useState(null); // 'accepting' | 'rejecting' | null

    const desc = useMemo(() => safeText(job.description || ""), [job.description]);
    const isLong = desc.length > 80;
    const displayDesc = expanded ? desc : desc.slice(0, 80);

    const handleSendOffer = useCallback(
        (amount) => {
            const newProposal = { ts: Date.now(), from: role, amount, status: "pending" };
            setProposals((p) => [newProposal, ...p]);
        },
        [role]
    );

    const handleAcceptProposal = useCallback(
        (p) => {
            setProposals((prev) => prev.map((x) => (x.ts === p.ts ? { ...x, status: "accepted" } : x)));
            onAccepted?.(p.amount);
            setShowNegotiation(false);
        },
        [onAccepted]
    );

    const handleRejectProposal = useCallback(
        (p) => {
            setProposals((prev) => prev.map((x) => (x.ts === p.ts ? { ...x, status: "rejected" } : x)));
        },
        []
    );

    const onAccept = useCallback(async () => {
        setActionState("accepting");
        onAcceptClick?.(job);
        // small visual delay for feedback
        await new Promise((r) => setTimeout(r, 420));
        setActionState(null);
    }, [job, onAcceptClick]);

    const onReject = useCallback(async () => {
        setActionState("rejecting");
        onClose?.(job.id);
        await new Promise((r) => setTimeout(r, 300));
        setActionState(null);
    }, [job.id, onClose]);

    // motion variants
    const cardVariant = reduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 18 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 18 },
        };

    const btnTap = { scale: 0.98 };

    return (
        <motion.div
            layout
            initial="initial"
            animate="animate"
            exit="exit"
            variants={cardVariant}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
                if (info.offset.x < -120) onClose?.(job.id);
            }}
            whileHover={!reduceMotion ? { scale: 1.01 } : {}}
            className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-xl shadow-md p-4 mb-4 transition-all duration-300 hover:shadow-lg"
            role="article"
            aria-labelledby={`job-${job.id}-title`}
        >
            {/* header */}
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 id={`job-${job.id}-title`} className="text-base font-semibold text-foreground truncate">
                        {safeText(job.title)}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <Pill className="bg-background/10 text-muted-foreground">
                            {job.type === "onsite" ? "Onsite" : job.type === "remote" ? "Remote" : "Micro"}
                        </Pill>
                        <span aria-hidden className="hidden sm:inline">•</span>
                        <span>{safeText(job.client || "")}</span>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                    <div className="text-sm font-semibold text-foreground">{job.feeLabel || formatCurrency(job.fee)}</div>
                    <div className="text-[12px] text-muted-foreground">{job.time}</div>
                </div>
            </div>

            {/* description */}
            <p className="mt-3 text-sm text-foreground/90 leading-snug">
                {displayDesc}
                {isLong && (
                    <button
                        onClick={() => setExpanded((s) => !s)}
                        className="ml-2 text-accent text-xs hover:underline transition-colors duration-300"
                        aria-expanded={expanded}
                    >
                        {expanded ? "Ringkas" : "Detail"}
                    </button>
                )}
            </p>

            {/* meta */}
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                {job.distance && (
                    <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-accent" /> {safeText(job.distance)}
                    </span>
                )}
                {job.time && (
                    <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-secondary" /> {safeText(job.time)}
                    </span>
                )}
                {job.attachments?.length > 0 && (
                    <span className="flex items-center gap-1">
                        <Paperclip className="h-4 w-4 text-primary" /> {job.attachments.length} file
                    </span>
                )}
                {job.paymentMethod && (
                    <span className="flex items-center gap-1">
                        <Wallet className="h-4 w-4 text-accent" /> {job.paymentMethod === "cash" ? "Tunai" : "Wallet"}
                    </span>
                )}
            </div>

            {/* CTA */}
            <div className="mt-4 flex gap-2">
                {role === "worker" ? (
                    <>
                        <motion.button
                            whileTap={btnTap}
                            onClick={onAccept}
                            disabled={actionState === "accepting"}
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-300 hover:bg-primary/90 disabled:opacity-60"
                            aria-pressed={actionState === "accepting"}
                            aria-label="Terima pekerjaan"
                            type="button"
                        >
                            {actionState === "accepting" ? <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9 }}><Check className="h-4 w-4" /></motion.span> : <span>Terima</span>}
                        </motion.button>

                        <motion.button
                            whileTap={btnTap}
                            onClick={() => setShowNegotiation(true)}
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-accent text-accent px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-accent/10"
                            type="button"
                            aria-label="Negosiasi"
                        >
                            Negosiasi
                        </motion.button>
                    </>
                ) : (
                    <motion.button
                        whileTap={btnTap}
                        onClick={() => setShowNegotiation(true)}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-secondary text-secondary px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-secondary/10"
                        type="button"
                        aria-label="Lihat negosiasi"
                    >
                        Lihat Negosiasi
                    </motion.button>
                )}
            </div>

            {/* small accept/reject controls shown only when proposals exist (compact UI) */}
            <div className="mt-3 space-y-2">
                {proposals.map((p) => (
                    <div key={p.ts} className="flex items-center justify-between rounded-lg border border-border/30 bg-background/10 px-3 py-2 text-sm">
                        <div>
                            <div className="font-medium">{formatCurrency(p.amount)}</div>
                            <div className="text-[11px] text-muted-foreground">{p.status}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            {p.status === "pending" && (
                                <>
                                    <Button size="sm" variant="ghost" onClick={() => handleAcceptProposal(p)}><Check className="h-4 w-4" /></Button>
                                    <Button size="sm" variant="ghost" onClick={() => handleRejectProposal(p)}><X className="h-4 w-4" /></Button>
                                </>
                            )}
                            {p.status === "accepted" && <Pill className="bg-emerald-100 text-emerald-600">Diterima</Pill>}
                            {p.status === "rejected" && <Pill className="bg-destructive/10 text-destructive">Ditolak</Pill>}
                        </div>
                    </div>
                ))}
            </div>

            {/* negotiation modal */}
            <NegotiationModal
                role={role}
                job={job}
                open={showNegotiation}
                onClose={() => setShowNegotiation(false)}
                proposals={proposals}
                onSendOffer={handleSendOffer}
                onAccept={handleAcceptProposal}
                onReject={handleRejectProposal}
            />
        </motion.div>
    );
}

const JobCard = React.memo(function JobCard(props) {
    const reduceMotion = useReducedMotion();
    // quick bailouts
    if (!props.visible || !props.job) return null;
    return <JobCardInner {...props} reduceMotion={reduceMotion} />;
});

export default JobCard;
