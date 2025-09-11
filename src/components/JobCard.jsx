import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Calendar, Paperclip, Wallet, Tag } from "lucide-react";

// Sanitizer biar aman
const safeText = (v = "") =>
    String(v || "")
        .replace(/<[^>]*>/g, "")
        .replace(/\b(?:https?:|mailto:|ftp:|javascript:)[^\s]*/gi, "")
        .replace(/https?:\/\/[^\s]+/gi, "")
        .replace(/\s{2,}/g, " ")
        .trim()
        .slice(0, 800);

const formatCurrency = (num) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(num || 0);

function Pill({ children, className = "" }) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
        >
            {children}
        </span>
    );
}

function JobCardInner({
    role = "client",
    job,
    onClose,
    onAcceptClick,
    onNegotiationClick,
    reduceMotion,
}) {
    const [expanded, setExpanded] = useState(false);
    const desc = useMemo(() => safeText(job.description || ""), [job.description]);
    const isLong = desc.length > 80;
    const displayDesc = expanded ? desc : desc.slice(0, 80);

    const btnTap = { scale: 0.97 };
    const cardVariant = reduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 12 },
        };

    return (
        <motion.div
            layout
            variants={cardVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
                if (info.offset.x < -120) onClose?.(job.id);
            }}
            whileHover={!reduceMotion ? { scale: 1.01 } : {}}
            className="relative rounded-2xl border border-border bg-card/40 backdrop-blur-xl shadow-md p-3 sm:p-5 mb-3 transition-all duration-350 hover:shadow-lg"
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    {job.title && (
                        <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">
                            {safeText(job.title)}
                        </h3>
                    )}
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                        {job.type && (
                            <Pill className="bg-background/10 text-muted-foreground">
                                {job.type === "onsite"
                                    ? "Onsite"
                                    : job.type === "remote"
                                        ? "Remote"
                                        : "Micro"}
                            </Pill>
                        )}
                        {job.client && (
                            <span className="truncate max-w-[9rem] sm:max-w-xs">
                                {safeText(job.client)}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    {job.fee && (
                        <div className="text-sm font-semibold text-foreground">
                            {job.feeLabel || formatCurrency(job.fee)}
                        </div>
                    )}
                    {job.time && (
                        <div className="text-[11px] text-muted-foreground">
                            {safeText(job.time)}
                        </div>
                    )}
                </div>
            </div>

            {/* Description */}
            {desc && (
                <p className="mt-2 text-xs sm:text-sm text-foreground/90 leading-snug">
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
            )}

            {/* Meta */}
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] sm:text-xs text-muted-foreground items-center">
                {job.category && (
                    <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                        {safeText(job.category)}
                    </span>
                )}
                {job.skills?.length > 0 && (
                    <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                        {job.skills.slice(0, 3).join(", ")}
                    </span>
                )}
                {job.deadline && (
                    <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                        {safeText(job.deadline)}
                    </span>
                )}
                {job.distance && (
                    <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                        {safeText(job.distance)}
                    </span>
                )}
                {job.attachments?.length > 0 && (
                    <span className="flex items-center gap-1">
                        <Paperclip className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                        {job.attachments.length}
                    </span>
                )}
                {job.paymentMethod && (
                    <span className="flex items-center gap-1">
                        <Wallet className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                        {job.paymentMethod === "cash" ? "Tunai" : "Wallet"}
                    </span>
                )}
            </div>

            {/* Actions */}
            {role === "worker" ? (
                <div className="mt-3 flex gap-2">
                    <motion.button
                        whileTap={btnTap}
                        onClick={() => onAcceptClick?.(job)}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-3 py-2 text-xs sm:text-sm font-semibold shadow-sm transition-all duration-300 hover:bg-primary/90"
                        aria-label="Terima pekerjaan"
                        type="button"
                    >
                        Terima
                    </motion.button>
                    <motion.button
                        whileTap={btnTap}
                        onClick={() => onNegotiationClick?.(job)}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-accent text-accent px-3 py-2 text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-accent/10"
                        aria-label="Negosiasi"
                        type="button"
                    >
                        Negosiasi
                    </motion.button>
                </div>
            ) : (
                <div className="mt-3">
                    <motion.button
                        whileTap={btnTap}
                        onClick={() => onNegotiationClick?.(job)}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-secondary text-primary px-3 py-2 text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-secondary/10"
                        aria-label="Lihat negosiasi"
                        type="button"
                    >
                        Lihat Negosiasi
                    </motion.button>
                </div>
            )}
        </motion.div>
    );
}

const JobCard = React.memo((props) => {
    const reduceMotion = useReducedMotion();
    if (!props.visible || !props.job) return null;
    return <JobCardInner {...props} reduceMotion={reduceMotion} />;
});

export default JobCard;
