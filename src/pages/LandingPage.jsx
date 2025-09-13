import React, { useState } from "react";
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
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

/* --- Feature categories (concise) --- */
const featureCategories = [
    { icon: ShoppingCart, text: "Urusan Harian" },
    { icon: Code, text: "Jasa Digital" },
    { icon: Hammer, text: "Tenaga Manual" },
    { icon: Paintbrush, text: "Kreatif" },
    { icon: PartyPopper, text: "Acara" },
];

/* --- FadeUp motion --- */
const FadeUp = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay }}
    >
        {children}
    </motion.div>
);

/* --- Basic input sanitizer --- */
const sanitizeInput = (value) => {
    return String(value || "")
        .replace(/<[^>]*>?/gm, "")
        .replace(/https?:\/\/\S+/g, "")
        .replace(/(script|onerror|onload|data:|vbscript:)/gi, "")
        .trim()
        .slice(0, 160);
};

export default function LandingPage() {
    const prefersReducedMotion = useReducedMotion();
    const [email, setEmail] = useState("");

    return (
        <AnimatedPage>
            <Helmet>
                <title>Kerjain — Bantu Cepat, Kerja Dapat</title>
                <meta
                    name="description"
                    content="Kerjain — hybrid platform untuk tugas mikro & proyek. Ringan, cepat, aman."
                />
            </Helmet>

            {/* Header (liquid glass, compact) */}
            <header className="fixed inset-x-0 top-0 z-30">
                <div className="glass-strong border-b">
                    <div className="relative">
                        <div className="absolute inset-0 bg-grid-small opacity-10 pointer-events-none" aria-hidden />
                        <div className="container mx-auto flex items-center justify-between px-4 py-3">
                            <Link to="/" aria-label="Kerjain - beranda">
                                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                                    Kerjain
                                </h1>
                            </Link>

                            {/* Desktop menu */}
                            <div className="hidden sm:flex items-center gap-2">
                                <Link to="/worker/dashboard">
                                    <Button variant="ghost" className="px-3 py-2 hover-card">
                                        Pekerja
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button variant="outline" className="px-3 py-2 hover-card">
                                        Masuk
                                    </Button>
                                </Link>
                            </div>

                            {/* Mobile dropdown */}
                            <div className="sm:hidden">
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger asChild>
                                        <Button variant="ghost" className="h-10 w-10 rounded-full hover-card" aria-label="Menu">
                                            <Menu className="w-5 h-5 text-foreground" />
                                        </Button>
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content
                                        sideOffset={8}
                                        className="rounded-2xl glass-strong p-2 space-y-1 shadow-lg"
                                    >
                                        <DropdownMenu.Item asChild>
                                            <Link to="/login">
                                                <Button variant="ghost" className="w-full justify-start hover-card">
                                                    Masuk
                                                </Button>
                                            </Link>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item asChild>
                                            <Link to="/worker/dashboard">
                                                <Button variant="ghost" className="w-full justify-start hover-card">
                                                    Pekerja
                                                </Button>
                                            </Link>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item asChild>
                                            <Link to="/select-role">
                                                <Button variant="ghost" className="w-full justify-start hover-card">
                                                    Pelajari
                                                </Button>
                                            </Link>
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="min-h-screen relative flex items-center overflow-hidden">
                {/* Background blobs */}
                <div className="absolute -top-28 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-28 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute inset-0 -z-5" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <FadeUp>
                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                                Butuh bantuan? <br />Kerjain aja.
                            </h2>
                        </FadeUp>

                        <FadeUp delay={0.08}>
                            <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
                                Tugas kecil sampai proyek besar. Cari, nego, selesai.
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.16}>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
                                <Link to="/select-role" className="w-full sm:w-auto">
                                    <Button
                                        size="lg"
                                        className="group w-full sm:w-auto font-semibold hover-card bg-gradient-to-r from-primary to-accent text-primary-foreground"
                                    >
                                        Mulai
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-320 group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link to="/worker/dashboard" className="w-full sm:w-auto">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full sm:w-auto font-semibold hover-card"
                                    >
                                        Jadi Pekerja
                                    </Button>
                                </Link>
                            </div>
                        </FadeUp>

                        {/* Glass info card */}
                        <FadeUp delay={0.28}>
                            <div className="mt-7 mx-auto max-w-md glass-strong card-tight flex items-center gap-4">
                                <div className="flex-shrink-0 p-3 rounded-xl bg-accent/10 border border-border/30">
                                    <ShoppingCart className="w-6 h-6 text-accent" />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-medium text-foreground">Semudah pesan ojek</div>
                                    <div className="text-xs text-muted-foreground">Cocokkan cepat, aman, transparan.</div>
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
                            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Semua Kategori</h3>
                        </FadeUp>
                        <FadeUp delay={0.06}>
                            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                                Dari beliin kopi sampai bikin website. Pilih, nego, jalan.
                            </p>
                        </FadeUp>
                    </div>

                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                        {featureCategories.map((cat, idx) => {
                            const Icon = cat.icon;
                            return (
                                <motion.div
                                    key={cat.text}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                                    className="hover-card flex flex-col items-center gap-3 p-4 rounded-2xl glass"
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

            {/* Trust strip */}
            <section className="py-10 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-medium text-muted-foreground">Dipakai ribuan pengguna, lintas kategori</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-6 opacity-70">
                        <div className="h-6 w-20 bg-foreground/10 rounded" />
                        <div className="h-6 w-20 bg-foreground/10 rounded" />
                        <div className="h-6 w-20 bg-foreground/10 rounded" />
                        <div className="h-6 w-20 bg-foreground/10 rounded" />
                    </div>
                </div>
            </section>

            {/* CTA strip */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl glass-strong rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <div className="text-base font-semibold text-foreground">Siap coba?</div>
                            <div className="text-sm text-muted-foreground">Mulai dalam hitungan menit.</div>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/select-role">
                                <Button className="hover-card bg-gradient-to-r from-primary to-accent text-primary-foreground">Mulai</Button>
                            </Link>
                            <Button variant="ghost" disabled className="opacity-50">Pelajari</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter (sanitized) */}
            <section className="py-10">
                <div className="container mx-auto px-4 text-center max-w-lg">
                    <h4 className="text-lg font-semibold text-foreground">Tetap terupdate</h4>
                    <p className="text-sm text-muted-foreground mt-1">Kabar fitur baru & rilis.</p>
                    <form
                        className="mt-4 flex gap-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert("Terima kasih! Email kamu tersimpan (dummy).");
                        }}
                    >
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(sanitizeInput(e.target.value))}
                            placeholder="Alamat email"
                            className="flex-1 px-3 py-2 rounded-lg border border-border/40 bg-card/60 backdrop-blur placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-accent outline-none"
                        />
                        <Button type="submit" className="hover-card">Kirim</Button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border bg-background/80 backdrop-blur-lg">
                <div className="container mx-auto px-4 py-6 text-center">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} Kerjain. Semua hak dilindungi.
                    </p>
                </div>
            </footer>
        </AnimatedPage>
    );
}
