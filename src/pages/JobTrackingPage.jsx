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

// Sample payload (replace with real API data)
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
    jobType: "onsite",
    scheduledAt: "2025-09-08T09:00:00Z",
    lastActivity: "Sedang menuju — 10m lalu",
};

const StepCircle = ({ completed, index }) => (
    <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.25, delay: index * 0.05 }}
        className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full border
      ${completed
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border/30 bg-background/10 text-muted-foreground"}
    `}
    >
        {completed ? <Check className="h-4 w-4" /> : index + 1}
    </motion.div>
);


// Conditional sections
const OnsiteMap = () => (
    <div className="aspect-video flex items-center justify-center rounded-xl border border-border/20 bg-muted/10 text-sm text-muted-foreground">
        <MapPin className="mr-2 h-5 w-5" /> Lokasi pekerja ditampilkan di peta
    </div>
);

const RemoteInfo = ({ lastActivity }) => (
    <div className="rounded-xl border border-border/20 bg-background/10 p-4 text-sm">
        <div className="flex gap-3 items-start">
            <ClipboardList className="h-5 w-5 text-accent" />
            <div>
                <p className="font-medium">Progres</p>
                <p className="text-xs text-muted-foreground mt-1">{lastActivity}</p>
            </div>
        </div>
    </div>
);

const HybridInfo = ({ scheduledAt }) => (
    <div className="rounded-xl border border-border/20 bg-background/10 p-4 text-sm">
        <div className="flex gap-3 items-start">
            <Calendar className="h-5 w-5 text-accent" />
            <div>
                <p className="font-medium">Rencana On-site</p>
                <p className="text-xs text-muted-foreground mt-1">
                    {new Date(scheduledAt).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                    })}
                </p>
            </div>
        </div>
    </div>
);

const JobTrackingPage = () => {
    const { statusSteps, jobType, progress, worker, scheduledAt, lastActivity } = job;
    // --- helper: format tanggal ringkas (untuk hybrid) ---
    const fmtDateTime = (iso) =>
        new Date(iso).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });


    return (
        <AnimatedPage>
            <Helmet>
                <title>Lacak Pekerjaan — Kerjain</title>
            </Helmet>

            <div className="min-h-dvh w-full px-4 pt-6 pb-10 md:px-8 text-foreground">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 mb-6"
                >
                    <Link to="/client/dashboard" aria-label="Kembali">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-background/10 hover:bg-background/20"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-lg font-semibold">Lacak Pekerjaan</h1>
                        <p className="text-xs text-muted-foreground">Sederhana & jelas</p>
                    </div>
                </motion.div>

                {/* Content */}
                <div className="grid gap-5 md:grid-cols-3 max-w-5xl mx-auto">
                    {/* Left column */}
                    <div className="md:col-span-2 space-y-5">
                        {/* Job info */}
                        <Card className="rounded-2xl border border-border/20 bg-background/60 backdrop-blur-xl">
                            <CardContent className="p-4 flex justify-between items-center">
                                <div>
                                    <p className="text-base font-semibold">{job.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Tipe: {jobType}</p>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg px-3 py-1 bg-background/10 border border-border/20">
                                    <Star className="h-4 w-4 text-yellow-400" />
                                    <span className="text-sm font-medium">{worker.rating}</span>
                                    <span className="text-xs text-muted-foreground">({worker.reviews})</span>
                                </div>
                            </CardContent>
                        </Card>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.36, delay: 0.06 }}
                        >
                            <Card className="rounded-2xl border border-border/20 bg-background/10 backdrop-blur-xl">
                                <CardHeader className="pb-2">
                                    {/* Judul dibuat sederhana + sublabel dinamis */}
                                    <div className="flex items-baseline justify-between">
                                        <CardTitle className="text-foreground">Detail Pekerjaan</CardTitle>
                                        <span className="text-xs text-muted-foreground capitalize">
                                            {/* sublabel sesuai jobType */}
                                            {jobType === "onsite"
                                                ? "On-site"
                                                : jobType === "hybrid"
                                                    ? "Hybrid"
                                                    : "Remote"}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {jobType === "onsite"
                                            ? "Lokasi pekerja ditampilkan di peta."
                                            : jobType === "hybrid"
                                                ? "Jadwal on-site terencana."
                                                : "Pekerjaan dipantau jarak jauh."}
                                    </p>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    {jobType === "onsite" && (
                                        /* On-site: peta placeholder */
                                        <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/10 bg-muted/10 flex items-center justify-center text-sm text-muted-foreground">
                                            <div className="flex flex-col items-center gap-2">
                                                <MapPin className="h-6 w-6" />
                                                <span>Lokasi pekerja ditampilkan di peta</span>
                                            </div>
                                        </div>
                                    )}

                                    {jobType === "hybrid" && (
                                        /* Hybrid: kartu jadwal */
                                        <div className="w-full rounded-xl border border-border/10 bg-background/10 backdrop-blur-sm p-4">
                                            <div className="flex items-start gap-3">
                                                <Calendar className="h-5 w-5 text-accent" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-foreground">Rencana On-site</p>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {fmtDateTime(scheduledAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {jobType === "remote" && (
                                        /* Remote: kartu progres */
                                        <div className="w-full rounded-xl border border-border/10 bg-background/10 backdrop-blur-sm p-4">
                                            <div className="flex items-start gap-3">
                                                <ClipboardList className="h-5 w-5 text-accent" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-foreground">Progres Remote</p>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {lastActivity || "Menunggu update"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>


                        {/* Status & progress */}
                        <Card className="rounded-2xl border border-border/20 bg-background/10 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle>Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    {statusSteps.map((s, i) => (
                                        <div key={s.name} className="flex-1 text-center">
                                            <StepCircle completed={s.completed} index={i} />
                                            <p
                                                className={`mt-2 text-xs ${s.completed
                                                    ? "text-foreground font-medium"
                                                    : "text-muted-foreground"
                                                    }`}
                                            >
                                                {s.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Progress</span>
                                        <span className="text-foreground font-medium">{progress}%</span>
                                    </div>
                                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            className="h-2 rounded-full bg-primary"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    {/* Right column */}
                    <div className="space-y-4">
                        <Card className="rounded-2xl border border-border/20 bg-background/10 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle>Pekerja</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-4 items-center">
                                    <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-xl font-bold">
                                        {worker.initial}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{worker.name}</p>
                                        <p className="text-xs text-muted-foreground">{job.lastActivity}</p>
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

                        {/* CTA */}
                        <div className="sticky bottom-6">
                            <Link to={`/job/${job.id}/rate`}>
                                <Button className="w-full rounded-2xl bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90">
                                    Selesaikan & Beri Rating
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default JobTrackingPage;
