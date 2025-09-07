// components/JobCard.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Paperclip, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import NegotiationModal from "./NegotiationModal";

export default function JobCard({
    role = "worker",
    job,
    visible = true,
    onClose,
    onAcceptClick,
    onAccepted,
}) {
    const [showNegotiation, setShowNegotiation] = useState(false);
    const [proposals, setProposals] = useState([]);
    const [expanded, setExpanded] = useState(false);

    if (!visible || !job) return null;

    // Helper format uang
    const formatCurrency = (num) =>
        "Rp " + Number(num || 0).toLocaleString("id-ID");

    // Prevent XSS/script injection
    const safeText = (text) => {
        if (!text) return "";
        return text.replace(/<[^>]*>?/gm, "").replace(/(https?:\/\/[^\s]+)/g, "");
    };

    // Deskripsi short/long toggle
    const desc = safeText(job.description || "");
    const isLong = desc.length > 40;
    const displayDesc = expanded ? desc : desc.slice(0, 40);

    const handleSendOffer = (amount) => {
        const newProposal = {
            ts: Date.now(),
            from: role,
            amount,
            status: "pending",
        };
        setProposals((prev) => [...prev, newProposal]);
    };

    const handleAccept = (p) => {
        setProposals((prev) =>
            prev.map((x) =>
                x.ts === p.ts ? { ...x, status: "accepted" } : x
            )
        );
        onAccepted?.(p.amount);
        setShowNegotiation(false);
    };

    const handleReject = (p) => {
        setProposals((prev) =>
            prev.map((x) =>
                x.ts === p.ts ? { ...x, status: "rejected" } : x
            )
        );
    };

    return (
        <AnimatePresence>
            <motion.div
                key={job.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                    if (info.offset.x < -120) onClose?.(job.id);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative rounded-2xl border border-border bg-card/70 backdrop-blur-xl 
                   shadow-lg p-5 mb-4 cursor-grab active:cursor-grabbing 
                   transition-all duration-350 hover:shadow-xl hover:border-accent"
                whileHover={{ scale: 1.02 }}
            >
                {/* HEADER */}
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">
                            {job.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {job.type === "onsite" ? "Onsite" : "Remote"}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-primary font-bold">{job.feeLabel}</div>
                        <div className="text-xs text-muted-foreground">{job.time}</div>
                    </div>
                </div>

                {/* BODY */}
                <p className="mt-3 text-sm text-foreground/90">
                    {displayDesc}
                    {isLong && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="ml-2 text-accent text-xs hover:underline transition-colors duration-300"
                        >
                            {expanded ? "Ringkas" : "Selengkapnya"}
                        </button>
                    )}
                </p>

                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {job.distance && (
                        <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-accent" /> {job.distance}
                        </span>
                    )}
                    {job.time && (
                        <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-secondary" /> {job.time}
                        </span>
                    )}
                    {job.attachments?.length > 0 && (
                        <span className="flex items-center gap-1">
                            <Paperclip className="h-4 w-4 text-primary" />{" "}
                            {job.attachments.length} file
                        </span>
                    )}
                    {job.paymentMethod && (
                        <span className="flex items-center gap-1">
                            <Wallet className="h-4 w-4 text-accent" />{" "}
                            {job.paymentMethod === "cash" ? "Tunai" : "Saldo Wallet"}
                        </span>
                    )}
                </div>

                {/* CTA */}
                <div className="mt-5 flex gap-2">
                    {role === "worker" ? (
                        <>
                            <Button
                                className="flex-1 bg-primary text-white 
                           hover:bg-primary/90 
                           transition-colors duration-350"
                                onClick={onAcceptClick}
                            >
                                Terima
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 border-accent text-accent 
                           hover:bg-accent hover:text-white 
                           transition-colors duration-350"
                                onClick={() => setShowNegotiation(true)}
                            >
                                Negosiasi
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="outline"
                            className="flex-1 border-secondary text-secondary 
                         hover:bg-secondary hover:text-white 
                         transition-colors duration-350"
                            onClick={() => setShowNegotiation(true)}
                        >
                            Lihat Negosiasi
                        </Button>
                    )}
                </div>

                {/* NEGOTIATION MODAL */}
                <NegotiationModal
                    role={role}
                    job={job}
                    open={showNegotiation}
                    onClose={() => setShowNegotiation(false)}
                    proposals={proposals}
                    onSendOffer={handleSendOffer}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            </motion.div>
        </AnimatePresence>
    );
}
