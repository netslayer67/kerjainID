// VerificationPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Upload, Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedPage from "@/components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet";

export default function VerificationPage() {
    const [step, setStep] = useState(1);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleAction = (actionType) => {
        toast({
            title: `🚧 ${actionType} belum tersedia`,
            description: "Segera hadir.",
        });
        setTimeout(() => {
            toast({ title: "✅ Verifikasi Berhasil", description: "Melanjutkan..." });
            if (step < 2) setStep(step + 1);
            else navigate("/select-role");
        }, 1200);
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Verifikasi Akun — Kerjain</title>
            </Helmet>

            <div className="relative flex min-h-screen items-center justify-center px-4 py-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-md"
                >
                    <div className="rounded-2xl border border-border bg-card/70 p-8 shadow-2xl backdrop-blur-xl">
                        {/* Header */}
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                Verifikasi Akun
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Demi keamanan akun Anda
                            </p>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-8 flex items-center gap-2">
                            <div
                                className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-muted"
                                    }`}
                            />
                            <div
                                className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-muted"
                                    }`}
                            />
                        </div>

                        {/* Steps */}
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="ktp"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6 text-center"
                                >
                                    <h2 className="text-lg font-semibold text-foreground">
                                        Verifikasi KTP
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Unggah foto KTP Anda untuk validasi data.
                                    </p>

                                    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border/60 p-12 bg-muted/20 hover:border-accent hover:bg-accent/10 transition-colors cursor-pointer">
                                        <Upload className="h-12 w-12 text-muted-foreground group-hover:text-accent" />
                                        <span className="text-xs text-muted-foreground">
                                            Klik untuk unggah
                                        </span>
                                    </div>

                                    <Button
                                        onClick={() => handleAction("Unggah KTP")}
                                        className="w-full rounded-xl bg-primary hover:bg-accent hover:text-accent-foreground transition-colors"
                                    >
                                        Lanjut
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="face"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-6 text-center"
                                >
                                    <h2 className="text-lg font-semibold text-foreground">
                                        Pindai Wajah
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Posisikan wajah Anda dalam bingkai kamera.
                                    </p>

                                    <div className="flex aspect-square items-center justify-center rounded-xl bg-muted/30 border border-border/40 hover:border-accent hover:bg-accent/10 transition-colors">
                                        <Camera className="h-16 w-16 text-muted-foreground/60" />
                                    </div>

                                    <Button
                                        onClick={() => handleAction("Pindai Wajah")}
                                        className="w-full rounded-xl bg-primary hover:bg-accent hover:text-accent-foreground transition-colors"
                                    >
                                        Selesai
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Footer */}
                        <p className="mt-10 text-center text-xs text-muted-foreground">
                            Sudah punya akun?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-primary hover:text-accent transition-colors"
                            >
                                Masuk
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
}
