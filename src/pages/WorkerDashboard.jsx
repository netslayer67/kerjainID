// WorkerDashboard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedPage from "@/components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";
import JobCard from "@/components/JobCard";

/**
 * WorkerDashboard (refactored)
 *
 * - Manages online/offline state and when the job card should appear
 * - Delegates job UI + negotiation logic to JobCard component
 */

const motionVariants = {
    cardHidden: { opacity: 0, y: 12, scale: 0.995 },
    cardShow: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const DUMMY_JOB = {
    id: 1,
    title: "Antar Dokumen",
    description: "Ambil dokumen dari kantor pusat dan antarkan ke klien di SCBD. Pastikan dokumen aman dan diserahkan langsung ke penerima. Jangan lupa konfirmasi penerimaan setelah selesai.",
    client: "Andi W.",
    distance: "1.2 km",
    fee: 25000,
    feeLabel: "Rp 25.000",
    time: "15 menit",
};

export default function WorkerDashboard() {
    const [isOnline, setIsOnline] = useState(false);
    const [showJobRequest, setShowJobRequest] = useState(false);

    const { toast } = useToast();

    const toggleOnline = () => {
        setIsOnline((s) => !s);
        if (!isOnline) {
            toast({ title: "Anda Online", description: "Menunggu permintaan kerja..." });
            setTimeout(() => setShowJobRequest(true), 1100);
        } else {
            toast({ title: "Anda Offline", variant: "destructive" });
            setShowJobRequest(false);
        }
    };

    // called when JobCard's negotiation completes with an accepted amount
    const handleJobAcceptedViaNegotiation = (amount) => {
        // parent can react: show a toast and ensure job card remains visible / or any other flow
        toast({ title: "Deal diterima (dashboard)", description: `Disepakati ${formatCurrency(amount)}` });
        // keep showJobRequest true to show job view; you may change this per desired flow
        setShowJobRequest(true);
    };

    const handlePrimaryAccept = () => {
        // Parent-level behavior when the user taps the main "Terima" button
        // (JobCard also shows toast/update UI itself)
        // Example: start tracking / call API / navigate to tracking screen
        console.log("User accepted job (primary button)");
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Dashboard Pekerja — Kerjain</title>
            </Helmet>

            <div className="relative min-h-screen px-4 py-6 ">
                <div className="mx-auto max-w-3xl space-y-6">
                    {/* HEADER */}
                    <motion.div
                        initial="cardHidden"
                        animate="cardShow"
                        variants={motionVariants}
                        className="rounded-2xl border border-border bg-card/60 backdrop-blur-xl p-4 shadow-lg flex items-center justify-between gap-3"
                    >
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl p-3 bg-background/30 border border-border">
                                <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-accent" : "bg-muted"}`} />
                            </div>
                            <div className="text-sm leading-tight">
                                <div className="font-semibold text-foreground">Halo, Pekerja</div>
                                <div className="text-xs text-muted-foreground">{isOnline ? "Sedang online" : "Offline"}</div>
                            </div>
                        </div>
                        <Button
                            size="md"
                            onClick={toggleOnline}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-transform ${isOnline ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}
                        >
                            <Power className="h-4 w-4" />
                            <span className="text-sm">{isOnline ? "Offline" : "Online"}</span>
                        </Button>
                    </motion.div>

                    {/* JOB AREA — delegated to JobCard */}
                    <div className="relative">
                        <JobCard
                            job={DUMMY_JOB}
                            visible={showJobRequest && isOnline}
                            onClose={() => setShowJobRequest(false)}
                            onAcceptClick={handlePrimaryAccept}
                            onAccepted={handleJobAcceptedViaNegotiation}
                        />
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}

function formatCurrency(num) {
    if (!num && num !== 0) return "";
    return "Rp " + Number(num).toLocaleString("id-ID");
}
