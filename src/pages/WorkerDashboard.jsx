// WorkerDashboard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedPage from "@/components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";
import JobCard from "@/components/JobCard";

// Dummy jobs
const DUMMY_JOBS = [
    {
        id: 1,
        title: "Antar Dokumen",
        type: "onsite",
        description:
            "Ambil dokumen dari kantor pusat dan antarkan ke klien di SCBD. Pastikan dokumen aman dan diserahkan langsung ke penerima. Jangan lupa konfirmasi penerimaan setelah selesai.",
        client: "Andi W.",
        distance: "1.2 km",
        fee: 25000,
        feeLabel: "Rp 25.000",
        time: "15 menit",
        attachments: ["surat_pengantar.pdf"],
    },
    {
        id: 2,
        title: "Desain Banner Produk",
        type: "remote",
        description:
            "Buat desain banner promosi untuk produk skincare. Kirim file final dalam format PSD dan PNG sebelum deadline.",
        client: "PT GlowUp",
        fee: 500000,
        feeLabel: "Rp 500.000",
        time: "2 hari",
        attachments: ["brief.docx", "logo.png"],
    },
];

export default function WorkerDashboard() {
    const [isOnline, setIsOnline] = useState(false);
    const [showJobRequest, setShowJobRequest] = useState(false);
    const { toast } = useToast();

    const toggleOnline = () => {
        setIsOnline((s) => !s);
        if (!isOnline) {
            toast({
                title: "Anda Online",
                description: "Menunggu permintaan kerja...",
            });
            setTimeout(() => setShowJobRequest(true), 1000);
        } else {
            toast({ title: "Anda Offline", variant: "destructive" });
            setShowJobRequest(false);
        }
    };

    const handleJobAcceptedViaNegotiation = (amount) => {
        toast({
            title: "Deal diterima",
            description: `Disepakati ${formatCurrency(amount)}`,
        });
        setShowJobRequest(true);
    };

    const handlePrimaryAccept = () => {
        console.log("User accepted job (primary button)");
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Dashboard Pekerja — Kerjain</title>
            </Helmet>

            {/* Background blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    className="absolute -top-32 -left-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl"
                    animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 -right-32 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
                    animate={{ y: [0, -30, 0], scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                />
            </div>

            <div className="relative min-h-screen px-4 py-6 flex flex-col">
                {/* HEADER CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl shadow-xl p-4 flex items-center justify-between gap-3"
                >
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl p-3 bg-background/30 border border-border">
                            <div
                                className={`w-3 h-3 rounded-full ${isOnline ? "bg-accent" : "bg-muted"
                                    }`}
                            />
                        </div>
                        <div className="text-sm leading-tight">
                            <div className="font-semibold text-foreground">Halo, Pekerja</div>
                            <div className="text-xs text-muted-foreground">
                                {isOnline ? "Sedang online" : "Offline"}
                            </div>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        onClick={toggleOnline}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-colors ${isOnline
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-primary text-primary-foreground"
                            }`}
                    >
                        <Power className="h-4 w-4" />
                        <span className="text-sm">{isOnline ? "Offline" : "Online"}</span>
                    </Button>
                </motion.div>

                {/* JOB CARD AREA */}
                <div className="flex-1 flex items-center justify-center mt-6">
                    <JobCard
                        job={DUMMY_JOBS}
                        visible={showJobRequest && isOnline}
                        onClose={() => setShowJobRequest(false)}
                        onAcceptClick={handlePrimaryAccept}
                        onAccepted={handleJobAcceptedViaNegotiation}
                    />
                </div>
            </div>
        </AnimatedPage>
    );
}

function formatCurrency(num) {
    if (!num && num !== 0) return "";
    return "Rp " + Number(num).toLocaleString("id-ID");
}
