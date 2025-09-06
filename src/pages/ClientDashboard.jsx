import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion, MotionConfig } from "framer-motion";
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

// --- Sample data (replace with real data/hooks when integrating) ---
const quickActions = [
    { title: "Posting Pekerjaan", icon: Plus, path: "/post-job" },
    { title: "Lihat Riwayat", icon: Clock, path: "/history" },
    { title: "Chat Worker", icon: MessageSquare, path: "/chat" },
];

const activeJobs = [
    {
        id: 1,
        title: "Bersihkan Taman Belakang",
        worker: "Budi S.",
        status: "Dalam Pengerjaan",
        progress: 60,
    },
    {
        id: 2,
        title: "Desain Logo untuk Startup",
        worker: "Citra L.",
        status: "Menunggu Review",
        progress: 100,
    },
];

// Helper for conditionally joining classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Small status -> badge class mapper that uses your Tailwind tokens
const statusBadge = (status) =>
    status === "Dalam Pengerjaan"
        ? "bg-primary/20 text-primary ring-1 ring-primary/20"
        : status === "Menunggu Review"
            ? "bg-accent/20 text-accent ring-1 ring-accent/20"
            : "bg-muted text-muted-foreground ring-1 ring-border/40";

// Motion presets
const fadeUp = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: "easeOut" },
};

export default function ClientDashboard() {
    return (
        <AnimatedPage>
            <Helmet>
                <title>Dashboard Klien - Kerjain</title>
            </Helmet>

            <MotionConfig reducedMotion="user">
                <div className="relative min-h-screen w-full px-4 py-6 md:px-8 text-foreground overflow-hidden">

                    {/* Decorative background: subtle grid + animated blobs (uses your CSS tokens) */}
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(#00000011_1px,#0000_1px)] [background-size:18px_18px]" />

                        {/* Left blob (primary) */}
                        <motion.div
                            aria-hidden
                            initial={{ x: -80, y: -60, scale: 1 }}
                            animate={{ x: [-80, 10, -40, -80], y: [-60, -10, 30, -60], scale: [1, 1.06, 0.98, 1] }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl"
                            style={{
                                background: 'radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.28), transparent 60%)',
                            }}
                        />

                        {/* Right blob (accent) */}
                        <motion.div
                            aria-hidden
                            initial={{ x: 100, y: 40, scale: 1 }}
                            animate={{ x: [100, -6, 60, 100], y: [40, 80, -10, 40], scale: [1, 0.98, 1.03, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-[-6rem] right-[-4rem] h-80 w-80 rounded-full blur-3xl"
                            style={{
                                background: 'radial-gradient(circle at 70% 70%, hsl(var(--accent) / 0.32), transparent 60%)',
                            }}
                        />
                    </div>

                    {/* Header / Greeting - liquid glass card using your tokens */}
                    <motion.header {...fadeUp} className={cn(
                        "relative z-10 mb-6 md:mb-8 rounded-3xl border border-border/50",
                        "bg-card/60 backdrop-blur-xl shadow-sm"
                    )}>
                        <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6">
                            <div className="space-y-1.5">
                                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Halo, User <span aria-hidden>👋</span></h1>
                                <p className="text-sm md:text-base text-muted-foreground">Target hari ini: cepat, rapi, beres.</p>
                            </div>

                            <div className="flex w-full items-center gap-3 md:w-auto">
                                <Link to="/post-job" className="w-full md:w-auto">
                                    <Button size="lg" className="w-full md:w-auto font-semibold">
                                        <Plus className="mr-2 h-5 w-5" /> Posting Cepat
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.header>

                    {/* Compact KPIs row */}
                    <section className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                        {[
                            { label: "Aktif", value: String(activeJobs.length), icon: Loader2 },
                            { label: "Selesai", value: "12", icon: CheckCircle2 },
                            { label: "Chat", value: "3", icon: MessageSquare },
                            { label: "Draft", value: "1", icon: Clock },
                        ].map((item, i) => (
                            <motion.div key={item.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 * i }}>
                                <Card className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl hover:bg-card/70 transition">
                                    <CardContent className="flex items-center gap-3 p-3">
                                        <div className="rounded-lg border border-border/60 bg-background/60 p-2">
                                            <item.icon className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div className="leading-tight">
                                            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{item.label}</p>
                                            <p className="text-lg font-semibold text-foreground">{item.value}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </section>

                    {/* Quick actions grid */}
                    <section className="mt-8">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-base md:text-lg font-semibold">Aksi Cepat</h2>
                            <Link to="/history" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                                Riwayat <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                            {quickActions.map((action, i) => (
                                <motion.div key={action.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.04 * i }}>
                                    <Link to={action.path} className="group block">
                                        <Card className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl transition hover:shadow-sm">
                                            <CardContent className="flex h-24 flex-col items-center justify-center gap-2 p-3">
                                                <div className="rounded-xl border border-border/60 bg-background/60 p-2 transition-transform group-hover:scale-105">
                                                    <action.icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <p className="text-xs font-medium text-center text-foreground/95">{action.title}</p>
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
                            <h2 className="text-base md:text-lg font-semibold">Pekerjaan Aktif</h2>
                            {activeJobs?.length > 0 && (<p className="text-xs text-muted-foreground">{activeJobs.length} pekerjaan</p>)}
                        </div>

                        {activeJobs.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {activeJobs.map((job, i) => (
                                    <motion.div key={job.id} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.06 * i }}>
                                        <Link to={`/job/${job.id}/track`} className="block">
                                            <Card className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl transition hover:bg-card/70 hover:shadow-sm">
                                                <CardContent className="p-4 md:p-5 space-y-4">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="min-w-0">
                                                            <h3 className="truncate text-base md:text-lg font-semibold text-foreground">{job.title}</h3>
                                                            <p className="mt-1 text-sm text-muted-foreground">Pekerja: <span className="font-medium text-foreground">{job.worker}</span></p>
                                                        </div>

                                                        <span className={cn("shrink-0 rounded-full px-3 py-1 text-[11px] font-medium", statusBadge(job.status))}>{job.status}</span>
                                                    </div>

                                                    {/* Accessible progress bar */}
                                                    <div>
                                                        <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                                                            <span>Progress</span>
                                                            <span>{job.progress}%</span>
                                                        </div>

                                                        <div className="h-2.5 w-full rounded-full bg-muted" role="progressbar" aria-valuenow={job.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Progress ${job.title}`}>
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                whileInView={{ width: `${job.progress}%` }}
                                                                viewport={{ once: true, amount: 0.6 }}
                                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                                className="h-2.5 rounded-full bg-primary"
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
                            <motion.div {...fadeUp}>
                                <div className={cn("rounded-3xl border border-dashed border-border/60 bg-card/40 backdrop-blur-xl p-10 text-center")}>
                                    <p className="text-muted-foreground">Belum ada pekerjaan aktif.</p>
                                    <div className="mt-4">
                                        <Link to="/post-job">
                                            <Button size="sm" className="font-medium"><Plus className="mr-2 h-4 w-4" /> Mulai dari Nol</Button>
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
