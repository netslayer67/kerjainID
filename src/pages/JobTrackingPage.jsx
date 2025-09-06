import React, { useMemo } from "react";
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
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

/* ---------------- sample job (replace with API) ---------------- */
const jobSample = {
    id: 123,
    title: "Pasang rak dinding",
    worker: { name: "Budi Santoso", initial: "B", rating: 4.9, reviews: 120, phone: "+62 812-3456-7890" },
    statusSteps: [
        { name: "Diterima", completed: true, time: "2025-09-07 08:30" },
        { name: "Dalam Proses", completed: true, time: "2025-09-07 09:12" },
        { name: "Selesai", completed: false, time: null },
    ],
    progress: 72,
    jobType: "onsite",
    scheduledAt: "2025-09-08T09:00:00Z",
    lastActivity: "Sedang menuju — 10m lalu",
    eta: "10 menit",
    locationLabel: "Jl. Sudirman No. 12, Jakarta",
};

/* ---------------- small presentational components ---------------- */
const Step = ({ step, index, last }) => {
    const completed = step.completed;
    return (
        <div className="relative flex gap-4">
            {/* marker + connector */}
            <div className="flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.32, ease: "easeOut", delay: index * 0.04 }}
                    className={`flex h-9 w-9 items-center justify-center rounded-full ring-1 ${completed ? "bg-primary text-primary-foreground ring-primary" : "bg-card/40 text-muted-foreground ring-border"
                        }`}
                    aria-hidden
                >
                    {completed ? <Check className="h-4 w-4" /> : <span className="text-sm font-medium">{index + 1}</span>}
                </motion.div>

                {/* vertical connector */}
                {!last && <span className={`mt-2 h-full w-[1px] ${completed ? "bg-primary/30" : "bg-border/60"} block`} />}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className={`text-sm font-medium ${completed ? "text-foreground" : "text-foreground/90"}`}>{step.name}</p>
                        {step.time && <p className="mt-1 text-xs text-muted-foreground">{new Date(step.time).toLocaleString("id-ID")}</p>}
                    </div>
                    {completed && <span className="text-xs text-emerald-400">✔</span>}
                </div>
            </div>
        </div>
    );
};

/* ---------------- page ---------------- */
export default function JobTrackingPage({ job = jobSample }) {
    // derive presented values once
    const { statusSteps, jobType, progress, worker, scheduledAt, lastActivity, eta, locationLabel } = useMemo(() => job, [job]);

    const fmtDateTime = (iso) => new Date(iso).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

    const cardAnim = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.32 } };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Lacak Pekerjaan — Kerjain</title>
            </Helmet>

            <div className="min-h-dvh w-full px-4 pt-6 pb-10 md:px-8 text-foreground">
                {/* Header */}
                <motion.div
                    {...cardAnim}
                    className="mb-6 flex items-center gap-3"
                >
                    <Link to="/client/dashboard" aria-label="Kembali">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-card/30 hover:bg-card/50 transition-colors duration-300"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>

                    <div>
                        <h1 className="text-lg font-semibold">Lacak Pekerjaan</h1>
                        <p className="text-xs text-muted-foreground">Status & kontak pekerja</p>
                    </div>
                </motion.div>

                {/* layout grid */}
                <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
                    {/* left / main column */}
                    <div className="md:col-span-2 space-y-5">
                        {/* job summary */}
                        <Card className="rounded-2xl border border-border/20 bg-background/60 backdrop-blur-xl">
                            <CardContent className="p-4 flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-base font-semibold truncate">{job.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        <span className="capitalize">{jobType}</span> • {locationLabel}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="inline-flex items-center gap-2 rounded-lg px-3 py-1 bg-background/10 border border-border/20">
                                        <Star className="h-4 w-4 text-yellow-400" />
                                        <span className="text-sm font-medium">{worker.rating}</span>
                                        <span className="text-xs text-muted-foreground">({worker.reviews})</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* detail card: map / schedule / activity */}
                        <motion.div {...cardAnim}>
                            <Card className="rounded-2xl border border-border/20 bg-background/10 backdrop-blur-xl">
                                <CardHeader className="pb-2">
                                    <div className="flex items-baseline justify-between">
                                        <CardTitle className="text-foreground">Detail Pekerjaan</CardTitle>
                                        <span className="text-xs text-muted-foreground">
                                            {jobType === "onsite" ? "On-site" : jobType === "hybrid" ? "Hybrid" : "Remote"}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {jobType === "onsite"
                                            ? "Pemantauan lokasi & ETA pekerja."
                                            : jobType === "hybrid"
                                                ? "Jadwal on-site & remote."
                                                : "Update aktivitas pekerjaan dari pekerja."}
                                    </p>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    {/* On-site: map placeholder with ETA badge */}
                                    {jobType === "onsite" && (
                                        <div className="space-y-3">
                                            <div className="relative rounded-xl overflow-hidden border border-border/10 bg-muted/10 aspect-[16/7] flex items-center justify-center text-sm text-muted-foreground">
                                                {/* map placeholder */}
                                                <div className="flex flex-col items-center gap-2">
                                                    <MapPin className="h-6 w-6" />
                                                    <div className="text-sm">Peta lokasi / tracking</div>
                                                    <div className="text-xs">{locationLabel}</div>
                                                </div>

                                                <div className="absolute left-4 top-4 rounded-full bg-card/70 px-3 py-1 text-xs shadow-md border border-border/30">
                                                    ETA: <span className="font-medium ml-2 text-foreground">{eta}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-3">
                                                <div className="text-xs text-muted-foreground">
                                                    Terakhir: <span className="text-foreground">{lastActivity}</span>
                                                </div>
                                                <div className="text-xs text-muted-foreground">Jadwal: {fmtDateTime(scheduledAt)}</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Hybrid: schedule card */}
                                    {jobType === "hybrid" && (
                                        <div className="rounded-xl border border-border/10 bg-background/10 p-4">
                                            <div className="flex items-start gap-3">
                                                <Calendar className="h-5 w-5 text-accent" />
                                                <div>
                                                    <p className="text-sm font-medium">Jadwal On-site</p>
                                                    <p className="mt-1 text-xs text-muted-foreground">{fmtDateTime(scheduledAt)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Remote: activity feed summary */}
                                    {jobType === "remote" && (
                                        <div className="rounded-xl border border-border/10 bg-background/10 p-4">
                                            <div className="flex items-start gap-3">
                                                <ClipboardList className="h-5 w-5 text-accent" />
                                                <div>
                                                    <p className="text-sm font-medium">Aktivitas Terakhir</p>
                                                    <p className="mt-1 text-xs text-muted-foreground">{lastActivity || "Menunggu update"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* status timeline & progress */}
                        <Card className="rounded-2xl border border-border/20 bg-background/10 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle>Status & Progres</CardTitle>
                                <p className="mt-1 text-xs text-muted-foreground">Ikuti tiap tahap pekerjaan secara real-time.</p>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-4">
                                    {/* vertical timeline */}
                                    <div className="space-y-3">
                                        {statusSteps.map((s, idx) => (
                                            <Step key={s.name} step={s} index={idx} last={idx === statusSteps.length - 1} />
                                        ))}
                                    </div>

                                    {/* progress bar */}
                                    <div className="mt-3">
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Progress</span>
                                            <span className="text-foreground font-medium">{progress}%</span>
                                        </div>
                                        <div className="mt-2 h-2 w-full rounded-full bg-muted">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                className="h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* right column: worker card + actions */}
                    <div className="space-y-4">
                        <Card className="rounded-2xl border border-border/20 bg-background/10 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle>Pekerja</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-xl font-bold">
                                        {worker.initial}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold truncate">{worker.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">{worker.phone}</p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="inline-flex items-center gap-1 rounded-md bg-secondary/10 px-2 py-0.5 text-xs">
                                                <Star className="h-4 w-4 text-yellow-400" /> <span className="font-medium">{worker.rating}</span>
                                            </span>
                                            <span className="text-xs text-muted-foreground">({worker.reviews} ulasan)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Link to={`/chat/${worker.name}`} className="w-full">
                                        <Button className="w-full rounded-xl border border-border/30 bg-background/10 text-foreground hover:bg-accent/10 transition-colors duration-300">
                                            <MessageSquare className="mr-2 h-4 w-4" /> Chat
                                        </Button>
                                    </Link>

                                    <a href={`tel:${worker.phone}`} className="w-full">
                                        <Button className="w-full rounded-xl border border-border/30 bg-background/10 text-foreground hover:bg-accent/10 transition-colors duration-300">
                                            <Phone className="mr-2 h-4 w-4" /> Call
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border border-border/20 bg-background/10 backdrop-blur-xl">
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Aksi</p>
                                        <p className="text-xs text-muted-foreground">Tindakan cepat terkait pekerjaan</p>
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    <Link to={`/job/${job.id}/track`} className="w-full">
                                        <Button className="w-full rounded-xl bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors duration-300">
                                            Lihat Rincian & Invoice
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="ghost"
                                        className="w-full rounded-xl border border-border/30 bg-card/40 hover:bg-destructive/10 hover:text-destructive transition-colors duration-300"
                                        as="button"
                                        onClick={() => alert("Laporkan masalah — fitur demo")}
                                    >
                                        <X className="mr-2 h-4 w-4" /> Laporkan Masalah
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* sticky CTA */}
                        <div className="sticky top-[calc(100vh_-_220px)]">
                            <Link to={`/job/${job.id}/rate`}>
                                <Button className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-lg hover:scale-[1.01] transition-transform duration-300">
                                    Selesaikan & Beri Rating
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}
