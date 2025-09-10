// src/pages/JobTrackingPage.jsx
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
    Clock,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

/* -------- Utilities -------- */
const safeText = (v) =>
    String(v || "")
        .replace(/<[^>]*>/g, "")
        .replace(/https?:\/\/[^\s]+/gi, "")
        .slice(0, 2000);

const fmtDateTime = (iso) =>
    iso
        ? new Date(iso).toLocaleString("id-ID", {
            dateStyle: "medium",
            timeStyle: "short",
        })
        : "-";

const fmtIDR = (n) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(n || 0);

/* -------- Timeline Step -------- */
const Step = ({ step, index, last, reduceMotion }) => {
    const completed = Boolean(step.completed);
    return (
        <div className="relative flex gap-4">
            <div className="flex flex-col items-center">
                <motion.div
                    initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }}
                    animate={reduceMotion ? {} : { scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`flex h-9 w-9 items-center justify-center rounded-full ring-1 transition-colors duration-300 ${completed
                            ? "bg-primary text-primary-foreground ring-primary"
                            : "bg-card text-muted-foreground ring-border"
                        }`}
                >
                    {completed ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                    )}
                </motion.div>
                {!last && (
                    <span
                        className={`mt-2 h-full w-[1px] ${completed ? "bg-primary/40" : "bg-border/50"
                            }`}
                    />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p
                    className={`text-sm font-medium ${completed ? "text-foreground" : "text-foreground/90"
                        }`}
                >
                    {safeText(step.name)}
                </p>
                {step.time && (
                    <p className="mt-1 text-xs text-muted-foreground">
                        {fmtDateTime(step.time)}
                    </p>
                )}
            </div>
        </div>
    );
};

/* -------- Main -------- */
export default function JobTrackingPage({ job, role = "client" }) {
    const reduceMotion = useReducedMotion();

    // dummy fallback
    const dummyJob = {
        id: "1",
        title: "Perbaikan AC Ruang Tamu",
        jobType: "onsite",
        statusSteps: [
            { name: "Pesanan dibuat", completed: true, time: new Date().toISOString() },
            { name: "Pekerja menuju lokasi", completed: true, time: new Date().toISOString() },
            { name: "Pekerjaan sedang berlangsung", completed: false },
            { name: "Pekerjaan selesai", completed: false },
        ],
        progress: 55,
        worker: {
            name: "Budi Santoso",
            phone: "08123456789",
            rating: 4.8,
            reviews: 132,
            initial: "B",
        },
        scheduledAt: new Date().toISOString(),
        lastActivity: "Pekerja sedang dalam perjalanan",
        eta: "15 menit",
        locationLabel: "Jl. Merpati No. 45, Jakarta",
        paymentMethod: "wallet",
        postedVia: "quick",
        fee: 250000,
        quickMeta: { duration: "2 jam" },
    };

    const safeJob = useMemo(() => job || dummyJob, [job]);
    const {
        id,
        title,
        jobType,
        statusSteps,
        progress,
        worker,
        scheduledAt,
        lastActivity,
        eta,
        locationLabel,
        paymentMethod,
        postedVia,
        fee,
        quickMeta,
    } = safeJob;

    const cardAnim = {
        initial: reduceMotion ? {} : { opacity: 0, y: 8 },
        animate: reduceMotion ? {} : { opacity: 1, y: 0 },
        transition: { duration: 0.35, ease: "easeOut" },
    };

    const handleReport = () => alert("Lapor masalah — demo");
    const handleChat = () => alert("Buka chat — demo");
    const handleCall = () => (window.location.href = `tel:${worker.phone || ""}`);

    return (
        <AnimatedPage>
            <Helmet>
                <title>Lacak Pekerjaan</title>
            </Helmet>

            <div className="min-h-dvh w-full px-4 pt-6 pb-10 md:px-8 text-foreground">
                {/* Header */}
                <motion.div {...cardAnim} className="mb-6 flex items-center gap-3">
                    <Link to={role === "worker" ? "/worker/dashboard" : "/client/dashboard"}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-card/30 hover:bg-accent/20 transition-colors duration-300"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-lg font-semibold">{safeText(title)}</h1>
                        <p className="text-xs text-muted-foreground">Status pekerjaan</p>
                    </div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
                    {/* Left/Main */}
                    <div className="md:col-span-2 space-y-5">
                        {/* Summary */}
                        <Card>
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="text-base font-semibold truncate">{safeText(title)}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        <span className="capitalize">{jobType}</span> • {safeText(locationLabel)}
                                    </p>
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-lg px-3 py-1 bg-secondary/30">
                                    <Star className="h-4 w-4 text-yellow-400" />
                                    <span className="text-sm font-medium">{worker.rating ?? "—"}</span>
                                    <span className="text-xs text-muted-foreground">
                                        ({worker.reviews ?? 0})
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Detail */}
                        <motion.div {...cardAnim}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">Detail</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="relative aspect-[16/7] rounded-xl border flex items-center justify-center text-sm text-muted-foreground">
                                        <MapPin className="h-6 w-6" />
                                        <div className="absolute left-4 top-4 rounded-full bg-card/80 px-3 py-1 text-xs border shadow-sm">
                                            ETA: <span className="font-medium">{safeText(eta)}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>
                                            Terakhir:{" "}
                                            <span className="text-foreground">{safeText(lastActivity)}</span>
                                        </span>
                                        <span>Jadwal: {fmtDateTime(scheduledAt)}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-3 text-xs">
                                        <div className="inline-flex items-center gap-2 rounded-md bg-secondary/20 px-3 py-1">
                                            <Clock className="h-4 w-4 text-accent" />
                                            {postedVia === "quick"
                                                ? `Singkat • ${safeText(quickMeta?.duration || "—")}`
                                                : "Detail"}
                                        </div>
                                        <div className="inline-flex items-center gap-2 rounded-md border px-3 py-1">
                                            <span className="font-medium">{fmtIDR(fee)}</span>
                                            <span className="text-muted-foreground">
                                                {paymentMethod === "cash" ? "Tunai" : "Wallet"}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Progress */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Progres</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {statusSteps.map((s, i) => (
                                        <Step
                                            key={s.name}
                                            step={s}
                                            index={i}
                                            last={i === statusSteps.length - 1}
                                            reduceMotion={reduceMotion}
                                        />
                                    ))}
                                    <div>
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Progress</span>
                                            <span className="text-foreground font-medium">
                                                {Math.round(progress)}%
                                            </span>
                                        </div>
                                        <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                                            <div
                                                className="h-2 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
                                                style={{ width: `${Math.min(100, progress)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right/Actions */}
                    <div className="space-y-4">
                        {/* Worker */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Pekerja</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
                                        {safeText(worker.initial || "?").slice(0, 1)}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{safeText(worker.name)}</p>
                                        <p className="text-xs text-muted-foreground">{safeText(worker.phone)}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={handleChat}
                                        className="w-full rounded-xl border px-3 py-2 hover:bg-accent/10 transition-colors duration-300"
                                    >
                                        <div className="flex items-center gap-2 text-sm">
                                            <MessageSquare className="h-4 w-4" /> Chat
                                        </div>
                                    </button>
                                    <button
                                        onClick={handleCall}
                                        className="w-full rounded-xl border px-3 py-2 hover:bg-accent/10 transition-colors duration-300"
                                    >
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="h-4 w-4" /> Call
                                        </div>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardContent className="space-y-3">
                                <Button
                                    asChild
                                    className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
                                >
                                    <Link to={`/job/${id}/`}>Lihat Rincian</Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={handleReport}
                                    className="w-full rounded-xl border hover:bg-destructive/10 hover:text-destructive transition-colors duration-300"
                                >
                                    <X className="mr-2 h-4 w-4" /> Laporkan
                                </Button>
                            </CardContent>
                        </Card>

                        {/* CTA */}
                        <div className="sticky top-6">
                            <Button
                                asChild
                                className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md hover:opacity-90 transition-all duration-300"
                            >
                                <Link to={`/job/${id}/rate`}>Selesaikan & Rating</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}
