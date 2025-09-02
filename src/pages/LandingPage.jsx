// LandingPage.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    ShoppingCart,
    Code,
    Hammer,
    Paintbrush,
    PartyPopper,
    Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

const featureCategories = [
    { icon: ShoppingCart, text: "Urusan Harian" },
    { icon: Code, text: "Jasa Digital" },
    { icon: Hammer, text: "Tenaga Manual" },
    { icon: Paintbrush, text: "Pekerjaan Kreatif" },
    { icon: PartyPopper, text: "Bantuan Acara" },
];

const FadeUp = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
    >
        {children}
    </motion.div>
);

export default function LandingPage() {
    const prefersReducedMotion = useReducedMotion();
    return (
        <AnimatedPage>
            <Helmet>
                <title>Kerjain - Solusi Cepat Semua Kebutuhan Jasa Anda</title>
                <meta
                    name="description"
                    content="Kerjain — platform auto-matching untuk kebutuhan harian & proyek. Cepat, andal, ada di ujung jari."
                />
            </Helmet>

            {/* Header */}
            <header className="fixed inset-x-0 top-0 z-30 px-4 py-3">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/" aria-label="Kerjain - beranda">
                        <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-foreground">
                            Kerjain
                        </h1>
                    </Link>

                    <div className="hidden sm:flex items-center gap-3">
                        <Link to="/worker/dashboard">
                            <Button variant="ghost" className="px-4 py-2">
                                Jadi Pekerja
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" className="px-4 py-2">
                                Masuk
                            </Button>
                        </Link>
                    </div>

                    {/* mobile actions */}
                    <div className="sm:hidden">
                        <Link to="/login" aria-label="menu">
                            <Button variant="ghost" className="p-2">
                                <Menu className="w-5 h-5 text-foreground" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="min-h-screen relative flex items-center">
                {/* Blobs (use design tokens) */}

                {/* Grid overlay */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage:
                            `repeating-linear-gradient(to right, hsl(var(--foreground)/0.06) 0 1px, transparent 1px 56px), repeating-linear-gradient(to bottom, hsl(var(--foreground)/0.06) 0 1px, transparent 1px 56px)`,
                    }}
                />

                {/* subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.02)] -z-5" />



                {/* content container */}
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        aria-hidden
                        initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
                        animate={prefersReducedMotion ? {} : { opacity: 0.7, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[hsl(var(--accent))]/30 blur-3xl"
                    />
                    <motion.div
                        aria-hidden
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                        animate={prefersReducedMotion ? {} : { opacity: 0.6, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.05 }}
                        className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[hsl(var(--ring))]/25 blur-3xl"
                    />

                    <div className="max-w-3xl mx-auto text-center">
                        <FadeUp>
                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-accent">
                                Butuh Bantuan? <br /> Kerjain Aja.
                            </h2>
                        </FadeUp>

                        <FadeUp delay={0.12}>
                            <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
                                Auto-matching yang cepat untuk tugas harian dan proyek skala besar —
                                langsung dari ponsel.
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.24}>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
                                <Link to="/select-role" className="w-full sm:w-auto">
                                    <Button size="lg" className="w-full sm:w-auto font-semibold">
                                        Mulai Sekarang
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>

                                <Link to="/worker/dashboard" className="w-full sm:w-auto">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full sm:w-auto font-semibold"
                                    >
                                        Jadi Pekerja
                                    </Button>
                                </Link>
                            </div>
                        </FadeUp>

                        {/* small fingerprint / hint card (glassmorphic) */}
                        <FadeUp delay={0.4}>
                            <div className="mt-8 mx-auto max-w-md glassmorphic-card border-border/40 p-4 flex items-center gap-4 shadow-sm">
                                <div className="flex-shrink-0 p-3 rounded-xl bg-card/60 border border-border/30">
                                    <ShoppingCart className="w-6 h-6 text-accent" />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-medium text-foreground">
                                        Aplikasi all-in-one
                                    </div>
                                    <div className="text-xs text-muted-foreground">Cepat. Terpercaya.</div>
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 sm:py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <FadeUp>
                            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                                Semua Jenis Pekerjaan
                            </h3>
                        </FadeUp>
                        <FadeUp delay={0.08}>
                            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                                Dari beli kopi sampai bikin website — pilih kategori, cocokkan, dan
                                selesai.
                            </p>
                        </FadeUp>
                    </div>

                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {featureCategories.map((cat, idx) => {
                            const Icon = cat.icon;
                            return (
                                <motion.div
                                    key={cat.text}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.06, duration: 0.45 }}
                                    className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-card/40 backdrop-blur-md border border-border/30 hover:scale-[1.03] transition-transform duration-200"
                                >
                                    <div className="p-3 rounded-lg bg-accent/10 border border-border/20">
                                        <Icon className="w-6 h-6 text-accent" />
                                    </div>
                                    <span className="text-sm font-medium text-foreground">{cat.text}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA / small pitch strip */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl glassmorphic-card p-6 border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <div className="text-base font-semibold text-foreground">Siap coba?</div>
                            <div className="text-sm text-muted-foreground">Mulai dalam beberapa langkah.</div>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/select-role">
                                <Button>Mulai</Button>
                            </Link>
                            <Link to="/about">
                                <Button variant="ghost">Pelajari</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border bg-background">
                <div className="container mx-auto px-4 py-6 text-center">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} Kerjain. Semua hak dilindungi.
                    </p>
                </div>
            </footer>
        </AnimatedPage>
    );
}
