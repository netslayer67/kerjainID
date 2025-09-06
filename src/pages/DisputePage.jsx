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
            title: "Laporan terkirim",
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
                            className="rounded-full bg-card/40 backdrop-blur-md ring-1 ring-border text-muted-foreground hover:text-accent-foreground hover:bg-accent/20 transition-all"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <span className="text-accent">⚑</span> Laporkan Masalah
                    </h1>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="rounded-3xl border border-border/40 bg-card/50 shadow-xl backdrop-blur-xl">
                        <CardContent className="p-6 space-y-6">
                            {/* Warning Banner */}
                            <div className="flex items-start gap-4 rounded-xl border border-destructive/40 bg-destructive/10 p-4">
                                <AlertTriangle className="h-6 w-6 text-destructive mt-1" />
                                <div>
                                    <h3 className="font-semibold text-destructive">Penting</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Mohon jelaskan masalah Anda sedetail mungkin & lampirkan bukti agar dapat kami proses dengan cepat.
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
                                        className="mt-1 w-full rounded-2xl border border-border/40 bg-background/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 backdrop-blur-sm transition"
                                        placeholder="Contoh: Pekerja tidak menyelesaikan tugas sesuai kesepakatan..."
                                    ></textarea>
                                </div>

                                <div>
                                    <Label className="text-muted-foreground">Lampiran Bukti</Label>
                                    <Input
                                        type="file"
                                        className="mt-1 rounded-2xl border-border/40 bg-background/40 text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary/20 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-foreground hover:file:bg-secondary/30 transition"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full rounded-2xl bg-primary font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-all group"
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
