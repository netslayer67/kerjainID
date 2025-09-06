// components/NegotiationModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NegotiationModal({
    role = "worker", // "worker" | "client"
    job,
    open,
    onClose,
    proposals,
    onSendOffer,
    onAccept,
    onReject,
    locked = false,
}) {
    const [counterValue, setCounterValue] = useState("");

    const formatCurrency = (num) =>
        "Rp " + Number(num || 0).toLocaleString("id-ID");

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="w-full max-w-md rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-4 shadow-2xl"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-accent" />
                                <div className="text-sm font-semibold text-foreground">
                                    Negosiasi — {job?.title}
                                </div>
                            </div>
                            <button
                                onClick={() => !locked && onClose()}
                                className="text-xs text-muted-foreground"
                            >
                                Tutup
                            </button>
                        </div>

                        {/* History */}
                        <div className="space-y-2 max-h-40 overflow-auto pr-2">
                            {proposals.length === 0 ? (
                                <div className="text-xs text-muted-foreground">
                                    Belum ada penawaran.
                                </div>
                            ) : (
                                proposals.map((p, i) => (
                                    <div
                                        key={p.ts + i}
                                        className={`flex items-center justify-between gap-3 p-2 rounded-lg border ${p.status === "accepted"
                                                ? "border-accent/80 bg-accent/8"
                                                : "border-border bg-background/20"
                                            }`}
                                    >
                                        <div className="text-xs">
                                            <div className="uppercase tracking-wide text-[10px] text-muted-foreground">
                                                {p.from}
                                            </div>
                                            <div className="font-medium text-foreground">
                                                {formatCurrency(p.amount)}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {p.status === "pending" &&
                                                ((role === "worker" && p.from === "client") ||
                                                    (role === "client" && p.from === "worker")) ? (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        disabled={locked}
                                                        onClick={() => onAccept(p)}
                                                    >
                                                        Terima
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        disabled={locked}
                                                        onClick={() => onReject(p)}
                                                    >
                                                        Tolak
                                                    </Button>
                                                </>
                                            ) : (
                                                <div className="text-xs text-muted-foreground">
                                                    {p.status}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Quick offers (only worker) */}
                        {role === "worker" && (
                            <div className="mt-3">
                                <div className="text-xs font-medium text-muted-foreground mb-2">
                                    Penawaran cepat:
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {[0.8, 1, 1.2].map((m, i) => {
                                        const quickAmount = Math.round((job?.fee ?? 0) * m);
                                        return (
                                            <Button
                                                key={i}
                                                size="sm"
                                                variant="outline"
                                                disabled={locked}
                                                onClick={() => onSendOffer(quickAmount)}
                                            >
                                                {formatCurrency(quickAmount)}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Counter input */}
                        {role === "worker" && (
                            <div className="mt-3 flex gap-2">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 rounded-lg border border-border bg-background/30 p-2">
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                        <input
                                            inputMode="numeric"
                                            disabled={locked}
                                            value={counterValue}
                                            onChange={(e) =>
                                                setCounterValue(e.target.value.replace(/[^\d]/g, ""))
                                            }
                                            placeholder={formatCurrency(job?.fee)}
                                            className="w-full bg-transparent text-sm text-foreground outline-none"
                                        />
                                    </div>
                                </div>
                                <Button
                                    disabled={locked}
                                    onClick={() =>
                                        onSendOffer(counterValue || job?.fee || 0)
                                    }
                                >
                                    <DollarSign className="h-4 w-4 mr-1" /> Kirim
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
