// LoginPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Key, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedPage from "@/components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet";

export default function LoginPage() {
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        toast({ title: "Login Berhasil", description: "Mengalihkan..." });
        setTimeout(() => navigate("/select-role"), 1200);
    };

    const handleSocialLogin = (provider) => {
        toast({
            title: `🚧 Login ${provider} belum tersedia`,
            description: "Segera hadir.",
        });
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Masuk — Kerjain</title>
            </Helmet>

            <div className="relative flex min-h-screen items-center justify-center px-4">
                {/* Grid overlay */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to_right, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px), repeating-linear-gradient(to_bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px)",
                    }}
                />
                {/* Blob animations */}
                <div className="absolute -top-20 -left-20 h-72 w-72 animate-pulse rounded-full bg-purple-600/30 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-600/20 blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-md"
                >
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-bold text-white">
                                Selamat Datang
                            </h1>
                            <p className="mt-1 text-sm text-white/60">
                                Masuk untuk melanjutkan
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="sr-only">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                        className="w-full rounded-xl border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/50 focus:ring-2 focus:ring-purple-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="password" className="sr-only">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        className="w-full rounded-xl border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/50 focus:ring-2 focus:ring-purple-400"
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full rounded-xl bg-white py-3 font-semibold text-gray-900 hover:bg-gray-200"
                            >
                                Masuk <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center">
                            <span className="h-px flex-1 bg-white/20" />
                            <span className="mx-2 text-xs text-white/50">
                                atau
                            </span>
                            <span className="h-px flex-1 bg-white/20" />
                        </div>

                        {/* Social login */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                className="rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20"
                                onClick={() => handleSocialLogin("Google")}
                            >
                                Google
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20"
                                onClick={() => handleSocialLogin("Apple")}
                            >
                                Apple
                            </Button>
                        </div>

                        <p className="mt-6 text-center text-sm text-white/60">
                            Belum punya akun?{" "}
                            <Link
                                to="/verify"
                                className="font-semibold text-purple-300 hover:underline"
                            >
                                Daftar
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
}
