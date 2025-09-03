// HelpCenterPage.jsx
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
                            className="rounded-full bg-background/20 backdrop-blur-md hover:bg-background/30"
                        >
                            <ArrowLeft className="h-5 w-5 text-foreground" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-semibold text-foreground">
                        Pusat Bantuan
                    </h1>
                </motion.div>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-8"
                >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Cari bantuan..."
                        className="pl-10 rounded-2xl border-border/40 bg-background/20 text-foreground placeholder:text-muted-foreground backdrop-blur-md focus-visible:ring-2 focus-visible:ring-primary/40"
                    />
                </motion.div>

                {/* FAQ Section */}
                <motion.section
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.08 } },
                    }}
                    className="space-y-3"
                >
                    <h2 className="mb-2 text-base font-semibold text-muted-foreground">
                        Pertanyaan Umum
                    </h2>
                    {faqItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <details className="group rounded-2xl border border-border/30 bg-background/10 p-4 backdrop-blur-xl transition hover:bg-background/20">
                                <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground">
                                    {item.q}
                                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-90" />
                                </summary>
                                <p className="mt-2 text-xs text-muted-foreground">{item.a}</p>
                            </details>
                        </motion.div>
                    ))}
                </motion.section>

                {/* Contact Support */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 rounded-3xl border border-border/30 bg-background/10 p-6 text-center backdrop-blur-2xl"
                >
                    <h3 className="text-base font-semibold text-foreground">
                        Tidak menemukan jawaban?
                    </h3>
                    <p className="my-2 text-sm text-muted-foreground">
                        Hubungi tim support kami untuk bantuan.
                    </p>
                    <Button className="mt-2 rounded-2xl bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90">
                        Hubungi Support
                    </Button>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default HelpCenterPage;
