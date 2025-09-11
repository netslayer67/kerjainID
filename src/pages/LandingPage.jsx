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

// --- Feature categories
const featureCategories = [
    { icon: ShoppingCart, text: "Urusan Harian" },
    { icon: Code, text: "Jasa Digital" },
    { icon: Hammer, text: "Tenaga Manual" },
    { icon: Paintbrush, text: "Pekerjaan Kreatif" },
    { icon: PartyPopper, text: "Bantuan Acara" },
];

// --- Motion fade
const FadeUp = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
    >
        {children}
    </motion.div>
);

// --- Input sanitizer (basic)
const sanitizeInput = (value) => {
    return value
        .replace(/<[^>]*>?/gm, "") // strip tags
        .replace(/https?:\/\/\S+/g, "") // remove links
        .replace(/(script|onerror|onload)/gi, ""); // remove js keywords
};

export default function LandingPage() {
    const prefersReducedMotion = useReducedMotion();
    const [email, setEmail] = useState("");

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
            <header className="fixed inset-x-0 top-0 z-30 px-4 py-3 backdrop-blur-xl">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/" aria-label="Kerjain - beranda">
                        <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-foreground">
                            Kerjain
                        </h1>
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden sm:flex items-center gap-3">
                        <Link to="/worker/dashboard">
                            <Button variant="ghost" className="px-4 py-2 hover:text-accent transition-colors duration-300">
                                Jadi Pekerja
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" className="px-4 py-2 hover:border-accent hover:text-accent transition-colors duration-300">
                                Masuk
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile dropdown */}
                    <div className="sm:hidden">
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <Button variant="ghost" className="p-2">
                                    <Menu className="w-5 h-5 text-foreground" />
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content className="rounded-xl bg-card/90 backdrop-blur-xl border border-border/30 shadow-lg p-2 space-y-1">
                                <DropdownMenu.Item asChild>
                                    <Link to="/login">
                                        <Button variant="ghost" className="w-full justify-start">Masuk</Button>
                                    </Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item asChild>
                                    <Link to="/worker/dashboard">
                                        <Button variant="ghost" className="w-full justify-start">Jadi Pekerja</Button>
                                    </Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item asChild>
                                    <Link to="/select-role">
                                        <Button variant="ghost" className="w-full justify-start">Pelajari</Button>
                                    </Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="min-h-screen relative flex items-center overflow-hidden">
                {/* Background blob */}
                <div className="absolute -top-32 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse delay-200" />

                <div className="absolute inset-0 -z-5" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <FadeUp>
                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                                Butuh Bantuan? <br /> Kerjain Aja.
                            </h2>
                        </FadeUp>

                        <FadeUp delay={0.12}>
                            <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
                                Auto-matching cepat untuk tugas harian dan proyek besar — semua dari ponsel Anda.
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.24}>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
                                <Link to="/select-role" className="w-full sm:w-auto">
                                    <Button size="lg" className="group w-full sm:w-auto font-semibold transition-all duration-350 hover:bg-accent hover:text-background">
                                        Mulai Sekarang
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-350 group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link to="/worker/dashboard" className="w-full sm:w-auto">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full sm:w-auto font-semibold hover:border-accent hover:text-accent transition-colors duration-350"
                                    >
                                        Jadi Pekerja
                                    </Button>
                                </Link>
                            </div>
                        </FadeUp>

                        {/* Glassmorphic card */}
                        <FadeUp delay={0.4}>
                            <div className="mt-8 mx-auto max-w-md rounded-2xl bg-card/40 backdrop-blur-xl border border-border/30 p-4 flex items-center gap-4 shadow-lg">
                                <div className="flex-shrink-0 p-3 rounded-xl bg-accent/10 border border-border/20">
                                    <ShoppingCart className="w-6 h-6 text-accent" />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-medium text-foreground">Aplikasi all-in-one</div>
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
                            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Semua Jenis Pekerjaan</h3>
                        </FadeUp>
                        <FadeUp delay={0.08}>
                            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                                Dari beli kopi sampai bikin website — pilih kategori, cocokkan, selesai.
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
                                    className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-card/50 backdrop-blur-xl border border-border/30 hover:scale-[1.05] hover:border-accent transition-all duration-300"
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

            {/* Trust element */}
            <section className="py-10 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm font-medium text-muted-foreground">Dipercaya ribuan pengguna & 100+ kategori pekerjaan</p>
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
                    <div className="mx-auto max-w-3xl rounded-2xl bg-card/50 backdrop-blur-xl border border-border/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <div className="text-base font-semibold text-foreground">Siap coba?</div>
                            <div className="text-sm text-muted-foreground">Mulai hanya dalam beberapa langkah.</div>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/select-role">
                                <Button className="hover:bg-accent hover:text-background transition-colors duration-350">Mulai</Button>
                            </Link>
                            {/* Disable About link kalau page belum ada */}
                            <Button variant="ghost" disabled className="opacity-50">Pelajari</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter (with input security) */}
            <section className="py-10">
                <div className="container mx-auto px-4 text-center max-w-lg">
                    <h4 className="text-lg font-semibold text-foreground">Tetap terhubung</h4>
                    <p className="text-sm text-muted-foreground mt-1">Dapatkan update fitur terbaru kami.</p>
                    <form
                        className="mt-4 flex gap-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert("Terima kasih! Email kamu tersimpan.");
                        }}
                    >
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(sanitizeInput(e.target.value))}
                            placeholder="Alamat email"
                            className="flex-1 px-3 py-2 rounded-lg border border-border/40 bg-card/50 backdrop-blur placeholder:text-muted-foreground text-sm focus:ring-2 focus:ring-accent outline-none"
                        />
                        <Button type="submit" className="hover:bg-accent hover:text-background transition-colors duration-350">Kirim</Button>
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
