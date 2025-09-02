import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Phone, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

const JobTrackingPage = () => {
    const steps = [
        { name: "Diterima", completed: true },
        { name: "Dalam Proses", completed: true },
        { name: "Selesai", completed: false },
    ];

    return (
        <AnimatedPage>
            <Helmet>
                <title>Lacak Pekerjaan — Kerjain</title>
            </Helmet>

            <div className="relative min-h-dvh w-full px-4 py-6 md:px-8">
                {/* Grid pattern */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-10"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 56px), repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 56px)",
                    }}
                />
                {/* Gradient blobs */}
                <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-pulse" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6 flex items-center gap-3"
                >
                    <Link to="/client/dashboard">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-background/10 backdrop-blur-md hover:bg-background/20"
                        >
                            <ArrowLeft className="h-5 w-5 text-foreground" />
                        </Button>
                    </Link>
                    <h1 className="text-lg md:text-xl font-semibold text-foreground tracking-tight">
                        Lacak Pekerjaan
                    </h1>
                </motion.div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Section */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Card className="rounded-3xl border border-border/20 bg-background/10 backdrop-blur-xl shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-foreground">Lokasi Pekerja</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="aspect-video flex items-center justify-center rounded-xl bg-muted/20 text-sm text-muted-foreground">
                                        Peta ditampilkan di sini
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Steps */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="rounded-3xl border border-border/20 bg-background/10 backdrop-blur-xl shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-foreground">Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between">
                                        {steps.map((step, i) => (
                                            <div key={step.name} className="relative flex flex-1 flex-col items-center">
                                                <motion.div
                                                    initial={{ scale: 0.8 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.3, delay: i * 0.15 }}
                                                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${step.completed
                                                        ? "bg-primary border-primary text-primary-foreground"
                                                        : "border-border/40"
                                                        }`}
                                                >
                                                    {step.completed && <Check className="h-4 w-4" />}
                                                </motion.div>
                                                <p
                                                    className={`mt-2 text-xs md:text-sm ${step.completed ? "text-foreground font-medium" : "text-muted-foreground"
                                                        }`}
                                                >
                                                    {step.name}
                                                </p>
                                                {i < steps.length - 1 && (
                                                    <div
                                                        className={`absolute top-4 left-1/2 w-full h-0.5 ${steps[i + 1].completed ? "bg-primary" : "bg-border/40"
                                                            }`}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Worker Info */}
                        <Card className="rounded-3xl border border-border/20 bg-background/10 backdrop-blur-xl shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-foreground">Pekerja</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground shadow-md">
                                        B
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-foreground">Budi Santoso</p>
                                        <div className="flex items-center gap-1 text-sm text-yellow-400">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span>4.9 (120)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link to="/chat" className="w-full">
                                        <Button
                                            className="w-full rounded-xl border border-border/30 bg-background/10 text-foreground hover:bg-background/20"
                                        >
                                            <MessageSquare className="mr-2 h-4 w-4" /> Chat
                                        </Button>
                                    </Link>
                                    <Button
                                        className="w-full rounded-xl border border-border/30 bg-background/10 text-foreground hover:bg-background/20"
                                    >
                                        <Phone className="mr-2 h-4 w-4" /> Call
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Finish CTA */}
                        <Link to="/job/123/rate">
                            <Button className="w-full mt-5 rounded-2xl bg-primary font-semibold text-primary-foreground shadow-lg hover:bg-primary/90">
                                Selesaikan & Rating
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default JobTrackingPage;
