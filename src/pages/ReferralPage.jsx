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

            <div className="relative min-h-dvh w-full px-4 py-6 md:px-6">


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
                            className="rounded-full bg-background/30 backdrop-blur-md hover:bg-background/50"
                        >
                            <ArrowLeft className="h-5 w-5 text-foreground" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-semibold text-foreground">
                        Undang Teman
                    </h1>
                </motion.div>

                {/* Gift / Bonus Card */}
                <Card className="mb-6 rounded-3xl border border-border/40 bg-background/40 backdrop-blur-2xl shadow-xl">
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
                            <Gift className="mx-auto h-20 w-20 text-primary" />
                        </motion.div>
                        <h2 className="text-xl font-bold text-foreground">
                            Bonus Rp 25.000 🎉
                        </h2>
                        <p className="mx-auto max-w-md text-sm text-muted-foreground">
                            Ajak teman bergabung dan dapatkan saldo saat mereka menyelesaikan
                            pekerjaan pertamanya.
                        </p>
                    </CardContent>
                </Card>

                {/* Referral Code Section */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4 text-center"
                >
                    <p className="font-medium text-muted-foreground">Kode Referral Anda</p>
                    <div className="relative mx-auto max-w-sm">
                        <Input
                            readOnly
                            value={referralCode}
                            className="rounded-2xl border border-border/40 bg-background/30 text-center font-mono text-base tracking-widest text-foreground backdrop-blur-sm"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/40 hover:bg-background/60"
                            onClick={copyCode}
                        >
                            <Copy className="h-5 w-5 text-foreground" />
                        </Button>
                    </div>
                    <Button
                        onClick={triggerConfetti}
                        className="mt-2 w-full rounded-2xl bg-foreground text-background font-semibold shadow hover:bg-foreground/90"
                    >
                        <Share2 className="mr-2 h-5 w-5" /> Bagikan Sekarang
                    </Button>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default ReferralPage;
