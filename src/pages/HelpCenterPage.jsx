// src/pages/HelpCenterPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Search,
    ChevronRight,
    MessageCircle,
    Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmptyState from "@/components/feedback/EmptyState";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

const faqItems = [
    {
        q: "Bagaimana cara kerja auto-matching?",
        a: "Sistem otomatis mencocokkan pekerjaan dengan pekerja terdekat sesuai kualifikasi.",
    },
    {
        q: "Bagaimana sistem komisi?",
        a: "Komisi 11% dipotong dari total bayaran setiap pekerjaan yang selesai.",
    },
    {
        q: "Apakah pembayaran tunai aman?",
        a: "Ya, aman. Semua transaksi tercatat. Tekan tombol 'Selesai' setelah pembayaran.",
    },
    {
        q: "Bagaimana jika ada masalah?",
        a: "Gunakan menu 'Laporkan Masalah'. Tim kami akan segera membantu Anda.",
    },
];

export default function HelpCenterPage() {
    const [search, setSearch] = useState("");

    // sanitize input, cegah script/link jahat
    const sanitize = (v) => v.replace(/[<>]/g, "");
    const filteredFaq = faqItems.filter((f) =>
        f.q.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AnimatedPage>
            <Helmet>
                <title>Pusat Bantuan — Kerjain</title>
                <meta
                    name="description"
                    content="Temukan jawaban atas pertanyaan umum, hubungi support, atau gunakan live chat di pusat bantuan Kerjain."
                />
            </Helmet>

            <div className="relative min-h-dvh w-full px-4 py-8 space-y-8">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-3"
                >
                    <Link to={-1}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-card/40 backdrop-blur-md hover:bg-accent/20 hover:text-accent transition-colors duration-300"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-semibold text-foreground">Pusat Bantuan</h1>
                </motion.header>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="relative"
                >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari pertanyaan atau topik..."
                        value={search}
                        onChange={(e) => setSearch(sanitize(e.target.value))}
                        sanitize="strong"
                        className="pl-10 rounded-2xl border-border/50 bg-card/40 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent/40 transition-all duration-300"
                    />
                </motion.div>

                {/* FAQ */}
                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.08 } },
                    }}
                    className="space-y-4"
                >
                    <h2 className="text-lg font-semibold text-foreground">FAQ</h2>
                    {filteredFaq.length > 0 ? (
                        filteredFaq.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                            >
                                <details className="group rounded-2xl border border-border/50 bg-card/50 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md">
                                    <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground hover:text-accent transition-colors duration-300">
                                        {item.q}
                                        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-90" />
                                    </summary>
                                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                        {item.a}
                                    </p>
                                </details>
                            </motion.div>
                        ))
                    ) : (
                        <EmptyState title="Tidak ada hasil" subtitle="Coba kata kunci lain." />
                    )}
                </motion.section>

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-3xl border border-border/50 bg-card/60 p-6 text-center shadow-md backdrop-blur-xl space-y-3"
                >
                    <h3 className="text-lg font-semibold text-foreground">
                        Butuh bantuan lebih?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Hubungi tim support atau gunakan live chat.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                        <Button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground hover:scale-[1.02] transition-all duration-350 shadow-sm">
                            <MessageCircle className="h-4 w-4" />
                            Live Chat
                        </Button>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 rounded-2xl border-accent/50 text-foreground hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-350"
                        >
                            <Mail className="h-4 w-4" />
                            Email Support
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
}
