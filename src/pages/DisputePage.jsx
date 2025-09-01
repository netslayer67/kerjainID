import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AnimatedPage from "@/components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet";

const DisputePage = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "Laporan Terkirim",
            description: "Tim kami akan meninjau laporan Anda dalam 1x24 jam.",
        });
        setTimeout(() => navigate(-1), 2000);
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Ajukan Sengketa — Kerjain</title>
                <meta
                    name="description"
                    content="Laporkan masalah atau ajukan sengketa terkait pekerjaan di Kerjain."
                />
            </Helmet>

            <div className="relative min-h-dvh w-full px-4 py-6">
                {/* Background grid + blur blobs */}
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
                    <h1 className="text-lg font-semibold text-white">Laporkan Masalah</h1>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-2xl">
                        <CardContent className="p-6 space-y-6">
                            {/* Warning */}
                            <div className="flex items-start gap-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
                                <AlertTriangle className="h-6 w-6 text-yellow-400 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-yellow-300">Penting</h3>
                                    <p className="text-sm text-yellow-400/80">
                                        Jelaskan masalah Anda sedetail mungkin & lampirkan bukti.
                                    </p>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <Label className="text-white/70">ID Pekerjaan</Label>
                                    <p className="mt-1 rounded-md bg-white/10 px-2 py-1 font-mono text-sm text-white/80">
                                        JOB-123-XYZ
                                    </p>
                                </div>

                                <div>
                                    <Label className="text-white/70">Detail Masalah</Label>
                                    <textarea
                                        rows="5"
                                        required
                                        className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 backdrop-blur-sm"
                                        placeholder="Contoh: Pekerja tidak menyelesaikan tugas..."
                                    ></textarea>
                                </div>

                                <div>
                                    <Label className="text-white/70">Lampiran Bukti</Label>
                                    <Input
                                        type="file"
                                        className="mt-1 rounded-2xl border-white/20 bg-white/5 text-white file:mr-4 file:rounded-md file:border-0 file:bg-white/20 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-white hover:file:bg-white/30"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full rounded-2xl bg-white font-semibold text-gray-900 shadow hover:bg-gray-100 group"
                                >
                                    Kirim Laporan
                                    <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default DisputePage;
