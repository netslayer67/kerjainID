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
            toast({ title: "Verifikasi Berhasil", description: "Melanjutkan..." });
            if (step < 2) setStep(step + 1);
            else navigate("/select-role");
        }, 1200);
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Verifikasi Akun — Kerjain</title>
            </Helmet>

            <div className="relative flex min-h-screen items-center justify-center  px-4">
                {/* Grid overlay */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to_right, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px), repeating-linear-gradient(to_bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px)",
                    }}
                />
                {/* Blobs */}
                <div className="absolute -top-20 -left-20 h-72 w-72 animate-pulse rounded-full bg-purple-600/30 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-600/20 blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-md"
                >
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
                        {/* Title */}
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-bold text-white">
                                Verifikasi Akun
                            </h1>
                            <p className="mt-1 text-sm text-white/60">
                                Demi keamanan akun Anda
                            </p>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-6 flex items-center gap-3">
                            <div
                                className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-purple-500" : "bg-white/20"
                                    }`}
                            />
                            <div
                                className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-purple-500" : "bg-white/20"
                                    }`}
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="ktp"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-4 text-center"
                                >
                                    <h2 className="text-lg font-semibold text-white">
                                        Verifikasi KTP
                                    </h2>
                                    <p className="text-sm text-white/60">
                                        Unggah foto KTP untuk validasi data.
                                    </p>

                                    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/30 p-12">
                                        <Upload className="h-12 w-12 text-white/50" />
                                        <span className="text-xs text-white/50">
                                            Klik untuk unggah
                                        </span>
                                    </div>

                                    <Button
                                        onClick={() => handleAction("Unggah KTP")}
                                        className="w-full rounded-xl bg-white py-3 font-semibold text-gray-900 hover:bg-gray-200"
                                    >
                                        Lanjut <ArrowRight className="ml-2 h-5 w-5" />
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
                                    className="space-y-4 text-center"
                                >
                                    <h2 className="text-lg font-semibold text-white">
                                        Pindai Wajah
                                    </h2>
                                    <p className="text-sm text-white/60">
                                        Posisi wajah dalam bingkai.
                                    </p>

                                    <div className="flex aspect-square items-center justify-center rounded-xl bg-black/30">
                                        <Camera className="h-16 w-16 text-white/30" />
                                    </div>

                                    <Button
                                        onClick={() => handleAction("Pindai Wajah")}
                                        className="w-full rounded-xl bg-white py-3 font-semibold text-gray-900 hover:bg-gray-200"
                                    >
                                        Selesai <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <p className="mt-8 text-center text-xs text-white/60">
                            Sudah punya akun?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-purple-300 hover:underline"
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
