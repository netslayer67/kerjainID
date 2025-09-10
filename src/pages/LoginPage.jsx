// src/pages/LoginPage.jsx
import React, { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Key, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedPage from "@/components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet";

/**
 * sanitizeText - ringan & safe sanitization for user inputs
 * - removes tags
 * - strips javascript:, data:, vbscript:
 * - removes http/https/ftp links
 * - collapses multiple spaces
 * - trims and limits length
 */
const sanitizeText = (v = "", maxLen = 240) =>
    String(v)
        .replace(/<[^>]*>/g, "")
        .replace(/\b(?:javascript:|data:|vbscript:)[^\s]*/gi, "")
        .replace(/https?:\/\/[^\s]+/gi, "")
        .replace(/\s{2,}/g, " ")
        .trim()
        .slice(0, maxLen);

export default function LoginPage() {
    const { toast } = useToast();
    const navigate = useNavigate();

    // controlled inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);

    // motion timing consistent with design (320ms)
    const anim = useMemo(
        () => ({ initial: { opacity: 0, scale: 0.98, y: 18 }, animate: { opacity: 1, scale: 1, y: 0 }, transition: { duration: 0.32, ease: "easeOut" } }),
        []
    );

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const safeEmail = sanitizeText(email, 120);
            const safePassword = sanitizeText(password, 240);

            // minimal validation
            if (!safeEmail || !safeEmail.includes("@")) {
                toast({ title: "Alamat email tidak valid", description: "Periksa kembali email Anda." });
                return;
            }
            if (!safePassword || safePassword.length < 6) {
                toast({ title: "Password terlalu pendek", description: "Gunakan minimal 6 karakter." });
                return;
            }

            // simulate login
            setLoading(true);
            toast({ title: "Proses masuk", description: "Tunggu sebentar..." });
            setTimeout(() => {
                setLoading(false);
                toast({ title: "Login berhasil", description: "Mengarahkan..." });
                navigate("/select-role");
            }, 900);
        },
        [email, password, toast, navigate]
    );

    const handleSocialLogin = useCallback(
        (provider) => {
            toast({ title: `Login ${provider} belum tersedia`, description: "Akan hadir segera." });
        },
        [toast]
    );

    // accessible labels
    return (
        <AnimatedPage>
            <Helmet>
                <title>Masuk — Kerjain</title>
            </Helmet>

            <div className="flex min-h-screen items-center justify-center px-4 py-10">
                <motion.div {...anim} className="w-full max-w-md">
                    <div className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-xl p-6 shadow-xl">
                        {/* header */}
                        <header className="mb-4 text-center">
                            <h1 className="text-2xl font-semibold text-foreground">Selamat Datang</h1>
                            <p className="mt-1 text-sm text-muted-foreground">Masuk untuk melanjutkan</p>
                        </header>

                        {/* form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="mb-1 text-sm text-foreground/90">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        inputMode="email"
                                        autoComplete="email"
                                        placeholder="name@contoh.com"
                                        value={email}
                                        onChange={(e) => setEmail(sanitizeText(e.target.value, 120))}
                                        required
                                        aria-required="true"
                                        className="w-full rounded-xl border border-border/40 bg-background/20 pl-10 pr-3 py-2 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent transition-colors duration-320"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="password" className="mb-1 text-sm text-foreground/90">
                                    Kata sandi
                                </Label>
                                <div className="relative">
                                    <KeyIconLeft />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPwd ? "text" : "password"}
                                        placeholder="Minimal 6 karakter"
                                        value={password}
                                        onChange={(e) => setPassword(sanitizeText(e.target.value, 240))}
                                        required
                                        aria-required="true"
                                        className="w-full rounded-xl border border-border/40 bg-background/20 pl-10 pr-10 py-2 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent transition-colors duration-320"
                                    />
                                    <button
                                        type="button"
                                        tabIndex={0}
                                        aria-pressed={showPwd}
                                        onClick={() => setShowPwd((s) => !s)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-accent transition-colors duration-320"
                                        title={showPwd ? "Sembunyikan password" : "Tampilkan password"}
                                    >
                                        {showPwd ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full rounded-2xl bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-sm transition-colors duration-320 hover:bg-accent hover:text-accent-foreground"
                                aria-busy={loading}
                                disabled={loading}
                            >
                                {loading ? "Memproses..." : "Masuk"}
                                <ArrowRight className="inline-block ml-2 h-4 w-4" />
                            </Button>
                        </form>

                        {/* divider */}
                        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex-1 h-px bg-border/30" />
                            <span>atau</span>
                            <span className="flex-1 h-px bg-border/30" />
                        </div>

                        {/* social */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                className="rounded-xl border-border/40 bg-background/20 text-foreground hover:bg-background/30 transition-colors duration-320"
                                onClick={() => handleSocialLogin("Google")}
                            >
                                Google
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-xl border-border/40 bg-background/20 text-foreground hover:bg-background/30 transition-colors duration-320"
                                onClick={() => handleSocialLogin("Apple")}
                            >
                                Apple
                            </Button>
                        </div>

                        {/* footer */}
                        <p className="mt-5 text-center text-sm text-muted-foreground">
                            Belum punya akun?{" "}
                            <Link to="/register" className="font-semibold text-accent hover:underline">
                                Daftar
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
}

/* Small subcomponent for inline key icon left */
function KeyIconLeft() {
    return <Key className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden />;
}
