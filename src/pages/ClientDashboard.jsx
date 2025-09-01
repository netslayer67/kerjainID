// ClientDashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Plus,
    ShoppingCart,
    Code,
    Hammer,
    Paintbrush,
    PartyPopper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

const categories = [
    { name: "Urusan Harian", icon: ShoppingCart },
    { name: "Jasa Digital", icon: Code },
    { name: "Tenaga Manual", icon: Hammer },
    { name: "Kreatif", icon: Paintbrush },
    { name: "Bantuan Acara", icon: PartyPopper },
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

            <div className="relative min-h-screen space-y-10 px-4 py-6 md:px-8">
                {/* Grid background */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to_right, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px), repeating-linear-gradient(to_bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px)",
                    }}
                />
                {/* Gradient blobs */}
                <div className="absolute -top-24 -left-16 h-72 w-72 animate-pulse rounded-full bg-purple-600/30 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-600/20 blur-3xl" />

                {/* Welcome Card */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 glassmorphic-card flex flex-col items-center justify-between gap-4 rounded-2xl p-6 md:flex-row"
                >
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold text-white md:text-3xl">
                            Selamat Datang, User!
                        </h1>
                        <p className="text-sm text-white/70 md:text-base">
                            Siap menyelesaikan sesuatu hari ini?
                        </p>
                    </div>
                    <Link to="/post-job" className="w-full md:w-auto">
                        <Button className="group w-full bg-white text-deep-indigo font-semibold hover:bg-gray-200">
                            <Plus className="mr-2 h-5 w-5" />
                            Posting Pekerjaan
                        </Button>
                    </Link>
                </motion.div>

                {/* Categories */}
                <div className="relative z-10 space-y-4">
                    <h2 className="text-lg font-bold text-white md:text-2xl">
                        Pilih Kategori
                    </h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Card className="cursor-pointer rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-xl transition hover:bg-white/20">
                                    <CardContent className="flex flex-col items-center gap-2 p-0">
                                        <category.icon className="h-8 w-8 text-purple-300" />
                                        <p className="text-sm font-medium text-white">
                                            {category.name}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Active Jobs */}
                {/* Active Jobs */}
                <div className="relative z-10 space-y-4">
                    <h2 className="text-lg font-bold text-white md:text-2xl">
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
                                        <Card className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl transition hover:bg-white/20">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-white">
                                                    <span className="text-base font-semibold leading-snug sm:text-lg">
                                                        {job.title}
                                                    </span>
                                                    <span
                                                        className={`w-fit rounded-full px-3 py-1 text-xs sm:text-sm font-medium ${job.status === "Dalam Pengerjaan"
                                                                ? "bg-blue-500/20 text-blue-300"
                                                                : "bg-yellow-500/20 text-yellow-300"
                                                            }`}
                                                    >
                                                        {job.status}
                                                    </span>
                                                </CardTitle>
                                            </CardHeader>

                                            <CardContent className="space-y-4">
                                                <p className="text-sm text-white/70 sm:text-base">
                                                    Pekerja: <span className="font-medium">{job.worker}</span>
                                                </p>

                                                <div>
                                                    <div className="mb-1 flex justify-between text-xs sm:text-sm text-white/70">
                                                        <span>Progress</span>
                                                        <span>{job.progress}%</span>
                                                    </div>
                                                    <div className="h-3 w-full rounded-full bg-white/10">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${job.progress}%` }}
                                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                                            className="h-3 rounded-full bg-purple-500"
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
                            <p className="text-white/70">
                                Anda tidak memiliki pekerjaan aktif saat ini.
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </AnimatedPage>
    );
};

export default ClientDashboard;
