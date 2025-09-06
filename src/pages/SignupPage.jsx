// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import AnimatedPage from "@/components/AnimatedPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function SignupPage() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const reduce = useReducedMotion();

    // form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    // animations
    const cardAnim = {
        initial: { opacity: 0, y: reduce ? 0 : 12 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.32 } },
    };

    // validation helpers
    const isEmail = (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());

    const canSubmit = () =>
        name.trim().length > 1 &&
        isEmail(email) &&
        password.length >= 8 &&
        password === confirm;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEmail(email)) {
            toast({ title: "Email tidak valid", description: "Periksa kembali alamat email." });
            return;
        }
        if (password.length < 8) {
            toast({ title: "Password terlalu singkat", description: "Gunakan minimal 8 karakter." });
            return;
        }
        if (password !== confirm) {
            toast({ title: "Password tidak cocok", description: "Pastikan password dan konfirmasi sama." });
            return;
        }

        setLoading(true);

        // Simulate signup flow (replace with real API call)
        try {
            // fake delay to show toast & transition
            toast({ title: "Akun dibuat", description: "Lanjut ke proses verifikasi." });
            setTimeout(() => {
                // navigate to verification step (flow: signup -> verify -> select role)
                navigate("/verify");
            }, 500);
        } catch (err) {
            toast({ title: "Gagal membuat akun", description: "Coba lagi nanti.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Daftar — Kerjain</title>
            </Helmet>

            <div className="min-h-dvh flex items-center justify-center px-4 py-10">
                <motion.div
                    {...cardAnim}
                    className="w-full max-w-md"
                >
                    {/* header */}
                    <div className="mb-6 flex items-center gap-3">
                        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                            &larr; Kembali
                        </Link>
                        <h1 className="flex-1 text-lg font-semibold text-foreground text-center">Buat Akun</h1>
                        <div className="w-6" aria-hidden />
                    </div>

                    {/* card */}
                    <div className="rounded-2xl border border-border/40 bg-card/60 p-6 backdrop-blur-xl shadow-md">
                        {/* subtle avatar + pitch */}
                        <div className="mb-4 flex items-center gap-4">
                            <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center font-semibold text-lg shadow-sm">
                                <User className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground">Selamat datang 👋</p>
                                <p className="text-xs text-muted-foreground">Daftar untuk mulai gunakan Kerjain — cepat & aman</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                            <motion.div
                                initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.32 }}
                            >
                                <label className="text-xs font-medium text-muted-foreground">Nama Lengkap</label>
                                <div className="mt-1 relative">
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Contoh: Budi Santoso"
                                        className="pl-10"
                                        aria-label="Nama lengkap"
                                        required
                                    />
                                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <User className="h-4 w-4" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.32, delay: 0.04 }}
                            >
                                <label className="text-xs font-medium text-muted-foreground">Email</label>
                                <div className="mt-1 relative">
                                    <Input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        placeholder="nama@contoh.com"
                                        className="pl-10"
                                        aria-label="Alamat email"
                                        required
                                    />
                                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.32, delay: 0.08 }}
                            >
                                <label className="text-xs font-medium text-muted-foreground">Password</label>
                                <div className="mt-1 relative">
                                    <Input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={showPass ? "text" : "password"}
                                        placeholder="Minimal 8 karakter"
                                        className="pl-10 pr-10"
                                        aria-label="Password"
                                        required
                                    />
                                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <Lock className="h-4 w-4" />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setShowPass((s) => !s)}
                                        aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground p-1 rounded hover:text-foreground transition-colors duration-300"
                                    >
                                        {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground">Gunakan kombinasi huruf, angka, & simbol untuk keamanan.</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.32, delay: 0.12 }}
                            >
                                <label className="text-xs font-medium text-muted-foreground">Konfirmasi Password</label>
                                <Input
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    type={showPass ? "text" : "password"}
                                    placeholder="Ketik ulang password"
                                    className="mt-1"
                                    aria-label="Konfirmasi password"
                                    required
                                />
                            </motion.div>

                            <div className="flex items-center justify-between gap-3 mt-2">
                                <div className="text-xs text-muted-foreground">
                                    Dengan mendaftar Anda setuju ke <Link to="/terms" className="text-accent hover:underline">Syarat & Ketentuan</Link> kami.
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.32, delay: 0.16 }}
                            >
                                <Button
                                    type="submit"
                                    className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-sm hover:scale-[1.01] transition-transform duration-300"
                                    disabled={!canSubmit() || loading}
                                >
                                    {loading ? "Memproses..." : (
                                        <span className="inline-flex items-center gap-2">
                                            Daftar
                                            <ArrowRight className="h-4 w-4" />
                                        </span>
                                    )}
                                </Button>
                            </motion.div>
                        </form>

                        <div className="mt-4 text-center text-xs text-muted-foreground">
                            Sudah punya akun?{" "}
                            <Link to="/login" className="text-accent font-medium hover:underline">Masuk</Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
}
