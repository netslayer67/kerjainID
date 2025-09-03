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


                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-md"
                >
                    <div className="rounded-2xl border border-border/30 bg-background/10 p-8 shadow-2xl backdrop-blur-xl">
                        {/* Header */}
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-bold text-foreground">
                                Selamat Datang
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Masuk untuk melanjutkan
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="sr-only">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                        className="w-full rounded-xl border-border/40 bg-background/20 pl-10 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="password" className="sr-only">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        className="w-full rounded-xl border-border/40 bg-background/20 pl-10 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                                Masuk <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center">
                            <span className="h-px flex-1 bg-border/30" />
                            <span className="mx-2 text-xs text-muted-foreground">atau</span>
                            <span className="h-px flex-1 bg-border/30" />
                        </div>

                        {/* Social login */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                className="rounded-xl border-border/40 bg-background/20 text-foreground hover:bg-background/30 transition-colors"
                                onClick={() => handleSocialLogin("Google")}
                            >
                                Google
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-xl border-border/40 bg-background/20 text-foreground hover:bg-background/30 transition-colors"
                                onClick={() => handleSocialLogin("Apple")}
                            >
                                Apple
                            </Button>
                        </div>

                        {/* Footer link */}
                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            Belum punya akun?{" "}
                            <Link
                                to="/verify"
                                className="font-semibold text-primary hover:underline"
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
