import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, ShieldCheck, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

const badges = [
    { icon: Star, name: "Pekerja Baru", desc: "Selesaikan 1 pekerjaan", earned: true },
    { icon: TrendingUp, name: "Rajin Bekerja", desc: "Selesaikan 10 pekerjaan", earned: true },
    { icon: Award, name: "Ahli", desc: "Selesaikan 50 pekerjaan", earned: false },
    { icon: ShieldCheck, name: "Terpercaya", desc: "Rating 4.8+ setelah 20 pekerjaan", earned: false },
];

const GamificationPage = () => {
    const userLevel = 5;
    const userXP = 350;
    const xpToNextLevel = 500;
    const progress = (userXP / xpToNextLevel) * 100;

    return (
        <AnimatedPage>
            <Helmet>
                <title>Level & Lencana — Kerjain</title>
                <meta
                    name="description"
                    content="Lihat progres, level, dan lencana yang telah Anda dapatkan sebagai pekerja di Kerjain."
                />
            </Helmet>

            <div className="relative min-h-dvh w-full px-4 py-6 space-y-6">
                {/* Background Effects */}
                <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none opacity-20 mix-blend-soft-light"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to_right, rgba(255,255,255,0.05) 0 1px, transparent 1px 48px), repeating-linear-gradient(to_bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 48px)",
                    }}
                />
                <div className="absolute -top-16 left-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3"
                >
                    <Link to={-1}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20"
                        >
                            <ArrowLeft className="h-5 w-5 text-white" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-semibold text-white">Level & Lencana</h1>
                </motion.div>

                {/* Level Card */}
                <Card className="relative z-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
                    <CardContent className="space-y-5 p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Level {userLevel}</h2>
                            <p className="text-sm text-white/70">
                                {userXP} / {xpToNextLevel} XP
                            </p>
                        </div>
                        <div className="relative w-full h-4 rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                        <p className="text-center text-sm text-white/70">
                            Selesaikan pekerjaan untuk naik level 🚀
                        </p>
                    </CardContent>
                </Card>

                {/* Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="mb-4 text-lg font-semibold text-white">Lencana Saya</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {badges.map((badge, index) => (
                            <motion.div
                                key={badge.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Card
                                    className={`rounded-2xl border transition-all backdrop-blur-lg ${badge.earned
                                            ? "bg-white/10 border-purple-400/50 shadow-md"
                                            : "bg-black/20 border-white/10 opacity-60"
                                        }`}
                                >
                                    <CardContent className="p-5 text-center space-y-2">
                                        <badge.icon
                                            className={`mx-auto h-10 w-10 ${badge.earned ? "text-yellow-400" : "text-white/30"
                                                }`}
                                        />
                                        <p
                                            className={`font-medium ${badge.earned ? "text-white" : "text-white/50"
                                                }`}
                                        >
                                            {badge.name}
                                        </p>
                                        <p className="text-xs text-white/60">{badge.desc}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default GamificationPage;
