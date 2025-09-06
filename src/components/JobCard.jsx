// components/JobCard.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import NegotiationModal from "./NegotiationModal";

export default function JobCard({
    role = "worker", // "worker" | "client"
    job,
    visible = true,
    onClose,
    onAcceptClick,
    onAccepted,
}) {
    const [showNegotiation, setShowNegotiation] = useState(false);
    const [proposals, setProposals] = useState([]);

    if (!visible || !job) return null;

    const formatCurrency = (num) =>
        "Rp " + Number(num || 0).toLocaleString("id-ID");

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
            prev.map((x) => (x.ts === p.ts ? { ...x, status: "accepted" } : x))
        );
        onAccepted?.(p.amount);
        setShowNegotiation(false);
    };

    const handleReject = (p) => {
        setProposals((prev) =>
            prev.map((x) => (x.ts === p.ts ? { ...x, status: "rejected" } : x))
        );
    };

    return (
        <AnimatePresence>
            <motion.div
                key={job.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                    if (info.offset.x < -120) {
                        // swipe kiri untuk tolak
                        onClose?.(job.id);
                    }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative rounded-2xl border border-border bg-card/70 backdrop-blur-xl shadow-lg p-5 mb-4 cursor-grab active:cursor-grabbing transition-all duration-300"
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
                <p className="mt-3 text-sm text-foreground/90 line-clamp-2">
                    {job.description}
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
                </div>

                {/* CTA */}
                <div className="mt-5 flex gap-2">
                    {role === "worker" ? (
                        <>
                            <Button
                                className="flex-1 bg-primary hover:bg-primary/90 text-white transition-colors duration-350"
                                onClick={onAcceptClick}
                            >
                                Terima
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-350"
                                onClick={() => setShowNegotiation(true)}
                            >
                                Negosiasi
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="outline"
                            className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors duration-350"
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
