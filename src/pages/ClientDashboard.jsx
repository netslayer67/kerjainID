// ClientDashboard.jsx (refactor)
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion, useReducedMotion } from "framer-motion";
import {
    Plus,
    Clock,
    MessageSquare,
    CheckCircle2,
    Loader2,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";

/* ---------------- sample data (demo) ---------------- */
const quickActions = [
    { title: "Pasang Job", icon: Plus, path: "/post-job" },
    { title: "Riwayat", icon: Clock, path: "/history" },
    { title: "Chat", icon: MessageSquare, path: "/chat" },
];

const activeJobs = [
    { id: 1, title: "Bersihkan Taman", worker: "Budi S.", status: "Proses", progress: 60 },
    { id: 2, title: "Desain Logo", worker: "Citra L.", status: "Review", progress: 100 },
];

/* ---------------- helpers ---------------- */
const cn = (...c) => c.filter(Boolean).join(" ");

const badgeClass = (status) =>
    status === "Proses"
        ? "bg-primary/15 text-primary ring-1 ring-primary/20"
        : status === "Review"
            ? "bg-accent/15 text-accent ring-1 ring-accent/20"
            : "bg-muted text-muted-foreground ring-1 ring-border/10";

/* ---------------- memoized presentational components ---------------- */
const KpiCard = React.memo(function KpiCard({ icon: Icon, label, value, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay }}
        >
            <Card className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur transition-shadow duration-300 hover:shadow-md">
                <CardContent className="flex items-center gap-3 p-3">
                    <div
                        className="rounded-lg p-2 flex items-center justify-center min-w-[38px] border border-border/50
                       bg-[linear-gradient(180deg,var(--card)_0%,hsl(var(--accent)/10)_100%)]"
                        aria-hidden
                    >
                        <Icon className="h-4 w-4 text-accent" />
                    </div>

                    <div className="leading-tight">
                        <p className="text-[11px] uppercase text-muted-foreground">{label}</p>
                        <p className="text-lg font-semibold">{value}</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
});

const QuickActionCard = React.memo(function QuickActionCard({ action, delay = 0 }) {
    const Icon = action.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay }}
        >
            <Link to={action.path} aria-label={action.title} className="group block">
                <Card className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur transition-transform duration-300 hover:shadow-md hover:scale-[1.01]">
                    <CardContent className="flex h-24 flex-col items-center justify-center gap-2 p-3">
                        <div
                            className="rounded-xl p-2 border border-border/50 bg-background/50 transition-transform group-hover:scale-105 flex items-center justify-center"
                            aria-hidden
                        >
                            <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <p className="text-xs font-medium text-center">{action.title}</p>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
});

const ActiveJobCard = React.memo(function ActiveJobCard({ job, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay }}
        >
            <Link to={`/job/${job.id}/track`} className="group block" aria-label={`Lihat ${job.title}`}>
                <Card className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur transition-shadow duration-300 hover:shadow-md">
                    <CardContent className="p-4 space-y-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <h3 className="truncate text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                                    {job.title}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Worker: <span className="font-medium text-foreground">{job.worker}</span>
                                </p>
                            </div>

                            <span className={cn("shrink-0 rounded-full px-3 py-1 text-[11px] font-medium", badgeClass(job.status))}>
                                {job.status}
                            </span>
                        </div>

                        <div>
                            <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                                <span>Progress</span>
                                <span className="text-xs font-medium text-foreground">{job.progress}%</span>
                            </div>

                            <div className="h-2.5 w-full rounded-full bg-muted" role="progressbar" aria-valuenow={job.progress} aria-valuemin={0} aria-valuemax={100}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${job.progress}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="h-2.5 rounded-full bg-gradient-to-r from-primary to-accent"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
});

/* ---------------- main component ---------------- */
export default function ClientDashboard() {
    const reduce = useReducedMotion();

    // KPI values (memoized)
    const kpis = useMemo(
        () => [
            { label: "Aktif", value: activeJobs.length, icon: Loader2 },
            { label: "Selesai", value: 12, icon: CheckCircle2 },
            { label: "Chat", value: 3, icon: MessageSquare },
            { label: "Draft", value: 1, icon: Clock },
        ],
        []
    );

    return (
        <AnimatedPage>
            <Helmet>
                <title>Dashboard Klien — Kerjain</title>
            </Helmet>

            <div className="relative min-h-screen w-full px-4 py-6 md:px-8 text-foreground overflow-hidden">
                {/* header */}
                <motion.header
                    initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36 }}
                    className="mb-6 rounded-3xl border border-border/40 bg-card/70 backdrop-blur-xl shadow-sm"
                >
                    <div className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between md:p-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-semibold">Halo, Jilliyan 👋</h1>
                            <p className="text-sm text-muted-foreground">Semoga harimu lancar & produktif</p>
                        </div>

                        <div className="w-full md:w-auto mt-3 md:mt-0">
                            <Link to="/post-job" aria-label="Posting cepat">
                                <Button
                                    size="lg"
                                    className="w-full md:w-auto font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/30 transition-transform duration-300"
                                >
                                    <Plus className="mr-2 h-5 w-5" />
                                    Posting Cepat
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.header>

                {/* KPI row */}
                <section className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                    {kpis.map((k, i) => (
                        <KpiCard key={k.label} icon={k.icon} label={k.label} value={k.value} delay={i * 0.04} />
                    ))}
                </section>

                {/* Quick Actions */}
                <section className="mt-8">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-base font-semibold">Aksi Cepat</h2>
                        <Link to="/history" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                            Semua <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                        {quickActions.map((a, i) => (
                            <QuickActionCard key={a.title} action={a} delay={i * 0.04} />
                        ))}
                    </div>
                </section>

                {/* Active Jobs */}
                <section className="mt-10">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-base font-semibold">Job Aktif</h2>
                        {activeJobs.length > 0 && <p className="text-xs text-muted-foreground">{activeJobs.length} job</p>}
                    </div>

                    {activeJobs.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {activeJobs.map((j, i) => (
                                <ActiveJobCard key={j.id} job={j} delay={(i + 1) * 0.06} />
                            ))}
                        </div>
                    ) : (
                        <motion.div initial={{ opacity: 0, y: reduce ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }}>
                            <div className="rounded-3xl border border-dashed border-border/60 bg-card/40 backdrop-blur p-10 text-center">
                                <p className="text-muted-foreground mb-4">Belum ada job aktif.</p>
                                <div className="mt-2 inline-flex">
                                    <Link to="/post-job">
                                        <Button size="sm" className="font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition duration-300">
                                            <Plus className="mr-2 h-4 w-4" /> Pasang Job
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </section>

                <div className="h-10" />
            </div>
        </AnimatedPage>
    );
}
