// ClientDashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

const quickActions = [
    {
        title: "Posting Pekerjaan",
        icon: Plus,
        path: "/post-job",
    },
    {
        title: "Lihat Riwayat",
        icon: Clock,
        path: "/history",
    },
    {
        title: "Chat Worker",
        icon: MessageSquare,
        path: "/chat",
    },
];

const activeJobs = [
    {
        id: 1,
        title: "Bersihkan Taman Belakang",
        worker: "Budi S.",
        status: "Dalam Pengerjaan",
        progress: 60,
    },
    {
        id: 2,
        title: "Desain Logo untuk Startup",
        worker: "Citra L.",
        status: "Menunggu Review",
        progress: 100,
    },
];

const ClientDashboard = () => {
    return (
        <AnimatedPage>
            <Helmet>
                <title>Dashboard Klien - Kerjain</title>
            </Helmet>

            <div className="relative min-h-screen text-foreground px-4 py-6 md:px-8">


                {/* Welcome Card */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 glassmorphic-card rounded-2xl p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                >
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                            Halo, User 👋
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Siap beresin sesuatu hari ini?
                        </p>
                    </div>
                    <Link to="/post-job" className="w-full md:w-auto">
                        <Button
                            size="lg"
                            className="w-full md:w-auto bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            Posting Cepat
                        </Button>
                    </Link>
                </motion.div>

                {/* Quick Actions */}
                <div className="relative z-10 mt-8 space-y-4">
                    <h2 className="text-lg md:text-2xl font-bold text-foreground">
                        Aksi Cepat
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {quickActions.map((action, index) => (
                            <motion.div
                                key={action.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Link to={action.path}>
                                    <Card className="cursor-pointer rounded-2xl border border-border/40 bg-background/40 backdrop-blur-xl hover:bg-background/60 hover:scale-105 transition">
                                        <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                                            <action.icon className="h-6 w-6 text-primary" />
                                            <p className="text-xs sm:text-sm font-medium text-foreground text-center">
                                                {action.title}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Active Jobs */}
                <div className="relative z-10 mt-10 space-y-4">
                    <h2 className="text-lg md:text-2xl font-bold text-foreground">
                        Pekerjaan Aktif
                    </h2>
                    {activeJobs.length > 0 ? (
                        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                            {activeJobs.map((job, i) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                >
                                    <Link to={`/job/${job.id}/track`}>
                                        <Card className="rounded-2xl border border-border/40 bg-background/40 backdrop-blur-xl transition hover:bg-background/60 hover:scale-[1.01]">
                                            <CardContent className="space-y-4 p-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-base sm:text-lg font-semibold text-foreground">
                                                        {job.title}
                                                    </span>
                                                    <span
                                                        className={`w-fit rounded-full px-3 py-1 text-xs sm:text-sm font-medium ${job.status === "Dalam Pengerjaan"
                                                            ? "bg-primary/20 text-primary"
                                                            : "bg-accent/20 text-accent"
                                                            }`}
                                                    >
                                                        {job.status}
                                                    </span>
                                                </div>

                                                <p className="text-sm sm:text-base text-muted-foreground">
                                                    Pekerja:{" "}
                                                    <span className="font-medium text-foreground">
                                                        {job.worker}
                                                    </span>
                                                </p>

                                                <div>
                                                    <div className="mb-1 flex justify-between text-xs sm:text-sm text-muted-foreground">
                                                        <span>Progress</span>
                                                        <span>{job.progress}%</span>
                                                    </div>
                                                    <div className="h-3 w-full rounded-full bg-muted">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${job.progress}%` }}
                                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                                            className="h-3 rounded-full bg-primary"
                                                        />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="glassmorphic-card text-center rounded-2xl py-12">
                            <p className="text-muted-foreground">
                                Belum ada pekerjaan aktif. Mau bikin yang baru?
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AnimatedPage>
    );
};

export default ClientDashboard;
