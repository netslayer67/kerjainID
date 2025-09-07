// JobTrackingPage.jsx
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
    Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

/**
 * JobTrackingPage (refined)
 * - Reusable for 'worker' and 'client'
 * - Supports job types: onsite / remote / hybrid
 * - Shows paymentMethod (cash | wallet) & quick/detail meta
 * - Lightweight animations and reduced-motion aware
 * - Sanitizes text displayed to avoid tag/script/link injection
 */

/* ---------------- sample job (replace with API) ---------------- */
const defaultJob = {
    id: 123,
    title: "Pasang rak dinding",
    postedVia: "quick", // 'quick' | 'detail'
    paymentMethod: "cash", // 'cash' | 'wallet'
    worker: {
        name: "Budi Santoso",
        initial: "B",
        rating: 4.9,
        reviews: 120,
        phone: "+62 812-3456-7890",
    },
    statusSteps: [
        { name: "Diterima", completed: true, time: "2025-09-07T08:30:00Z" },
        { name: "Dalam Proses", completed: true, time: "2025-09-07T09:12:00Z" },
        { name: "Selesai", completed: false, time: null },
    ],
    progress: 72,
    jobType: "onsite", // onsite | remote | hybrid
    scheduledAt: "2025-09-08T09:00:00Z",
    lastActivity: "Sedang menuju — 10m lalu",
    eta: "10 menit",
    locationLabel: "Jl. Sudirman No. 12, Jakarta",
    fee: 120000,
    quickMeta: { duration: "30m" }, // example quick meta
    detailMeta: { skills: ["pasang", "bor"], category: "perbaikan" },
};

/* ---------------- small utilities ---------------- */
// basic sanitize for displayed strings (strip tags & http links)
const safeText = (v) =>
    String(v || "")
        .replace(/<[^>]*>/g, "")
        .replace(/https?:\/\/[^\s]+/gi, "")
        .slice(0, 2000); // cap length for safety

const fmtDateTime = (iso) =>
    iso ? new Date(iso).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) : "-";

const fmtIDR = (n) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n || 0);

/* ---------------- Step component (memoized) ---------------- */
const Step = React.memo(function Step({ step, index, last, reduceMotion }) {
    const completed = Boolean(step.completed);
    return (
        <div className="relative flex gap-4">
            <div className="flex flex-col items-center">
                <motion.div
                    initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }}
                    animate={reduceMotion ? {} : { scale: 1, opacity: 1 }}
                    transition={{ duration: 0.32, delay: index * 0.03 }}
                    className={`flex h-9 w-9 items-center justify-center rounded-full ring-1 ${completed ? "bg-primary text-primary-foreground ring-primary" : "bg-card/40 text-muted-foreground ring-border"}`}
                    aria-hidden
                >
                    {completed ? <Check className="h-4 w-4" /> : <span className="text-sm font-medium">{index + 1}</span>}
                </motion.div>

                {!last && <span className={`mt-2 h-full w-[1px] ${completed ? "bg-primary/30" : "bg-border/60"} block`} />}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className={`text-sm font-medium ${completed ? "text-foreground" : "text-foreground/90"}`}>{safeText(step.name)}</p>
                        {step.time && <p className="mt-1 text-xs text-muted-foreground">{fmtDateTime(step.time)}</p>}
                    </div>
                    {completed && <span className="text-xs text-emerald-400">✔</span>}
                </div>
            </div>
        </div>
    );
});

/* ---------------- main page ---------------- */
export default function JobTrackingPage({ job = defaultJob, role = "client" /* 'client'|'worker' */ }) {
    const reduceMotion = useReducedMotion();

    // derived clean values
    const {
        statusSteps = [],
        jobType,
        progress = 0,
        worker = {},
        scheduledAt,
        lastActivity,
        eta,
        locationLabel,
        paymentMethod,
        postedVia,
        fee,
        quickMeta,
        detailMeta,
        title,
    } = useMemo(() => job, [job]);

    // subtle motion variants
    const cardAnim = {
        initial: reduceMotion ? {} : { opacity: 0, y: 8 },
        animate: reduceMotion ? {} : { opacity: 1, y: 0 },
        transition: { duration: 0.32, ease: "easeOut" },
    };

    // action handlers (stub: integrate with real handlers)
    const handleReport = () => alert("Lapor masalah — demo");
    const handleChat = () => alert("Buka chat — demo");
    const handleCall = () => (window.location.href = `tel:${worker.phone || ""}`);

    return (
        <AnimatedPage>
            <Helmet>
                <title>Lacak Pekerjaan — Kerjain</title>
                <meta name="description" content="Lihat status pekerjaan, lokasi, dan kontak pekerja." />
            </Helmet>

            <div className="min-h-dvh w-full px-4 pt-6 pb-10 md:px-8 text-foreground">
                {/* header */}
                <motion.div {...cardAnim} className="mb-6 flex items-center gap-3">
                    <Link to={role === "worker" ? "/worker/dashboard" : "/client/dashboard"} aria-label="Kembali">
                        <Button variant="ghost" size="icon" className="rounded-full bg-card/30 hover:bg-card/50 transition-colors duration-300">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>

                    <div>
                        <h1 className="text-lg font-semibold">{safeText(title)}</h1>
                        <p className="text-xs text-muted-foreground">Status, lokasi & kontak</p>
                    </div>
                </motion.div>

                {/* grid */}
                <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
                    {/* left/main */}
                    <div className="md:col-span-2 space-y-5">
                        {/* Job summary */}
                        <Card className="rounded-2xl border border-border/20 bg-background/60">
                            <CardContent className="p-4 flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-base font-semibold truncate">{safeText(title)}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        <span className="capitalize">{jobType}</span> • {safeText(locationLabel)}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="inline-flex items-center gap-2 rounded-lg px-3 py-1 bg-background/10 border border-border/20">
                                        <Star className="h-4 w-4 text-yellow-400" />
                                        <span className="text-sm font-medium">{worker.rating ?? "—"}</span>
                                        <span className="text-xs text-muted-foreground">({worker.reviews ?? 0})</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* details card */}
                        <motion.div {...cardAnim}>
                            <Card className="rounded-2xl border border-border/20 bg-background/10">
                                <CardHeader className="pb-2">
                                    <div className="flex items-baseline justify-between">
                                        <CardTitle className="text-foreground">Detail Pekerjaan</CardTitle>
                                        <span className="text-xs text-muted-foreground">
                                            {jobType === "onsite" ? "On-site" : jobType === "hybrid" ? "Hybrid" : "Remote"}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {postedVia === "quick"
                                            ? "Post singkat — informasi inti"
                                            : "Post detail — cakupan lengkap"}
                                    </p>
                                </CardHeader>

                                <CardContent className="pt-0 space-y-4">
                                    {/* Onsite map / ETA */}
                                    {jobType === "onsite" && (
                                        <>
                                            <div className="relative rounded-xl overflow-hidden border border-border/10 bg-muted/10 aspect-[16/7] flex items-center justify-center text-sm text-muted-foreground">
                                                <div className="flex flex-col items-center gap-2">
                                                    <MapPin className="h-6 w-6" />
                                                    <div className="text-sm">Peta / Tracking</div>
                                                    <div className="text-xs">{safeText(locationLabel)}</div>
                                                </div>

                                                <div className="absolute left-4 top-4 rounded-full bg-card/70 px-3 py-1 text-xs shadow-sm border border-border/30">
                                                    ETA: <span className="font-medium ml-2 text-foreground">{safeText(eta)}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                                                <div>Terakhir: <span className="text-foreground">{safeText(lastActivity)}</span></div>
                                                <div>Jadwal: {fmtDateTime(scheduledAt)}</div>
                                            </div>
                                        </>
                                    )}

                                    {/* Hybrid */}
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

                                    {/* Remote */}
                                    {jobType === "remote" && (
                                        <div className="rounded-xl border border-border/10 bg-background/10 p-4">
                                            <div className="flex items-start gap-3">
                                                <ClipboardList className="h-5 w-5 text-accent" />
                                                <div>
                                                    <p className="text-sm font-medium">Aktivitas Terakhir</p>
                                                    <p className="mt-1 text-xs text-muted-foreground">{safeText(lastActivity || "Menunggu update")}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Payment + meta */}
                                    <div className="flex flex-wrap gap-3 items-center text-sm">
                                        <div className="inline-flex items-center gap-2 rounded-md bg-secondary/10 px-3 py-1 text-xs">
                                            <Clock className="h-4 w-4 text-accent" />
                                            {postedVia === "quick" ? `Singkat • ${safeText(quickMeta?.duration || "—")}` : "Detail"}
                                        </div>

                                        <div className="inline-flex items-center gap-2 rounded-md bg-background/10 px-3 py-1 text-xs">
                                            <span className="font-medium">{fmtIDR(fee)}</span>
                                            <span className="text-muted-foreground text-xs">• {paymentMethod === "cash" ? "Tunai" : "Saldo Wallet"}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* status timeline & progress */}
                        <Card className="rounded-2xl border border-border/20 bg-background/10">
                            <CardHeader>
                                <CardTitle>Status & Progres</CardTitle>
                                <p className="mt-1 text-xs text-muted-foreground">Ikuti tiap tahap secara real-time.</p>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        {statusSteps.map((s, i) => (
                                            <Step key={s.name} step={s} index={i} last={i === statusSteps.length - 1} reduceMotion={reduceMotion} />
                                        ))}
                                    </div>

                                    <div className="mt-3">
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Progress</span>
                                            <span className="text-foreground font-medium">{Math.round(progress)}%</span>
                                        </div>
                                        <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                                            <div
                                                className="h-2 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-800"
                                                style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* right column */}
                    <div className="space-y-4">
                        <Card className="rounded-2xl border border-border/20 bg-background/10">
                            <CardHeader>
                                <CardTitle>Pekerja</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-xl font-bold">
                                        {safeText(worker.initial || "?").slice(0, 1)}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="font-semibold truncate">{safeText(worker.name)}</p>
                                        <p className="text-xs text-muted-foreground truncate">{safeText(worker.phone)}</p>

                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="inline-flex items-center gap-1 rounded-md bg-secondary/10 px-2 py-0.5 text-xs">
                                                <Star className="h-4 w-4 text-yellow-400" /> <span className="font-medium">{worker.rating ?? "—"}</span>
                                            </span>
                                            <span className="text-xs text-muted-foreground">({worker.reviews ?? 0} ulasan)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={handleChat} className="w-full rounded-xl border border-border/30 bg-background/10 px-3 py-2 text-left hover:bg-accent/10 transition-colors duration-300">
                                        <div className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /> <span>Chat</span></div>
                                    </button>

                                    <button onClick={handleCall} className="w-full rounded-xl border border-border/30 bg-background/10 px-3 py-2 text-left hover:bg-accent/10 transition-colors duration-300">
                                        <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> <span>Call</span></div>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border border-border/20 bg-background/10">
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Aksi</p>
                                        <p className="text-xs text-muted-foreground">Tindakan cepat</p>
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    <Link to={`/job/${job.id}/`} className="w-full">
                                        <Button className="w-full rounded-xl bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary/90 transition-colors duration-300">
                                            Lihat Rincian & Invoice
                                        </Button>
                                    </Link>

                                    <Button variant="ghost" onClick={handleReport} className="w-full rounded-xl border border-border/30 bg-card/40 hover:bg-destructive/10 hover:text-destructive transition-colors duration-300">
                                        <X className="mr-2 h-4 w-4" /> Laporkan Masalah
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* sticky CTA */}
                        <div className="sticky top-6">
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
