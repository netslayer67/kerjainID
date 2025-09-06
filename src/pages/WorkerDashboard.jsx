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
            "Ambil dokumen dari kantor pusat dan antarkan ke klien di SCBD. Pastikan dokumen aman dan serahkan langsung ke penerima.",
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
            "Buat desain banner promosi skincare. Kirim file final PSD + PNG sebelum deadline.",
        client: "PT GlowUp",
        fee: 500000,
        feeLabel: "Rp 500.000",
        time: "2 hari",
        attachments: ["brief.docx", "logo.png"],
    },
];

export default function WorkerDashboard() {
    const [isOnline, setIsOnline] = useState(false);
    const [jobs, setJobs] = useState([]); // state jobs aktif
    const { toast } = useToast();

    const toggleOnline = () => {
        setIsOnline((s) => !s);

        if (!isOnline) {
            toast({ title: "Anda Online", description: "Menunggu permintaan kerja..." });
            // simulate fetch job
            setTimeout(() => setJobs(DUMMY_JOBS), 800);
        } else {
            toast({ title: "Anda Offline", variant: "destructive" });
            setJobs([]);
        }
    };

    const handlePrimaryAccept = (id) => {
        console.log("User accepted job id:", id);
        handleRemoveJob(id);
    };

    const handleJobAcceptedViaNegotiation = (id, amount) => {
        toast({
            title: "Deal Diterima",
            description: `Disepakati ${formatCurrency(amount)}`,
        });
        handleRemoveJob(id);
    };

    const handleRemoveJob = (id) => {
        setJobs((prev) => prev.filter((j) => j.id !== id));
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Dashboard Pekerja — Kerjain</title>
            </Helmet>

            {/* Background Accent Blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    className="absolute -top-32 -left-24 w-72 h-72 rounded-full bg-primary/25 blur-3xl"
                    animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 -right-32 w-80 h-80 rounded-full bg-accent/25 blur-3xl"
                    animate={{ y: [0, -30, 0], scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                />
            </div>

            <div className="relative min-h-screen px-4 py-6 flex flex-col max-w-md mx-auto">
                {/* HEADER CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl border border-border bg-card/60 backdrop-blur-xl shadow-lg p-4 flex items-center justify-between"
                >
                    {/* Status Indicator */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div
                                className={`w-4 h-4 rounded-full border border-background/40 shadow-inner ${isOnline ? "bg-accent" : "bg-muted"
                                    }`}
                            />
                        </div>
                        <div className="text-sm leading-tight">
                            <p className="font-semibold text-foreground">Halo, Pekerja</p>
                            <p className="text-xs text-muted-foreground">
                                {isOnline ? "Sedang Online" : "Offline"}
                            </p>
                        </div>
                    </div>

                    {/* Online Toggle Button */}
                    <Button
                        size="sm"
                        onClick={toggleOnline}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-colors duration-300
              ${isOnline
                                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                : "bg-primary text-primary-foreground hover:bg-primary/90"
                            }`}
                    >
                        <Power className="h-4 w-4" />
                        <span>{isOnline ? "Offline" : "Online"}</span>
                    </Button>
                </motion.div>

                {/* JOB CARDS */}
                {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        role="worker"
                        job={job}
                        visible={true}
                        onClose={() => handleRemoveJob(job.id)} // remove per-card
                        onAcceptClick={() => handlePrimaryAccept(job.id)}
                        onAccepted={(amount) => handleJobAcceptedViaNegotiation(job.id, amount)}
                    />
                ))}
            </div>
        </AnimatedPage>
    );
}

function formatCurrency(num) {
    if (!num && num !== 0) return "";
    return "Rp " + Number(num).toLocaleString("id-ID");
}
