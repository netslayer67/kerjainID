// WorkerDashboard.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Power, Check, X, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet";

const IncomingJob = {
    id: 1,
    title: "Antar Dokumen",
    client: "Andi W.",
    distance: "1.2 km",
    fee: "Rp 25.000",
    time: "15 menit",
};

export default function WorkerDashboard() {
    const [isOnline, setIsOnline] = useState(false);
    const [showJobRequest, setShowJobRequest] = useState(false);
    const { toast } = useToast();

    const toggleOnline = () => {
        setIsOnline(!isOnline);
        if (!isOnline) {
            toast({ title: "Online", description: "Menunggu pekerjaan..." });
            setTimeout(() => setShowJobRequest(true), 2500);
        } else {
            toast({ title: "Offline", variant: "destructive" });
            setShowJobRequest(false);
        }
    };

    const handleJobResponse = (accepted) => {
        setShowJobRequest(false);
        if (accepted) {
            toast({ title: "Pekerjaan Diterima", description: "Mengalihkan ke pelacakan..." });
        } else {
            toast({ title: "Ditolak", description: "Mencari pekerjaan lain...", variant: "destructive" });
        }
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Dashboard Pekerja — Kerjain</title>
            </Helmet>

            <div className="mx-auto max-w-lg space-y-8 px-4 pb-16 pt-6">
                {/* Status Online */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-lg flex flex-col items-center sm:flex-row sm:justify-between gap-4"
                >
                    <div className="text-center sm:text-left">
                        <h1 className="text-xl font-semibold text-white">Halo, Pekerja</h1>
                        <p className="text-sm text-white/60 mt-1">
                            {isOnline ? "Sedang online & siap menerima pekerjaan" : "Anda sedang offline"}
                        </p>
                    </div>
                    <Button
                        size="lg"
                        onClick={toggleOnline}
                        className={`w-full sm:w-auto font-semibold transition-colors ${isOnline
                                ? "bg-rose-500 hover:bg-rose-600"
                                : "bg-emerald-500 hover:bg-emerald-600"
                            }`}
                    >
                        <Power className="mr-2 h-5 w-5" />
                        {isOnline ? "Offline" : "Online"}
                    </Button>
                </motion.div>

                {/* Job Requests */}
                <div className="relative min-h-[280px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {showJobRequest && isOnline ? (
                            <motion.div
                                key="job"
                                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                                className="w-full max-w-md"
                            >
                                <Card className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl">
                                    <CardHeader className="text-center pb-2">
                                        <CardTitle className="text-lg font-semibold text-white">
                                            Pekerjaan Baru
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <h3 className="text-center text-base font-medium text-white">
                                            {IncomingJob.title}
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="rounded-xl bg-white/5 p-3">
                                                <p className="text-xs text-white/60">Klien</p>
                                                <p className="font-medium text-white">{IncomingJob.client}</p>
                                            </div>
                                            <div className="rounded-xl bg-white/5 p-3">
                                                <p className="text-xs text-white/60">Bayaran</p>
                                                <p className="font-semibold text-emerald-400">{IncomingJob.fee}</p>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-xl bg-white/5 p-3">
                                                <MapPin className="h-4 w-4 text-purple-300" />
                                                <span className="text-white text-sm">{IncomingJob.distance}</span>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-xl bg-white/5 p-3">
                                                <Clock className="h-4 w-4 text-purple-300" />
                                                <span className="text-white text-sm">{IncomingJob.time}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 pt-2">
                                            <Button
                                                onClick={() => handleJobResponse(false)}
                                                variant="destructive"
                                                className="w-full"
                                            >
                                                <X className="mr-2 h-4 w-4" /> Tolak
                                            </Button>
                                            <Button
                                                onClick={() => handleJobResponse(true)}
                                                className="w-full bg-emerald-500 hover:bg-emerald-600"
                                            >
                                                <Check className="mr-2 h-4 w-4" /> Terima
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center space-y-2"
                            >
                                <h2 className="text-lg font-semibold text-white">
                                    {isOnline ? "Mencari pekerjaan..." : "Anda Offline"}
                                </h2>
                                <p className="text-sm text-white/60">
                                    {isOnline
                                        ? "Kami akan memberi tahu jika ada pekerjaan"
                                        : "Aktifkan online untuk mulai bekerja"}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </AnimatedPage>
    );
}
