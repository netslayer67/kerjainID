// JobTrackingPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    MessageSquare,
    Phone,
    Star,
    Check,
    MapPin,
    Calendar,
    ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

/**
 * Sample job payload — replace with real props / data fetching
 * jobType: 'onsite' | 'hybrid' | 'remote'
 */
const job = {
    id: 123,
    title: "Pasang rak dinding",
    worker: { name: "Budi Santoso", initial: "B", rating: 4.9, reviews: 120 },
    statusSteps: [
        { name: "Diterima", completed: true },
        { name: "Dalam Proses", completed: true },
        { name: "Selesai", completed: false },
    ],
    progress: 72,
    jobType: "onsite", // change to 'remote' or 'hybrid' to see alternatives
    scheduledAt: "2025-09-08T09:00:00Z",
    lastActivity: "Worker on the way — 10m ago",
};

const StepCircle = ({ completed, index }) => (
    <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.28, delay: index * 0.06 }}
        className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 ${completed ? "bg-primary border-primary text-primary-foreground" : "border-border/30 bg-background/10"
            }`}
        aria-hidden
    >
        {completed ? <Check className="h-4 w-4" /> : <span className="text-xs">{index + 1}</span>}
    </motion.div>
);

const OnsiteMapPlaceholder = () => (
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/10 bg-muted/10 flex items-center justify-center text-sm text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
            <MapPin className="h-6 w-6" />
            <span>Lokasi pekerja ditampilkan di peta</span>
        </div>
    </div>
);

const RemoteCard = ({ lastActivity }) => (
    <div className="w-full rounded-xl border border-border/10 bg-background/10 backdrop-blur-sm p-4">
        <div className="flex items-start gap-3">
            <ClipboardList className="h-5 w-5 text-accent" />
            <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Progres remote</p>
                <p className="mt-1 text-xs text-muted-foreground">{lastActivity}</p>
            </div>
        </div>
    </div>
);

const HybridCard = ({ scheduledAt }) => (
    <div className="w-full rounded-xl border border-border/10 bg-background/10 backdrop-blur-sm p-4">
        <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-accent" />
            <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Rencana On-site</p>
                <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(scheduledAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                </p>
            </div>
        </div>
    </div>
);

const JobTrackingPage = () => {
    const { statusSteps, jobType, progress, worker, scheduledAt, lastActivity } = job;

    return (
        <AnimatedPage>
            <Helmet>
                <title>Lacak Pekerjaan — Kerjain</title>
            </Helmet>

            <div className="relative min-h-dvh w-full px-4 pb-6 pt-6 md:px-8  text-foreground overflow-hidden">
                {/* Background blobs (brand tokens used) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 0.12, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="pointer-events-none absolute -top-36 -left-36 w-72 h-72 rounded-full bg-primary blur-[110px] opacity-70"
                    aria-hidden
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 0.08, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="pointer-events-none absolute -bottom-36 -right-36 w-96 h-96 rounded-full bg-accent blur-[140px] opacity-60"
                    aria-hidden
                />

                {/* Sticky header */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36 }}
                    className="sticky top-4 z-40 mx-auto max-w-3xl"
                >
                    <div className="flex items-center gap-3">
                        <Link to="/client/dashboard" aria-label="Kembali ke dashboard">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-background/10 backdrop-blur-md hover:bg-background/20"
                                aria-hidden
                            >
                                <ArrowLeft className="h-5 w-5 text-foreground" />
                            </Button>
                        </Link>

                        <div className="flex-1">
                            <h1 className="text-lg font-semibold tracking-tight">Lacak Pekerjaan</h1>
                            <p className="mt-0.5 text-xs text-muted-foreground">Simpel, cepat, jelas.</p>
                        </div>

                        <div className="hidden sm:flex items-center gap-3">
                            <Button
                                size="sm"
                                className="rounded-lg border border-border/30 bg-background/10 hover:bg-background/20"
                            >
                                <MessageSquare className="mr-2 h-4 w-4" /> Chat
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Main container */}
                <div className="mx-auto mt-5 max-w-3xl grid gap-5 sm:gap-6 md:grid-cols-3">
                    {/* Left column (map or alternative + steps) */}
                    <div className="md:col-span-2 space-y-5">
                        {/* Job title card */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.36 }}
                            className="bg-background/60 backdrop-blur-xl border border-border/20 rounded-2xl p-4"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-base font-semibold text-foreground">{job.title}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">Tipe: {jobType.toUpperCase()}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 rounded-lg px-3 py-1 bg-background/10 border border-border/20">
                                        <Star className="h-4 w-4 text-yellow-400" />
                                        <span className="text-sm font-medium">{worker.rating} </span>
                                        <span className="text-xs text-muted-foreground">({worker.reviews})</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Map or alternative */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.36, delay: 0.06 }}
                        >
                            <Card className="rounded-2xl border border-border/20 bg-background/10 backdrop-blur-xl">
                                <CardHeader>
                                    <CardTitle className="text-foreground">Lokasi Pekerja</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {jobType === "onsite" ? (
                                        <OnsiteMapPlaceholder />
                                    ) : jobType === "hybrid" ? (
                                        <HybridCard scheduledAt={scheduledAt} />
                                    ) : (
                                        <RemoteCard lastActivity={lastActivity} />
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Status & progress */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.12 }}
                        >
                            <Card className="rounded-2xl border border-border/20 bg-background/10 backdrop-blur-xl">
                                <CardHeader>
                                    <CardTitle className="text-foreground">Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between gap-3">
                                        {statusSteps.map((s, i) => (
                                            <div key={s.name} className="relative flex-1 text-center">
                                                <StepCircle completed={s.completed} index={i} />
                                                <p className={`mt-2 text-xs ${s.completed ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                                                    {s.name}
                                                </p>

                                                {i < statusSteps.length - 1 && (
                                                    <div
                                                        className={`absolute left-1/2 top-5 z-0 h-0.5 w-[calc(100%+48px)] -translate-x-1/2 ${statusSteps[i + 1].completed ? "bg-primary" : "bg-border/30"
                                                            }`}
                                                        aria-hidden
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Progress bar */}
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>Progress</span>
                                            <span className="font-medium text-foreground">{progress}%</span>
                                        </div>
                                        <div className="mt-2 h-3 w-full rounded-full bg-muted">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                className="h-3 rounded-full bg-primary"
                                                role="progressbar"
                                                aria-valuenow={progress}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right column (worker info & CTAs) */}
                    <motion.aside
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.14 }}
                        className="space-y-4"
                    >
                        <Card className="rounded-2xl border border-border/20 bg-background/10 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle className="text-foreground">Pekerja</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground shadow-sm">
                                        {worker.initial}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-base font-semibold text-foreground truncate">{worker.name}</p>
                                        <p className="mt-1 text-xs text-muted-foreground truncate">{job.lastActivity}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Link to="/chat" className="w-full">
                                        <motion.div whileTap={{ scale: 0.97 }}>
                                            <Button className="w-full rounded-xl border border-border/30 bg-background/10 text-foreground hover:bg-background/20">
                                                <MessageSquare className="mr-2 h-4 w-4" /> Chat
                                            </Button>
                                        </motion.div>
                                    </Link>

                                    <motion.div whileTap={{ scale: 0.97 }}>
                                        <Button className="w-full rounded-xl border border-border/30 bg-background/10 text-foreground hover:bg-background/20">
                                            <Phone className="mr-2 h-4 w-4" /> Call
                                        </Button>
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Sticky CTA at bottom of the right column (touch-friendly) */}
                        <div className="sticky bottom-6 z-30">
                            <Link to={`/job/${job.id}/rate`}>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button className="w-full rounded-2xl bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90">
                                        Selesaikan & Rating
                                    </Button>
                                </motion.div>
                            </Link>
                        </div>
                    </motion.aside>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default JobTrackingPage;
