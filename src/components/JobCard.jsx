// JobCard.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    Clock,
    MessageSquare,
    DollarSign,
    Check,
    X,
    ChevronDown,
    ChevronUp,
    Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const motionVariants = {
    cardHidden: { opacity: 0, y: 12, scale: 0.995 },
    cardShow: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.45, ease: "easeOut" },
    },
};

export default function JobCard({
    job = null,
    visible = false,
    onClose = () => { },
    onAcceptClick = () => { },
    onAccepted = () => { },
}) {
    // fallback data (dipakai kalau job undefined / array kosong)
    const DUMMY_JOB = {
        id: 1,
        title: "Antar Dokumen",
        type: "remote", // onsite | remote
        description:
            "Ambil dokumen dari kantor pusat dan antarkan ke klien di SCBD. Pastikan dokumen aman dan diserahkan langsung ke penerima. Jangan lupa konfirmasi penerimaan setelah selesai.",
        client: "Andi W.",
        distance: "1.2 km",
        fee: 25000,
        feeLabel: "Rp 25.000",
        time: "15 menit",
        attachments: ["invoice.pdf", "brief.txt"],
    };

    // defensive: jika `job` adalah array, ambil item pertama; kalau kosong => fallback
    const jobData =
        Array.isArray(job) ? (job.length ? job[0] : DUMMY_JOB) : job || DUMMY_JOB;

    const [negotiationOpen, setNegotiationOpen] = useState(false);
    const [proposals, setProposals] = useState([]);
    const [counterValue, setCounterValue] = useState("");
    const [dealAmount, setDealAmount] = useState(null);
    const [jobAccepted, setJobAccepted] = useState(false);
    const [modalLocked, setModalLocked] = useState(false);
    const [descExpanded, setDescExpanded] = useState(false);

    const { toast } = useToast();

    function formatCurrency(num) {
        if (num == null) return "";
        return "Rp " + Number(num).toLocaleString("id-ID");
    }

    const handleAcceptedDeal = (amount) => {
        setDealAmount(amount);
        setJobAccepted(true);
        setModalLocked(true);
        toast({ title: "Harga Disepakati", description: `${formatCurrency(amount)}` });

        setTimeout(() => {
            setNegotiationOpen(false);
            setModalLocked(false);
            onAccepted(amount);
        }, 1400);
    };

    const simulateClientResponse = (workerProposal) => {
        setTimeout(() => {
            const fee = Number(jobData?.fee ?? 0);
            const willAccept = workerProposal.amount <= fee;
            if (willAccept) {
                const accepted = {
                    from: "client",
                    amount: workerProposal.amount,
                    status: "accepted",
                    ts: Date.now(),
                };
                setProposals((p) => [accepted, ...p]);
                handleAcceptedDeal(workerProposal.amount);
            } else {
                const counterAmt = Math.round((workerProposal.amount + fee) / 2);
                const clientCounter = {
                    from: "client",
                    amount: counterAmt,
                    status: "pending",
                    ts: Date.now(),
                };
                setProposals((p) => [clientCounter, ...p]);
                toast({
                    title: "Klien mengajukan counter",
                    description: `${formatCurrency(counterAmt)}`,
                });
            }
        }, 1400);
    };

    const sendCounterOffer = (amount) => {
        if (modalLocked) return;
        const numeric = Math.round(Number(amount));
        if (!numeric || numeric <= 0) {
            toast({ title: "Nominal tidak valid", variant: "destructive" });
            return;
        }
        const payload = {
            from: "worker",
            amount: numeric,
            status: "pending",
            ts: Date.now(),
        };
        setProposals((p) => [payload, ...p]);
        setCounterValue("");
        toast({
            title: "Penawaran terkirim",
            description: `Menunggu respon klien (${formatCurrency(numeric)})`,
        });
        simulateClientResponse(payload);
    };

    const acceptClientProposal = (proposal) => {
        if (modalLocked) return;
        const acceptance = {
            from: "worker",
            amount: proposal.amount,
            status: "accepted",
            ts: Date.now(),
        };
        setProposals((p) => [acceptance, ...p]);
        handleAcceptedDeal(proposal.amount);
    };

    const rejectProposal = (proposal) => {
        if (modalLocked) return;
        const rej = {
            from: "worker",
            amount: proposal.amount,
            status: "rejected",
            ts: Date.now(),
        };
        setProposals((p) => [rej, ...p]);
        toast({ title: "Anda menolak penawaran", variant: "destructive" });
    };

    // safe preview: gunakan optional chaining + fallback string
    const MAX_PREVIEW_LENGTH = 44;
    const descriptionText = jobData?.description ?? "";
    const isLongDesc = (descriptionText.length ?? 0) > MAX_PREVIEW_LENGTH;
    const displayDesc =
        descExpanded || !isLongDesc
            ? descriptionText
            : descriptionText.slice(0, MAX_PREVIEW_LENGTH) + "...";

    return (
        <div className="relative min-h-[360px] flex items-start justify-center">
            <AnimatePresence mode="wait">
                {visible ? (
                    <motion.div
                        key={`incoming-job-${jobData?.id ?? "fallback"}`}
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 160, damping: 18 }}
                        className="w-full"
                    >
                        <Card className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl shadow-2xl">
                            <CardHeader className="p-4">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-base font-semibold text-foreground break-words">
                                            {jobData?.title ?? "—"}
                                        </CardTitle>

                                        <motion.div
                                            initial={false}
                                            animate={{ height: "auto" }}
                                            transition={{ duration: 0.35, ease: "easeInOut" }}
                                        >
                                            <p className="mt-1 text-xs text-muted-foreground whitespace-pre-line">
                                                {displayDesc}
                                            </p>
                                        </motion.div>

                                        {isLongDesc && (
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                className="mt-1 flex items-center text-xs text-accent/90 hover:text-accent transition"
                                                onClick={() => setDescExpanded((prev) => !prev)}
                                                aria-expanded={descExpanded}
                                            >
                                                {descExpanded ? (
                                                    <>
                                                        Persingkat <ChevronUp className="ml-1 h-3 w-3" />
                                                    </>
                                                ) : (
                                                    <>
                                                        Selengkapnya <ChevronDown className="ml-1 h-3 w-3" />
                                                    </>
                                                )}
                                            </motion.button>
                                        )}
                                    </div>

                                    <div className="text-right shrink-0 mt-2 sm:mt-0">
                                        <div className="text-xs text-muted-foreground">Estimasi</div>
                                        <div className="font-medium text-foreground">
                                            {jobData?.time ?? "-"}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-4 space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="rounded-xl p-3 bg-background/40 border border-border flex flex-col">
                                        <div className="text-xs text-muted-foreground">Klien</div>
                                        <div className="font-medium text-foreground">{jobData?.client ?? "-"}</div>
                                    </div>

                                    <div className="rounded-xl p-3 bg-background/40 border border-border flex flex-col">
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs text-muted-foreground">Bayaran</div>
                                            {!jobAccepted && (
                                                <button
                                                    className="text-xs underline underline-offset-2 text-accent/90"
                                                    onClick={() => setNegotiationOpen(true)}
                                                >
                                                    Negosiasi
                                                </button>
                                            )}
                                        </div>
                                        <div className="font-semibold text-primary mt-1">
                                            {dealAmount ? formatCurrency(dealAmount) : jobData?.feeLabel ?? "-"}
                                        </div>
                                    </div>

                                    {/* conditional onsite */}
                                    {jobData?.type === "onsite" && (
                                        <div className="rounded-xl p-3 bg-background/40 border border-border flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-accent" />
                                            <span className="text-sm text-foreground">{jobData?.distance ?? "-"}</span>
                                        </div>
                                    )}

                                    <div className="rounded-xl p-3 bg-background/40 border border-border flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-accent" />
                                        <span className="text-sm text-foreground">{jobData?.time ?? "-"}</span>
                                    </div>
                                </div>

                                {/* Attachments (safe) */}
                                {Array.isArray(jobData?.attachments) && jobData.attachments.length > 0 ? (
                                    <div className="rounded-xl p-3 bg-background/40 border border-border">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Paperclip className="h-4 w-4 text-accent" />
                                            <span className="text-sm font-medium text-foreground">Lampiran</span>
                                        </div>
                                        <ul className="space-y-1">
                                            {jobData.attachments.map((file, idx) => (
                                                <li key={idx} className="text-xs text-muted-foreground truncate">
                                                    {file}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    // optional hint if no attachments
                                    <div className="rounded-xl p-3 bg-background/10 border border-border text-xs text-muted-foreground">
                                        Tidak ada lampiran
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <Button
                                        disabled={jobAccepted}
                                        onClick={() => {
                                            onAcceptClick();
                                            toast({
                                                title: "Pekerjaan Diterima",
                                                description: "Mode pelacakan aktif...",
                                            });
                                            setJobAccepted(true);
                                            setDealAmount(jobData?.fee ?? 0);
                                        }}
                                        className="w-full bg-primary text-primary-foreground hover:bg-accent"
                                    >
                                        <Check className="mr-2 h-4 w-4" />
                                        {jobAccepted ? "Diterima" : "Terima"}
                                    </Button>
                                    <Button onClick={() => onClose()} variant="outline" className="w-full">
                                        <X className="mr-2 h-4 w-4" /> Tolak
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div key="empty" initial="cardHidden" animate="cardShow" className="text-center px-4">
                        <motion.h3 variants={motionVariants} className="text-lg font-semibold text-foreground">
                            Anda Offline
                        </motion.h3>
                        <p className="mt-2 text-sm text-muted-foreground">Aktifkan status online untuk menerima pekerjaan.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* NEGOTIATION MODAL */}
            <AnimatePresence>
                {negotiationOpen && (
                    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div className="w-full max-w-md rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-4 shadow-2xl">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-accent" />
                                    <div className="text-sm font-semibold text-foreground">Negosiasi — {jobData?.title}</div>
                                </div>
                                <button onClick={() => !modalLocked && setNegotiationOpen(false)} className="text-xs text-muted-foreground">
                                    Tutup
                                </button>
                            </div>

                            <div className="space-y-2 max-h-40 overflow-auto pr-2">
                                {proposals.length === 0 ? (
                                    <div className="text-xs text-muted-foreground">Belum ada penawaran.</div>
                                ) : (
                                    proposals.map((p, i) => (
                                        <div
                                            key={p.ts + i}
                                            className={`flex items-center justify-between gap-3 p-2 rounded-lg border ${p.status === "accepted" ? "border-accent/80 bg-accent/8" : "border-border bg-background/20"
                                                }`}
                                        >
                                            <div className="text-xs">
                                                <div className="uppercase tracking-wide text-[10px] text-muted-foreground">{p.from}</div>
                                                <div className="font-medium text-foreground">{formatCurrency(p.amount)}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {p.status === "pending" && p.from === "client" ? (
                                                    <>
                                                        <Button size="sm" disabled={modalLocked} onClick={() => acceptClientProposal(p)}>
                                                            Terima
                                                        </Button>
                                                        <Button size="sm" variant="outline" disabled={modalLocked} onClick={() => rejectProposal(p)}>
                                                            Tolak
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <div className="text-xs text-muted-foreground">{p.status}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* QUICK OFFERS */}
                            <div className="mt-3">
                                <div className="text-xs font-medium text-muted-foreground mb-2">Penawaran cepat:</div>
                                <div className="flex flex-wrap gap-2">
                                    {[0.8, 1, 1.2].map((m, i) => {
                                        const quickAmount = Math.round((jobData?.fee ?? 0) * m);
                                        return (
                                            <Button key={i} size="sm" variant="outline" disabled={modalLocked} onClick={() => sendCounterOffer(quickAmount)}>
                                                {formatCurrency(quickAmount)}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* COUNTER INPUT */}
                            <div className="mt-3 flex gap-2">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 rounded-lg border border-border bg-background/30 p-2">
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                        <input
                                            inputMode="numeric"
                                            disabled={modalLocked}
                                            value={counterValue}
                                            onChange={(e) => setCounterValue(e.target.value.replace(/[^\d]/g, ""))}
                                            placeholder={formatCurrency(jobData?.fee)}
                                            className="w-full bg-transparent text-sm text-foreground outline-none"
                                        />
                                    </div>
                                </div>
                                <Button disabled={modalLocked} onClick={() => sendCounterOffer(counterValue || jobData?.fee || 0)}>
                                    <DollarSign className="h-4 w-4 mr-1" /> Kirim
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
