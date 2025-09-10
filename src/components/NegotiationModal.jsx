// src/components/NegotiationModal.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, DollarSign, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * NegotiationModal (refactor)
 * - Liquid glass look via bg-card/80 + backdrop-blur-xl
 * - Sanitized numeric input only
 * - Quick offers, history list, accept/reject flows
 * - Reduced-motion friendly
 * - Accessible (aria attrs)
 *
 * Props:
 * - role: "worker" | "client"
 * - job: object (optional)
 * - open: boolean
 * - onClose: fn()
 * - proposals: array of { ts, from, amount, status }
 * - onSendOffer: fn(amount)
 * - onAccept: fn(proposal)
 * - onReject: fn(proposal)
 * - locked: boolean (disable actions)
 */

const formatCurrency = (num) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num || 0);

// sanitize input for numeric-only (returns string of digits)
const sanitizeNumeric = (v = "") => String(v).replace(/[^\d]/g, "").slice(0, 12);

// small visual pill
const SmallPill = ({ children, className = "" }) => (
    <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
        role="status"
    >
        {children}
    </span>
);

export default React.memo(function NegotiationModal({
    role = "worker",
    job = null,
    open = false,
    onClose = () => { },
    proposals = [],
    onSendOffer = () => { },
    onAccept = () => { },
    onReject = () => { },
    locked = false,
}) {
    const [counterValue, setCounterValue] = useState("");
    const [localProposals, setLocalProposals] = useState(() => proposals || []);

    useEffect(() => {
        setLocalProposals(proposals || []);
    }, [proposals]);

    // quick amounts derived from job.fee
    const quickAmounts = useMemo(() => {
        const base = Number(job?.fee || 0);
        if (!base) return [];
        return [0.8, 1, 1.2].map((m) => Math.round(base * m));
    }, [job?.fee]);

    const handleSendOffer = useCallback(() => {
        if (locked) return;
        const amount = Number(sanitizeNumeric(counterValue)) || Number(job?.fee || 0);
        if (!amount || amount <= 0) return;
        const proposal = { ts: Date.now(), from: role, amount, status: "pending" };
        setLocalProposals((p) => [proposal, ...p]);
        onSendOffer?.(amount);
        setCounterValue("");
    }, [counterValue, job?.fee, onSendOffer, role, locked]);

    const handleQuickOffer = useCallback(
        (amt) => {
            if (locked) return;
            const proposal = { ts: Date.now(), from: role, amount: amt, status: "pending" };
            setLocalProposals((p) => [proposal, ...p]);
            onSendOffer?.(amt);
        },
        [onSendOffer, role, locked]
    );

    const handleAccept = useCallback(
        (p) => {
            if (locked) return;
            setLocalProposals((prev) => prev.map((x) => (x.ts === p.ts ? { ...x, status: "accepted" } : x)));
            onAccept?.(p);
        },
        [onAccept, locked]
    );

    const handleReject = useCallback(
        (p) => {
            if (locked) return;
            setLocalProposals((prev) => prev.map((x) => (x.ts === p.ts ? { ...x, status: "rejected" } : x)));
            onReject?.(p);
        },
        [onReject, locked]
    );

    // motion variants
    const backdrop = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
    const panel = { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 20, opacity: 0 } };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-6"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {/* backdrop */}
                    <motion.button
                        aria-hidden
                        onClick={() => !locked && onClose()}
                        className="absolute inset-0 bg-black/40"
                        variants={backdrop}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    />

                    {/* panel */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="negotiation-title"
                        variants={panel}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.28 }}
                        className="w-full max-w-md rounded-2xl border border-border bg-card/90 backdrop-blur-xl p-4 shadow-2xl"
                    >
                        {/* header */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="h-5 w-5 text-accent" />
                                <div>
                                    <div id="negotiation-title" className="text-sm font-semibold text-foreground">
                                        Negosiasi
                                    </div>
                                    <div className="text-xs text-muted-foreground truncate" title={job?.title || ""}>
                                        {job?.title ? job.title : "—"}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <SmallPill className="bg-background/10 text-muted-foreground">{role}</SmallPill>
                                <button
                                    onClick={() => !locked && onClose()}
                                    aria-label="Tutup"
                                    className="rounded-md p-1 text-xs text-muted-foreground hover:text-accent transition-colors duration-300"
                                >
                                    <XIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* history */}
                        <div className="mt-3 max-h-44 overflow-y-auto pr-2 space-y-2">
                            {localProposals.length === 0 ? (
                                <div className="text-xs text-muted-foreground">Belum ada penawaran.</div>
                            ) : (
                                localProposals.map((p) => {
                                    const accepted = p.status === "accepted";
                                    const rejected = p.status === "rejected";
                                    return (
                                        <div
                                            key={p.ts}
                                            className={`flex items-center justify-between gap-3 rounded-lg p-2 border ${accepted ? "border-accent/80 bg-accent/8" : "border-border/40 bg-background/10"
                                                }`}
                                        >
                                            <div className="min-w-0">
                                                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{p.from}</div>
                                                <div className="text-sm font-medium text-foreground">{formatCurrency(p.amount)}</div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {p.status === "pending" &&
                                                    ((role === "worker" && p.from === "client") || (role === "client" && p.from === "worker")) ? (
                                                    <>
                                                        <Button size="sm" disabled={locked} onClick={() => handleAccept(p)}>
                                                            Terima
                                                        </Button>
                                                        <Button size="sm" variant="outline" disabled={locked} onClick={() => handleReject(p)}>
                                                            Tolak
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <div className={`text-xs ${accepted ? "text-accent" : rejected ? "text-destructive" : "text-muted-foreground"}`}>
                                                        {p.status}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* quick offers (worker only) */}
                        {role === "worker" && (
                            <div className="mt-3">
                                <div className="text-xs font-medium text-muted-foreground mb-2">Penawaran cepat</div>
                                <div className="flex flex-wrap gap-2">
                                    {quickAmounts.length ? (
                                        quickAmounts.map((amt) => (
                                            <Button
                                                key={amt}
                                                size="sm"
                                                variant="outline"
                                                disabled={locked}
                                                onClick={() => handleQuickOffer(amt)}
                                                className="hover:bg-accent/8 transition duration-300"
                                            >
                                                {formatCurrency(amt)}
                                            </Button>
                                        ))
                                    ) : (
                                        <div className="text-xs text-muted-foreground">Tidak tersedia</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* counter input */}
                        {role === "worker" && (
                            <div className="mt-3 flex gap-2">
                                <div className="flex-1">
                                    <label className="sr-only">Jumlah tawaran</label>
                                    <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/30 px-3 py-2">
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                        <input
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            placeholder={job?.fee ? formatCurrency(job.fee) : "Masukkan jumlah"}
                                            value={counterValue}
                                            disabled={locked}
                                            onChange={(e) => setCounterValue(sanitizeNumeric(e.target.value))}
                                            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                                            aria-label="Masukkan jumlah tawaran"
                                            maxLength={12}
                                        />
                                    </div>
                                </div>

                                <Button disabled={locked} onClick={handleSendOffer} className="whitespace-nowrap">
                                    <DollarSign className="h-4 w-4 mr-1" /> Kirim
                                </Button>
                            </div>
                        )}

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});
