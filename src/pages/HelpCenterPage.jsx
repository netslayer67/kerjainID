import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

const faqItems = [
    {
        q: "Bagaimana cara kerja auto-matching?",
        a: "Sistem otomatis mencocokkan pekerjaan dengan pekerja terdekat & sesuai kualifikasi.",
    },
    {
        q: "Bagaimana sistem komisi?",
        a: "Komisi 11% dipotong dari total bayaran setiap pekerjaan selesai.",
    },
    {
        q: "Apakah pembayaran tunai aman?",
        a: "Aman, transaksi tetap tercatat. Tekan tombol 'Selesai' setelah pembayaran.",
    },
    {
        q: "Bagaimana jika ada masalah?",
        a: "Ajukan sengketa lewat 'Laporkan Masalah'. Tim kami akan bantu.",
    },
];

const HelpCenterPage = () => {
    return (
        <AnimatedPage>
            <Helmet>
                <title>Pusat Bantuan — Kerjain</title>
                <meta
                    name="description"
                    content="Temukan jawaban atas pertanyaan umum tentang Kerjain di pusat bantuan."
                />
            </Helmet>

            <div className="relative min-h-dvh w-full px-4 py-6">
                {/* Background: subtle grid + gradient blobs */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to_right, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px), repeating-linear-gradient(to_bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px)",
                    }}
                />
                <div className="absolute -top-16 left-10 h-72 w-72 animate-pulse rounded-full bg-indigo-500/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6 flex items-center gap-3"
                >
                    <Link to={-1}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20"
                        >
                            <ArrowLeft className="h-5 w-5 text-white" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-semibold text-white">Pusat Bantuan</h1>
                </motion.div>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-8"
                >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                    <Input
                        placeholder="Cari bantuan..."
                        className="pl-10 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/40 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-indigo-400"
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
                    className="space-y-3"
                >
                    <h2 className="mb-2 text-base font-semibold text-white/80">
                        Pertanyaan Umum
                    </h2>
                    {faqItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <details className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition hover:bg-white/10">
                                <summary className="flex cursor-pointer items-center justify-between font-medium text-white/90">
                                    {item.q}
                                    <ChevronRight className="h-5 w-5 text-white/50 transition-transform group-open:rotate-90" />
                                </summary>
                                <p className="mt-2 text-sm text-white/70">{item.a}</p>
                            </details>
                        </motion.div>
                    ))}
                </motion.section>

                {/* Contact Support */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-2xl"
                >
                    <h3 className="text-base font-semibold text-white">
                        Tidak menemukan jawaban?
                    </h3>
                    <p className="my-2 text-sm text-white/70">
                        Hubungi tim support kami untuk bantuan.
                    </p>
                    <Button className="mt-2 rounded-2xl bg-white px-6 font-semibold text-gray-900 hover:bg-gray-100">
                        Hubungi Support
                    </Button>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default HelpCenterPage;
