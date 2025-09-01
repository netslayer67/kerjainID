import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Gift, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";
import confetti from "canvas-confetti";

const ReferralPage = () => {
    const { toast } = useToast();
    const referralCode = "KERJAIN-AJA-123";

    const copyCode = () => {
        navigator.clipboard.writeText(referralCode);
        toast({
            title: "Kode Disalin",
            description: "Bagikan kode referral Anda ke teman ✨",
        });
    };

    const triggerConfetti = () => {
        // Basic confetti burst
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#6366f1", "#a855f7", "#facc15", "#ffffff"],
        });
        toast({
            title: "Bagikan Berhasil 🎉",
            description: "Kode referral siap dibagikan ke teman Anda.",
        });
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Undang Teman — Kerjain</title>
                <meta
                    name="description"
                    content="Undang teman Anda ke Kerjain dan dapatkan bonus untuk setiap teman yang bergabung."
                />
            </Helmet>

            <div className="relative min-h-dvh w-full px-4 py-6">
                {/* Background grid + gradient blobs */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to_right, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px), repeating-linear-gradient(to_bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px)",
                    }}
                />
                <div className="absolute -top-16 left-10 h-72 w-72 animate-pulse rounded-full bg-purple-500/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-indigo-500/20 blur-3xl" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6 flex items-center gap-3"
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
                    <h1 className="text-lg font-semibold text-white">Undang Teman</h1>
                </motion.div>

                {/* Gift Card */}
                <Card className="mb-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl">
                    <CardContent className="space-y-4 p-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2,
                            }}
                        >
                            <Gift className="mx-auto h-20 w-20 text-purple-300" />
                        </motion.div>
                        <h2 className="text-xl font-bold text-white">
                            Bonus Rp 25.000 🎉
                        </h2>
                        <p className="mx-auto max-w-md text-sm text-white/70">
                            Ajak teman bergabung. Anda dapat saldo saat mereka menyelesaikan
                            pekerjaan pertamanya.
                        </p>
                    </CardContent>
                </Card>

                {/* Referral Code */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4 text-center"
                >
                    <p className="font-medium text-white/80">Kode Referral Anda</p>
                    <div className="relative mx-auto max-w-sm">
                        <Input
                            readOnly
                            value={referralCode}
                            className="rounded-2xl border-white/20 bg-white/10 text-center font-mono text-base tracking-widest text-white backdrop-blur-md"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20"
                            onClick={copyCode}
                        >
                            <Copy className="h-5 w-5 text-white" />
                        </Button>
                    </div>
                    <Button
                        onClick={triggerConfetti}
                        className="mt-2 w-full rounded-2xl bg-white font-semibold text-gray-900 hover:bg-gray-100"
                    >
                        <Share2 className="mr-2 h-5 w-5" /> Bagikan Sekarang
                    </Button>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default ReferralPage;
