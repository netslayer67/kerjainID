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
                            className="rounded-full bg-card/50 backdrop-blur-md hover:bg-card/70"
                        >
                            <ArrowLeft className="h-5 w-5 text-foreground" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-semibold text-foreground">Level & Lencana</h1>
                </motion.div>

                {/* Level Card */}
                <Card className="relative z-10 rounded-3xl border border-border bg-card/50 backdrop-blur-xl shadow-lg">
                    <CardContent className="space-y-5 p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-foreground">Level {userLevel}</h2>
                            <p className="text-sm text-muted-foreground">
                                {userXP} / {xpToNextLevel} XP
                            </p>
                        </div>
                        <div className="relative w-full h-4 rounded-full bg-muted overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-4 rounded-full bg-gradient-to-r from-primary to-accent"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                        <p className="text-center text-sm text-muted-foreground">
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
                    <h2 className="mb-4 text-lg font-semibold text-foreground">Lencana Saya</h2>
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
                                        ? "bg-card/60 border-primary/40 shadow-md"
                                        : "bg-muted/40 border-border opacity-60"
                                        }`}
                                >
                                    <CardContent className="p-5 text-center space-y-2">
                                        <badge.icon
                                            className={`mx-auto h-10 w-10 ${badge.earned ? "text-yellow-400" : "text-muted-foreground"
                                                }`}
                                        />
                                        <p
                                            className={`font-medium ${badge.earned ? "text-foreground" : "text-muted-foreground"
                                                }`}
                                        >
                                            {badge.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{badge.desc}</p>
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
