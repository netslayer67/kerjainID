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
                {/* Grid Background */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to_right, hsl(var(--border)/.08) 0 1px, transparent 1px 56px), repeating-linear-gradient(to_bottom, hsl(var(--border)/.08) 0 1px, transparent 1px 56px)",
                    }}
                />
                {/* Gradient blobs */}
                <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
                <div className="absolute -top-16 left-10 h-72 w-72 animate-pulse rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-secondary/20 blur-3xl" />

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
                            className="rounded-full bg-background/30 backdrop-blur-md hover:bg-background/40"
                        >
                            <ArrowLeft className="h-5 w-5 text-foreground" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-semibold text-foreground">
                        Laporkan Masalah
                    </h1>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="rounded-3xl border border-border/40 bg-background/40 shadow-xl backdrop-blur-2xl">
                        <CardContent className="p-6 space-y-6">
                            {/* Warning Banner */}
                            <div className="flex items-start gap-4 rounded-xl border border-destructive/40 bg-destructive/10 p-4">
                                <AlertTriangle className="h-6 w-6 text-destructive mt-1" />
                                <div>
                                    <h3 className="font-semibold text-destructive">
                                        Penting
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Jelaskan masalah Anda sedetail mungkin & lampirkan bukti.
                                    </p>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <Label className="text-muted-foreground">ID Pekerjaan</Label>
                                    <p className="mt-1 rounded-md bg-background/40 px-2 py-1 font-mono text-sm text-foreground/80">
                                        JOB-123-XYZ
                                    </p>
                                </div>

                                <div>
                                    <Label className="text-muted-foreground">Detail Masalah</Label>
                                    <textarea
                                        rows="5"
                                        required
                                        className="mt-1 w-full rounded-2xl border border-border/40 bg-background/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 backdrop-blur-sm"
                                        placeholder="Contoh: Pekerja tidak menyelesaikan tugas..."
                                    ></textarea>
                                </div>

                                <div>
                                    <Label className="text-muted-foreground">Lampiran Bukti</Label>
                                    <Input
                                        type="file"
                                        className="mt-1 rounded-2xl border-border/40 bg-background/40 text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary/20 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-foreground hover:file:bg-primary/30"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full rounded-2xl bg-primary font-semibold text-primary-foreground shadow hover:bg-primary/90 group"
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
