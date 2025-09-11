import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Power, Clock, Wallet, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedPage from "@/components/AnimatedPage";
import JobCard from "@/components/JobCard";
import NegotiationModal from "@/components/NegotiationModal";
import { useToast } from "@/components/ui/use-toast";

/* Dummy jobs (API placeholder) */
const DUMMY_JOBS = [
    {
        id: 1,
        title: "Beli Kopi Cepat",
        type: "onsite",
        description: "Ambil kopi di kedai depan komplek dan antar ke rumah.",
        client: "Budi S.",
        distance: "500 m",
        fee: 15000,
        feeLabel: "Rp 15.000",
        time: "10 menit",
        paymentMethod: "cash",
        attachments: [],
    },
    {
        id: 2,
        title: "Desain Brosur Produk",
        type: "remote",
        description: "Desain brosur A4, 2 konsep draft. Final PDF & AI.",
        client: "Siti R.",
        distance: null,
        fee: 200000,
        feeLabel: "Rp 200.000",
        time: "2 hari",
        paymentMethod: "wallet",
        attachments: ["brand-guideline.pdf"],
    },
];

const fmtCurrency = (n) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(n || 0);

const sanitizeInput = (v = "", maxLen = 200) =>
    String(v || "")
        .replace(/<[^>]*>/g, "")
        .replace(/\b(?:https?:|mailto:|ftp:|javascript:)[^\s]*/gi, "")
        .replace(/https?:\/\/[^\s]+/gi, "")
        .replace(/\s{2,}/g, " ")
        .trim()
        .slice(0, maxLen);

/* Glass card reusable */
const GlassCard = ({ children, className = "" }) => (
    <div
        className={`rounded-2xl border border-border/40 bg-card/40 backdrop-blur-xl shadow-sm p-3 transition-all duration-350 ${className}`}
    >
        {children}
    </div>
);

/* Compact StatCard for mobile */
const StatCard = React.memo(function StatCard({ label, value, icon: Icon }) {
    return (
        <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-lg p-1.5 sm:p-2 border border-border/40 bg-background/40">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                </div>
                <div>
                    <p className="text-[10px] sm:text-[11px] uppercase text-muted-foreground">
                        {label}
                    </p>
                    <p className="text-sm sm:text-base font-semibold">{value}</p>
                </div>
            </div>
        </GlassCard>
    );
});

/* Jobs skeleton */
function JobsSkeleton({ count = 3 }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-2xl border border-border/30 bg-card/30 p-4 animate-pulse"
                />
            ))}
        </div>
    );
}

/* Main Dashboard */
export default function WorkerDashboard() {
    const reduce = useReducedMotion();
    const { toast } = useToast();

    const [isOnline, setIsOnline] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [radiusMeters, setRadiusMeters] = useState(1000);
    const [availabilityNote, setAvailabilityNote] = useState("");
    const [loadingJobs, setLoadingJobs] = useState(false);

    const [selectedJob, setSelectedJob] = useState(null);
    const [proposalsMap, setProposalsMap] = useState({});

    const listRef = useRef(null);

    const stats = useMemo(
        () => [
            { label: "Tersedia", value: jobs.length, icon: Loader2 },
            { label: "Saldo", value: fmtCurrency(583500), icon: Wallet },
            { label: "Selesai", value: 128, icon: CheckCircle2 },
            { label: "Aktif", value: 3, icon: Clock },
        ],
        [jobs]
    );

    const toggleOnline = useCallback(() => {
        setIsOnline((prev) => !prev);
        if (!isOnline) {
            setLoadingJobs(true);
            toast({ title: "Anda Online", description: "Mencari pekerjaan..." });
            setTimeout(() => {
                setJobs(DUMMY_JOBS);
                setLoadingJobs(false);
                setTimeout(
                    () => listRef.current?.scrollTo?.({ top: 0, behavior: "smooth" }),
                    80
                );
            }, 700);
        } else {
            toast({
                title: "Anda Offline",
                description: "Berhenti menerima tugas.",
                variant: "destructive",
            });
            setJobs([]);
        }
    }, [isOnline, toast]);

    const handleAccept = useCallback(
        (id) => {
            setJobs((prev) => prev.filter((j) => j.id !== id));
            toast({
                title: "Job diterima",
                description: "Mulai kerjakan sekarang.",
            });
        },
        [toast]
    );

    const handleReject = useCallback(
        (id) => {
            setJobs((prev) => prev.filter((j) => j.id !== id));
            toast({ title: "Job ditolak", description: "Job dihapus dari daftar." });
        },
        [toast]
    );

    const openNegotiation = useCallback((job) => {
        setSelectedJob(job);
        setProposalsMap((prev) => ({ ...prev, [job.id]: prev[job.id] || [] }));
    }, []);

    const closeNegotiation = useCallback(() => setSelectedJob(null), []);

    const onSendOffer = useCallback((jobId, fromRole, amount) => {
        setProposalsMap((prev) => {
            const list = prev[jobId] || [];
            const newProposal = {
                ts: Date.now(),
                from: fromRole,
                amount,
                status: "pending",
            };
            return { ...prev, [jobId]: [newProposal, ...list] };
        });
    }, []);

    const onAcceptProposal = useCallback(
        (jobId, proposalTs) => {
            setProposalsMap((prev) => {
                const list = (prev[jobId] || []).map((p) =>
                    p.ts === proposalTs ? { ...p, status: "accepted" } : p
                );
                return { ...prev, [jobId]: list };
            });
            toast({
                title: "Penawaran diterima",
                description: "Dana dikunci (dummy escrow).",
            });
        },
        [toast]
    );

    const onRejectProposal = useCallback((jobId, proposalTs) => {
        setProposalsMap((prev) => {
            const list = (prev[jobId] || []).map((p) =>
                p.ts === proposalTs ? { ...p, status: "rejected" } : p
            );
            return { ...prev, [jobId]: list };
        });
    }, []);

    useEffect(() => {
        if (isOnline && jobs.length === 0 && !loadingJobs) {
            setLoadingJobs(true);
            const t = setTimeout(() => {
                setJobs(DUMMY_JOBS);
                setLoadingJobs(false);
            }, 800);
            return () => clearTimeout(t);
        }
    }, [isOnline, jobs.length, loadingJobs]);

    const cardMotion = reduce
        ? { initial: {}, animate: {} }
        : {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, ease: "easeOut" },
        };

    const jobListNode = useMemo(() => {
        if (loadingJobs) return <JobsSkeleton count={3} />;

        if (!jobs.length) {
            return (
                <div className="rounded-2xl border border-dashed border-border/60 bg-card/30 backdrop-blur p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">
                        Belum ada job terdekat.
                    </p>
                    <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 transition duration-350"
                        onClick={() => {
                            setJobs(DUMMY_JOBS);
                            toast({
                                title: "Demo job",
                                description: "Job simulasi ditambahkan.",
                            });
                        }}
                    >
                        Cari Job
                    </Button>
                </div>
            );
        }

        return (
            <div className="space-y-3">
                {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        role="worker"
                        job={job}
                        visible
                        onClose={() => handleReject(job.id)}
                        onAcceptClick={() => handleAccept(job.id)}
                        onNegotiationClick={(j) => openNegotiation(j)}
                    />
                ))}
            </div>
        );
    }, [jobs, loadingJobs, handleAccept, handleReject, openNegotiation, toast]);

    return (
        <AnimatedPage>
            <Helmet>
                <title>Dashboard Pekerja — Kerjain</title>
            </Helmet>

            <div className="relative min-h-dvh w-full px-3 sm:px-4 py-4 sm:py-5">
                {/* Top Card */}
                <motion.div {...cardMotion} className="mx-auto max-w-md space-y-3 sm:space-y-4">
                    <GlassCard className="p-3 sm:p-4">
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <span
                                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full ring-2 ring-background/30 ${isOnline ? "bg-accent" : "bg-muted"
                                        }`}
                                    aria-hidden
                                />
                                <div>
                                    <p className="text-sm sm:text-base font-semibold">
                                        Halo, <span className="text-accent">Pekerja</span>
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                                        {isOnline ? "Online — siap kerja" : "Offline — tidak aktif"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1.5 sm:gap-2">
                                <label
                                    htmlFor="radius"
                                    className="text-[10px] sm:text-[11px] text-muted-foreground"
                                >
                                    Radius (m)
                                </label>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <input
                                        id="radius"
                                        type="number"
                                        min={100}
                                        max={50000}
                                        step={100}
                                        value={radiusMeters}
                                        onChange={(e) =>
                                            setRadiusMeters(
                                                Math.max(
                                                    100,
                                                    Math.min(
                                                        50000,
                                                        Number(String(e.target.value).replace(/\D/g, "")) ||
                                                        1000
                                                    )
                                                )
                                            )
                                        }
                                        className="w-20 sm:w-24 rounded-full border border-border/40 bg-background/40 px-2.5 py-1.5 text-[11px] sm:text-xs placeholder:text-muted-foreground focus:ring-2 focus:ring-accent transition duration-350"
                                        aria-label="Radius pencarian pekerjaan dalam meter"
                                    />

                                    <Button
                                        size="sm"
                                        onClick={toggleOnline}
                                        className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full font-medium text-[11px] sm:text-xs transition-colors duration-350 ${isOnline
                                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                : "bg-accent text-accent-foreground hover:bg-accent/90"
                                            }`}
                                        aria-pressed={isOnline}
                                        aria-label={
                                            isOnline ? "Matikan status online" : "Aktifkan status online"
                                        }
                                    >
                                        <Power className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        <span>{isOnline ? "Offline" : "Online"}</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Availability Note */}
                    <GlassCard className="p-3 sm:p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] sm:text-xs font-medium">
                                Catatan ketersediaan
                            </p>
                            <span className="text-[10px] sm:text-[11px] text-muted-foreground">
                                {availabilityNote.length}/140
                            </span>
                        </div>

                        <textarea
                            rows={2}
                            value={availabilityNote}
                            onChange={(e) =>
                                setAvailabilityNote(sanitizeInput(e.target.value, 140))
                            }
                            placeholder="Contoh: Siap antar Tebet, jam 10–14"
                            maxLength={140}
                            className="mt-2 w-full resize-none rounded-md border border-border/40 bg-background/40 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-accent transition duration-350"
                            aria-label="Catatan ketersediaan"
                        />
                    </GlassCard>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {stats.map((s) => (
                            <StatCard key={s.label} {...s} />
                        ))}
                    </div>
                </motion.div>

                {/* Jobs list */}
                <motion.div {...cardMotion} className="mx-auto max-w-md mt-4 sm:mt-5" ref={listRef}>
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h2 className="text-[12px] sm:text-sm font-semibold">Job Tersedia</h2>
                        {loadingJobs ? (
                            <span className="text-[11px] sm:text-[12px] text-muted-foreground">
                                Memuat…
                            </span>
                        ) : (
                            <span className="text-[11px] sm:text-[12px] text-muted-foreground">
                                {jobs.length} job
                            </span>
                        )}
                    </div>
                    {jobListNode}
                </motion.div>

                {/* Negotiation modal */}
                {selectedJob && (
                    <NegotiationModal
                        role="worker"
                        job={selectedJob}
                        isOpen={!!selectedJob}
                        onClose={closeNegotiation}
                        proposals={proposalsMap[selectedJob.id] || []}
                        onSendOffer={(amount) => onSendOffer(selectedJob.id, "worker", amount)}
                        onAccept={(proposal) =>
                            onAcceptProposal(selectedJob.id, proposal.ts)
                        }
                        onReject={(proposal) =>
                            onRejectProposal(selectedJob.id, proposal.ts)
                        }
                        jobFee={selectedJob.fee}
                    />
                )}
            </div>
        </AnimatedPage>
    );
}
