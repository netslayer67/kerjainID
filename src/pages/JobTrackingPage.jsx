import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    MessageSquare,
    Phone,
    Star,
    Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

const JobTrackingPage = () => {
    const steps = [
        { name: "Diterima", completed: true },
        { name: "Menuju", completed: true },
        { name: "Pengerjaan", completed: true },
        { name: "Selesai", completed: false },
    ];

    return (
        <AnimatedPage>
            <Helmet>
                <title>Lacak Pekerjaan - Kerjain</title>
            </Helmet>

            <div className="relative min-h-screen space-y-8 px-4 py-6 md:px-8">
                {/* Grid pattern background */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to_right, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px), repeating-linear-gradient(to_bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px)",
                    }}
                />
                {/* Gradient blobs */}
                <div className="absolute -top-24 -left-16 h-72 w-72 animate-pulse rounded-full bg-purple-600/30 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-600/20 blur-3xl" />

                {/* Header */}
                <div className="relative z-10 flex items-center gap-3">
                    <Link to="/client/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold text-white md:text-2xl">
                        Lacak Pekerjaan
                    </h1>
                </div>

                <div className="relative z-10 grid gap-6 lg:grid-cols-3">
                    {/* Left Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Map Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
                                <CardHeader>
                                    <CardTitle className="text-white">Lokasi Pekerja</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="aspect-video rounded-xl bg-black/30 flex items-center justify-center text-white/50">
                                        Peta ditampilkan di sini
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Progress Steps */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
                                <CardHeader>
                                    <CardTitle className="text-white">Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between">
                                        {steps.map((step, index) => (
                                            <div
                                                key={step.name}
                                                className="relative flex flex-1 flex-col items-center"
                                            >
                                                <motion.div
                                                    initial={{ scale: 0.8 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${step.completed
                                                        ? "bg-purple-500 border-purple-500"
                                                        : "border-white/30"
                                                        }`}
                                                >
                                                    {step.completed && (
                                                        <Check className="h-4 w-4 text-white" />
                                                    )}
                                                </motion.div>
                                                <p
                                                    className={`mt-2 text-xs md:text-sm ${step.completed
                                                        ? "font-semibold text-white"
                                                        : "text-white/60"
                                                        }`}
                                                >
                                                    {step.name}
                                                </p>
                                                {index < steps.length - 1 && (
                                                    <div
                                                        className={`absolute top-4 left-1/2 w-full h-0.5 ${steps[index + 1].completed
                                                            ? "bg-purple-500"
                                                            : "bg-white/30"
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
                        transition={{ duration: 0.7 }}
                        className="space-y-6"
                    >
                        {/* Worker Info */}
                        <Card className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle className="text-white">Pekerja</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-2xl font-bold text-white">
                                        B
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-white">
                                            Budi Santoso
                                        </p>
                                        <div className="flex items-center gap-1 text-sm text-yellow-400">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span>4.9 (120)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link to="/chat" className="w-full">
                                        <Button className="w-full bg-white/10 border border-white/20 hover:bg-white/20">
                                            <MessageSquare className="mr-2 h-4 w-4" /> Chat
                                        </Button>
                                    </Link>
                                    <Button className="w-full bg-white/10 border border-white/20 hover:bg-white/20">
                                        <Phone className="mr-2 h-4 w-4" /> Call
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Finish Job */}
                        <Link to="/job/123/rate">
                            <Button className="w-full mt-3 rounded-xl bg-green-500 font-bold text-white hover:bg-green-600">
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
