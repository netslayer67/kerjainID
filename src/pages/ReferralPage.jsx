// ReferralPage.jsx
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
            title: "Kode Disalin ✅",
            description: "Bagikan kode referral Anda sekarang ✨",
        });
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#6366f1", "#a855f7", "#facc15", "#ffffff"],
        });
        toast({
            title: "Siap Dibagikan 🎉",
            description: "Kode referral berhasil dibagikan.",
        });
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Undang Teman — Kerjain</title>
                <meta
                    name="description"
                    content="Undang teman ke Kerjain dan dapatkan bonus setiap kali mereka bergabung dan menyelesaikan pekerjaan."
                />
            </Helmet>

            <div className="relative min-h-dvh w-full px-4 py-6 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8 flex items-center gap-3"
                >
                    <Link to={-1}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-background/30 backdrop-blur-md hover:bg-accent/20 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 text-foreground" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-semibold text-foreground">
                        Undang Teman
                    </h1>
                </motion.div>

                {/* Bonus Card */}
                <Card className="mb-8 rounded-3xl border border-border/40 bg-background/40 backdrop-blur-2xl shadow-xl">
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
                            <Gift className="mx-auto h-20 w-20 text-primary drop-shadow-lg" />
                        </motion.div>
                        <h2 className="text-xl font-bold text-foreground">
                            Bonus Rp 25.000 🎁
                        </h2>
                        <p className="mx-auto max-w-md text-sm text-muted-foreground">
                            Ajak teman bergabung dan nikmati saldo bonus ketika mereka
                            menyelesaikan pekerjaan pertamanya.
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
                    <p className="font-medium text-muted-foreground">
                        Kode Referral Anda
                    </p>
                    <div className="relative mx-auto max-w-sm">
                        <Input
                            readOnly
                            value={referralCode}
                            className="rounded-2xl border border-border/40 bg-background/40 text-center font-mono text-base tracking-widest text-foreground backdrop-blur-sm"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-secondary/30 hover:bg-secondary/50 transition-colors"
                            onClick={copyCode}
                        >
                            <Copy className="h-5 w-5 text-foreground" />
                        </Button>
                    </div>

                    <Button
                        onClick={triggerConfetti}
                        className="mt-4 w-full rounded-2xl bg-primary px-6 font-semibold text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg transition-all duration-300"
                    >
                        <Share2 className="mr-2 h-5 w-5" /> Bagikan Sekarang
                    </Button>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default ReferralPage;
