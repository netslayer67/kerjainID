import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, ShieldCheck, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedPage from '@/components/AnimatedPage';
import { Helmet } from 'react-helmet';

const badges = [
    { icon: Star, name: 'Pekerja Baru', desc: 'Selesaikan 1 pekerjaan', earned: true },
    { icon: TrendingUp, name: 'Rajin Bekerja', desc: 'Selesaikan 10 pekerjaan', earned: true },
    { icon: Award, name: 'Ahli', desc: 'Selesaikan 50 pekerjaan', earned: false },
    { icon: ShieldCheck, name: 'Terpercaya', desc: 'Rating 4.8+ setelah 20 pekerjaan', earned: false },
];

const GamificationPage = () => {
    const userLevel = 5;
    const userXP = 350;
    const xpToNextLevel = 500;
    const progress = (userXP / xpToNextLevel) * 100;

    return (
        <AnimatedPage>
            <Helmet>
                <title>Level & Lencana - Kerjain</title>
                <meta name="description" content="Lihat progres, level, dan lencana yang telah Anda dapatkan sebagai pekerja di Kerjain." />
            </Helmet>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link to={-1}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Level & Lencana</h1>
                </div>

                <Card className="glassmorphic-card">
                    <CardContent className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">Level {userLevel}</h2>
                            <p className="text-sm text-white/70">{userXP} / {xpToNextLevel} XP</p>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-4">
                            <motion.div
                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                        <p className="text-sm text-center text-white/70">Selesaikan lebih banyak pekerjaan untuk naik level!</p>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Lencana Saya</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {badges.map((badge, index) => (
                            <motion.div
                                key={badge.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Card className={`text-center p-4 transition-all ${badge.earned ? 'bg-white/10 border-purple-400/50' : 'bg-black/20 border-white/10'}`}>
                                    <badge.icon className={`w-12 h-12 mx-auto mb-2 ${badge.earned ? 'text-yellow-400' : 'text-white/30'}`} />
                                    <p className={`font-semibold ${badge.earned ? 'text-white' : 'text-white/50'}`}>{badge.name}</p>
                                    <p className="text-xs text-white/60">{badge.desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default GamificationPage;