import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
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

// sample data (demo)
const quickActions = [
    { title: "Pasang Job", icon: Plus, path: "/post-job" },
    { title: "Riwayat", icon: Clock, path: "/history" },
    { title: "Chat", icon: MessageSquare, path: "/chat" },
];

const activeJobs = [
    { id: 1, title: "Bersihkan Taman", worker: "Budi S.", status: "Proses", progress: 60 },
    { id: 2, title: "Desain Logo", worker: "Citra L.", status: "Review", progress: 100 },
];

// helpers
const cn = (...classes) => classes.filter(Boolean).join("");

// Badge classes: gunakan primary & accent token agar konsisten
const badgeClass = (status) =>
    status === "Proses"
        ? "bg-primary/15 text-primary ring-1 ring-primary/20"
        : status === "Review"
            ? "bg-accent/15 text-accent ring-1 ring-accent/20"
            : "bg-muted text-muted-foreground ring-1 ring-border/10";

// motion preset (respect reduced motion)
const fadeUpBase = (reduce) => ({
    initial: { opacity: 0, y: reduce ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.38, ease: "easeOut" },
});

export default function ClientDashboard() {
    const reduce = useReducedMotion();

    return (
        <AnimatedPage>
            <Helmet>
                <title>Dashboard Klien — Kerjain</title>
            </Helmet>

            <MotionConfig reducedMotion="user">
                <div className="relative min-h-screen w-full px-4 py-6 md:px-8 text-foreground overflow-hidden">
                    {/* HEADER */}
                    <motion.header
                        {...fadeUpBase(reduce)}
                        className="mb-6 rounded-3xl border border-border/40 bg-card/70 backdrop-blur-xl shadow-sm"
                    >
                        <div className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between md:p-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-semibold">Halo, Jilliyan 👋</h1>
                                <p className="text-sm text-muted-foreground">
                                    Semoga harimu lancar & produktif
                                </p>
                            </div>

                            {/* Primary CTA: gunakan primary color token */}
                            <div className="w-full md:w-auto mt-3 md:mt-0">
                                <Link to="/post-job" aria-label="Posting cepat">
                                    <Button
                                        size="lg"
                                        className="
                      w-full md:w-auto font-semibold rounded-xl
                      bg-primary text-primary-foreground
                      hover:bg-primary/90
                      focus-visible:ring-2 focus-visible:ring-primary/30
                      transition transform will-change-transform
                    "
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
                        {[
                            { label: "Aktif", value: activeJobs.length, icon: Loader2 },
                            { label: "Selesai", value: "12", icon: CheckCircle2 },
                            { label: "Chat", value: "3", icon: MessageSquare },
                            { label: "Draft", value: "1", icon: Clock },
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                {...fadeUpBase(reduce)}
                                transition={{ ...fadeUpBase(reduce).transition, delay: 0.04 * i }}
                            >
                                <Card className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur hover:shadow-md hover:bg-card/70 transition">
                                    <CardContent className="flex items-center gap-3 p-3">
                                        <div
                                            className="
                        rounded-lg border border-border/50
                        bg-[linear-gradient(180deg,var(--card)_0%,hsl(var(--accent)/10)_100%)]
                        p-2 flex items-center justify-center
                        min-w-[38px]
                      "
                                            aria-hidden
                                        >
                                            {/* ikon pakai accent untuk contrast */}
                                            <item.icon className="h-4 w-4 text-accent" />
                                        </div>

                                        <div className="leading-tight">
                                            <p className="text-[11px] uppercase text-muted-foreground">{item.label}</p>
                                            <p className="text-lg font-semibold">{item.value}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
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
                            {quickActions.map((action, i) => (
                                <motion.div
                                    key={action.title}
                                    {...fadeUpBase(reduce)}
                                    transition={{ ...fadeUpBase(reduce).transition, delay: 0.04 * i }}
                                >
                                    <Link to={action.path} className="group block" aria-label={action.title}>
                                        <Card className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur hover:shadow-md hover:bg-card/70 transition">
                                            <CardContent className="flex h-24 flex-col items-center justify-center gap-2 p-3">
                                                <div
                                                    className="
                            rounded-xl border border-border/50 bg-background/50 p-2
                            transition-transform group-hover:scale-105
                            flex items-center justify-center
                          "
                                                >
                                                    {/* quick action icon: gunakan accent agar lebih hidup */}
                                                    <action.icon className="h-5 w-5 text-accent" />
                                                </div>
                                                <p className="text-xs font-medium text-center">{action.title}</p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Active Jobs */}
                    <section className="mt-10">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-base font-semibold">Job Aktif</h2>
                            {activeJobs?.length > 0 && <p className="text-xs text-muted-foreground">{activeJobs.length} job</p>}
                        </div>

                        {activeJobs.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {activeJobs.map((job, i) => (
                                    <motion.div
                                        key={job.id}
                                        {...fadeUpBase(reduce)}
                                        transition={{ ...fadeUpBase(reduce).transition, delay: 0.06 * i }}
                                    >
                                        <Link to={`/job/${job.id}/track`} className="group block" aria-label={`Lihat ${job.title}`}>
                                            <Card className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur hover:shadow-md hover:bg-card/70 transition">
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

                                                    {/* Progress */}
                                                    <div>
                                                        <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                                                            <span>Progress</span>
                                                            <span className="text-xs font-medium text-foreground">{job.progress}%</span>
                                                        </div>

                                                        <div className="h-2.5 w-full rounded-full bg-muted" role="progressbar" aria-valuenow={job.progress} aria-valuemin={0} aria-valuemax={100}>
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                whileInView={{ width: `${job.progress}%` }}
                                                                viewport={{ once: true }}
                                                                transition={{ duration: 0.9, ease: "easeOut" }}
                                                                className="h-2.5 rounded-full bg-gradient-to-r from-primary to-accent"
                                                            />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <motion.div {...fadeUpBase(reduce)}>
                                <div className="rounded-3xl border border-dashed border-border/60 bg-card/40 backdrop-blur p-10 text-center">
                                    <p className="text-muted-foreground mb-4">Belum ada job aktif.</p>
                                    <div className="mt-2 inline-flex">
                                        <Link to="/post-job">
                                            <Button
                                                size="sm"
                                                className="
                          font-medium rounded-md
                          bg-primary text-primary-foreground
                          hover:bg-primary/90 transition
                        "
                                            >
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
            </MotionConfig>
        </AnimatedPage>
    );
}
