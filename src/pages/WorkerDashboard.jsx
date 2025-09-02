// WorkerDashboard.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { Power, Check, X, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";

/**
 * WorkerDashboard (refactored)
 * - Mobile-first responsive layout
 * - Uses theme tokens (bg-background, bg-card, border-border, etc.)
 * - Glassmorphism cards, subtle grid background, soft blobs
 * - Smooth Framer Motion entrance & interaction animations
 * - Accessible controls & minimal text
 */

const DUMMY_JOB = {
    id: 1,
    title: "Antar Dokumen",
    description: "Ambil dokumen dari kantor pusat dan antarkan ke klien di SCBD.",
    client: "Andi W.",
    distance: "1.2 km",
    fee: "Rp 25.000",
    time: "15 menit",
};

const variants = {
    cardHidden: { opacity: 0, y: 12, scale: 0.99 },
    cardShow: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    popIn: { scale: [0.95, 1.02, 1], opacity: [0, 1], transition: { duration: 0.45 } },
};

export default function WorkerDashboard() {
    const [isOnline, setIsOnline] = useState(false);
    const [showJobRequest, setShowJobRequest] = useState(false);
    const { toast } = useToast();

    const toggleOnline = () => {
        setIsOnline((s) => !s);

        if (!isOnline) {
            toast({ title: "Anda Online", description: "Menunggu permintaan kerja..." });
            // Simulate incoming job
            setTimeout(() => setShowJobRequest(true), 2000);
        } else {
            toast({ title: "Anda Offline", variant: "destructive" });
            setShowJobRequest(false);
        }
    };

    const handleJobResponse = (accepted) => {
        setShowJobRequest(false);
        if (accepted) {
            toast({ title: "Pekerjaan Diterima", description: "Mengalihkan ke mode pelacakan..." });
            // navigate to tracking, open map, etc. (implement as needed)
        } else {
            toast({ title: "Ditolak", description: "Mencari pekerjaan lain...", variant: "destructive" });
        }
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Dashboard Pekerja — Kerjain</title>
            </Helmet>

            <div className="relative min-h-screen px-4 py-6">
                {/* Subtle grid background (theme-aware by opacity & token usage) */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-6"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 56px), repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 56px)",
                    }}
                />

                {/* Soft accent blobs */}
                <div className="absolute -left-12 -top-20 h-72 w-72 rounded-full blur-3xl opacity-25 bg-primary/30 -z-20 animate-[pulse_6s_infinite]"></div>
                <div className="absolute right-8 bottom-8 h-96 w-96 rounded-full blur-2xl opacity-24 bg-accent/20 -z-20 animate-[pulse_8s_infinite]"></div>

                {/* Container */}
                <div className="mx-auto max-w-3xl space-y-8">
                    {/* Online status card */}
                    <motion.div
                        initial="cardHidden"
                        animate="cardShow"
                        variants={variants}
                        className="rounded-2xl border border-border bg-card/60 backdrop-blur-xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                        <div className="text-center sm:text-left">
                            <h2 className="text-lg md:text-xl font-semibold text-foreground">Halo, Pekerja</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                {isOnline ? "Sedang online & menunggu pekerjaan" : "Sedang offline"}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                size="md"
                                onClick={toggleOnline}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-transform focus:outline-none focus:ring-2 focus:ring-accent/30 ${isOnline ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
                                    }`}
                                aria-pressed={isOnline}
                                aria-label={isOnline ? "Go offline" : "Go online"}
                            >
                                <Power className="h-5 w-5" />
                                <span className="hidden sm:inline">{isOnline ? "Offline" : "Online"}</span>
                                <span className="sm:hidden">{isOnline ? "Off" : "On"}</span>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Incoming job / Empty state */}
                    <div className="relative min-h-[320px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {showJobRequest && isOnline ? (
                                <motion.div
                                    key="incoming"
                                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 170, damping: 20 }}
                                    className="w-full"
                                >
                                    <Card className="rounded-2xl border border-border bg-card/70 backdrop-blur-2xl shadow-2xl">
                                        <CardHeader className="p-5 text-center">
                                            <CardTitle className="text-lg font-semibold text-foreground">Pekerjaan Baru</CardTitle>
                                            <p className="mt-1 text-sm text-muted-foreground">Segera ambil sebelum waktu habis</p>
                                        </CardHeader>

                                        <CardContent className="p-5 space-y-4">
                                            <div className="text-center">
                                                <h3 className="text-base font-medium text-foreground">{DUMMY_JOB.title}</h3>
                                                <p className="mt-2 text-sm text-muted-foreground">{DUMMY_JOB.description}</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="rounded-xl p-3 bg-background/40 border border-border">
                                                    <p className="text-xs text-muted-foreground">Klien</p>
                                                    <p className="font-medium text-foreground">{DUMMY_JOB.client}</p>
                                                </div>

                                                <div className="rounded-xl p-3 bg-background/40 border border-border">
                                                    <p className="text-xs text-muted-foreground">Bayaran</p>
                                                    <p className="font-semibold text-primary">{DUMMY_JOB.fee}</p>
                                                </div>

                                                <div className="flex items-center gap-2 rounded-xl p-3 bg-background/40 border border-border">
                                                    <MapPin className="h-4 w-4 text-accent" />
                                                    <span className="text-sm text-foreground">{DUMMY_JOB.distance}</span>
                                                </div>

                                                <div className="flex items-center gap-2 rounded-xl p-3 bg-background/40 border border-border">
                                                    <Clock className="h-4 w-4 text-accent" />
                                                    <span className="text-sm text-foreground">{DUMMY_JOB.time}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 pt-2">
                                                <Button
                                                    onClick={() => handleJobResponse(false)}
                                                    variant="outline"
                                                    className="w-full border-border text-foreground hover:bg-muted/20"
                                                >
                                                    <X className="mr-2 h-4 w-4" />
                                                    Tolak
                                                </Button>

                                                <Button
                                                    onClick={() => handleJobResponse(true)}
                                                    className="w-full bg-primary text-primary-foreground hover:bg-accent"
                                                >
                                                    <Check className="mr-2 h-4 w-4" />
                                                    Terima
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial="cardHidden"
                                    animate="cardShow"
                                    exit={{ opacity: 0 }}
                                    className="text-center"
                                >
                                    <motion.h3 variants={variants} className="text-lg font-semibold text-foreground">
                                        {isOnline ? "Mencari pekerjaan..." : "Anda Offline"}
                                    </motion.h3>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {isOnline ? "Kami akan memberi tahu jika ada tugas baru." : "Aktifkan status online untuk menerima pekerjaan."}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}

/* helper moved inside file to keep demo self-contained */
function handleJobResponse(accepted) {
    // This is a placeholder if you want global handling here.
    // In the component above, handleJobResponse is declared inline to use toast().
    // Keep this file's exported component as-is and modify behavior per app needs.
    // (No-op to avoid linter warnings when copying)
    return accepted;
}
