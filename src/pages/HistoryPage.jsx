// HistoryPage.jsx
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Filter,
    Search,
    Wallet,
    CheckCircle2,
    Clock3,
    XCircle,
    BadgeCheck,
    Star,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedPage from "@/components/AnimatedPage";

/* -------------------------
   Dummy data (replace with API)
   ------------------------- */
const seedJobs = [
    {
        id: "JOB-2025-0901-01",
        type: "worker",
        title: "Antar kopi ke kantor Budi",
        category: "Urusan Harian",
        date: "2025-09-01T09:21:00Z",
        amount: 25000,
        status: "completed",
        payment: "paid",
        rating: 5,
    },
    {
        id: "JOB-2025-0831-02",
        type: "worker",
        title: "Perbaiki halaman landing",
        category: "Jasa Digital",
        date: "2025-08-31T13:10:00Z",
        amount: 750000,
        status: "completed",
        payment: "paid",
        rating: 4.7,
    },
    {
        id: "JOB-2025-0830-03",
        type: "client",
        title: "Dekor backdrop mini event",
        category: "Bantuan Acara",
        date: "2025-08-30T10:00:00Z",
        amount: 350000,
        status: "ongoing",
        payment: "unpaid",
        feedback: null,
    },
    {
        id: "JOB-2025-0828-04",
        type: "client",
        title: "Bersih-bersih gudang kecil",
        category: "Tenaga Manual",
        date: "2025-08-28T08:45:00Z",
        amount: 150000,
        status: "cancelled",
        payment: "unpaid",
        feedback: "Dibatalkan sesuai permintaan.",
    },
    {
        id: "JOB-2025-0827-05",
        type: "worker",
        title: "Desain poster promosi",
        category: "Pekerjaan Kreatif",
        date: "2025-08-27T14:22:00Z",
        amount: 420000,
        status: "completed",
        payment: "paid",
        rating: 4.9,
    },
];

const fmtIDR = (n) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(n);

/* -------------------------
   Badges (status & payment)
   ------------------------- */
const StatusBadge = ({ status }) => {
    const map = {
        completed: "bg-emerald-500/12 text-emerald-400 ring-1 ring-emerald-500/20",
        ongoing: "bg-amber-500/12 text-amber-400 ring-1 ring-amber-500/20",
        cancelled: "bg-rose-500/12 text-rose-400 ring-1 ring-rose-500/20",
    };
    const label =
        status === "completed" ? "Selesai" : status === "ongoing" ? "Berjalan" : "Dibatalkan";
    const Icon = status === "completed" ? CheckCircle2 : status === "ongoing" ? Clock3 : XCircle;

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${map[status]}`}
            aria-hidden
        >
            <Icon className="h-3.5 w-3.5" />
            {label}
        </span>
    );
};

const PayBadge = ({ payment }) => {
    const isPaid = payment === "paid";
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${isPaid ? "bg-primary/15 text-primary ring-1 ring-primary/25" : "bg-muted text-muted-foreground ring-1 ring-border/60"
                }`}
            aria-hidden
        >
            <Wallet className="h-3.5 w-3.5" />
            {isPaid ? "Terbayar" : "Belum dibayar"}
        </span>
    );
};

/* -------------------------
   Single job row (memoized)
   ------------------------- */
const JobRow = React.memo(function JobRow({ job, as = "worker" }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-xl hover:border-accent hover:bg-accent/10 transition-colors"
        >
            {/* subtle accent glow on hover */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "radial-gradient(50% 40% at 50% -10%, hsl(var(--accent)/0.18) 0%, transparent 60%)" }}
                aria-hidden
            />

            <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-semibold text-foreground">{job.title}</p>
                        <StatusBadge status={job.status} />
                        <PayBadge payment={job.payment} />
                    </div>

                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                        {job.category} •{" "}
                        {new Date(job.date).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                    </p>

                    {as === "worker" && job.rating ? (
                        <p className="mt-1 inline-flex items-center gap-1 text-xs text-foreground/80">
                            <Star className="h-3.5 w-3.5 text-yellow-400" />
                            Rating {job.rating}
                        </p>
                    ) : null}

                    {as === "client" && job.feedback ? (
                        <p className="mt-1 text-xs text-muted-foreground italic">“{job.feedback}”</p>
                    ) : null}
                </div>

                <div className="flex shrink-0 items-end justify-between sm:flex-col sm:items-end sm:justify-center gap-2">
                    <p className="text-sm font-bold text-foreground">{fmtIDR(job.amount)}</p>
                    <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl border-accent/40 text-foreground hover:text-accent hover:border-accent hover:bg-accent/10"
                        aria-label={`Lihat detail ${job.id}`}
                    >
                        Detail
                    </Button>
                </div>
            </div>
        </motion.div>
    );
});

/* -------------------------
   Empty state
   ------------------------- */
const EmptyState = ({ role, filter }) => {
    const msg = filter === "all" ? "Belum ada riwayat." : "Tidak ada data untuk filter ini.";
    return (
        <div className="rounded-2xl border border-dashed border-border/60 bg-card/40 p-10 text-center">
            <BadgeCheck className="mx-auto h-10 w-10 text-accent" />
            <p className="mt-2 text-sm font-medium text-foreground">
                Riwayat {role === "worker" ? "pekerjaan" : "posting"} kosong
            </p>
            <p className="text-xs text-muted-foreground">{msg}</p>
        </div>
    );
};

/* -------------------------
   Page
   ------------------------- */
export default function HistoryPage() {
    const [role, setRole] = useState("worker"); // 'worker' | 'client'
    const [filter, setFilter] = useState("all"); // 'all' | 'completed' | 'ongoing' | 'cancelled'
    const [q, setQ] = useState("");
    const reduceMotion = useReducedMotion();

    const fade = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.36 } },
    };

    const filtered = useMemo(() => {
        const list = seedJobs.filter((j) => j.type === role);
        const byFilter = filter === "all" ? list : list.filter((j) => j.status === filter);
        const byQuery = q.trim()
            ? byFilter.filter((j) =>
                `${j.title} ${j.category} ${j.id}`.toLowerCase().includes(q.toLowerCase())
            )
            : byFilter;

        return [...byQuery].sort((a, b) => +new Date(b.date) - +new Date(a.date));
    }, [role, filter, q]);

    return (
        <AnimatedPage>
            <Helmet>
                <title>Riwayat — Kerjain</title>
                <meta name="description" content="Lihat riwayat pekerjaan, status, dan pembayaran." />
            </Helmet>

            <div className="relative min-h-dvh w-full px-4 py-6">
                {/* Header */}
                <motion.div variants={fade} initial="hidden" animate="show" className="mb-6 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Link to={-1}>
                            <Button variant="ghost" size="icon" className="rounded-full bg-background/30 backdrop-blur-md hover:bg-accent/15 hover:text-accent" aria-label="Kembali">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <h1 className="text-lg font-semibold text-foreground">Riwayat</h1>
                    </div>

                    {/* Role toggle */}
                    <div className="inline-flex rounded-2xl bg-card/50 p-1 backdrop-blur-md ring-1 ring-border" role="tablist" aria-label="Mode riwayat">
                        {[
                            { key: "worker", label: "Worker" },
                            { key: "client", label: "Client" },
                        ].map((r) => (
                            <button
                                key={r.key}
                                onClick={() => setRole(r.key)}
                                aria-pressed={role === r.key}
                                className={`rounded-xl px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${role === r.key ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
                                    }`}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Controls */}
                <motion.div variants={fade} initial="hidden" animate="show" className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="relative sm:col-span-2">
                        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Cari ID / judul / kategori…"
                            className="pl-9 rounded-2xl border-border/50 bg-background/40 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent/40"
                            aria-label="Cari riwayat"
                        />
                    </div>

                    <div className="inline-flex w-full items-center justify-between gap-2 rounded-2xl border border-border/60 bg-card/50 p-1 backdrop-blur-md">
                        {[
                            { key: "all", label: "Semua" },
                            { key: "completed", label: "Selesai" },
                            { key: "ongoing", label: "Berjalan" },
                            { key: "cancelled", label: "Batal" },
                        ].map((f) => (
                            <button
                                key={f.key}
                                onClick={() => setFilter(f.key)}
                                aria-pressed={filter === f.key}
                                className={`flex-1 rounded-xl px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${filter === f.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}

                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-accent/15 hover:text-accent" title="Filter lanjutan (coming soon)">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </motion.div>

                {/* List */}
                <motion.div variants={fade} initial="hidden" animate="show">
                    <div className="space-y-3">
                        <AnimatePresence initial={false} mode="popLayout">
                            {filtered.length === 0 ? (
                                <motion.div key="empty" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                                    <EmptyState role={role} filter={filter} />
                                </motion.div>
                            ) : (
                                filtered.map((job) => <JobRow key={job.id} job={job} as={role} />)
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Hint strip */}
                    <div className="mt-6 rounded-2xl border border-border/60 bg-background/40 p-4 text-center backdrop-blur-xl">
                        <p className="text-xs text-muted-foreground">
                            Data lengkap termasuk invoice & detail pembayaran tersedia di halaman pekerjaan.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
}
