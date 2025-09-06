import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ArrowLeft, Wallet, Star, Bell, Check, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";

// --- Sample data ---
const initialNotifications = [
    { id: 1, icon: Wallet, title: "Pembayaran berhasil", text: "Rp 150.000 dari Budi", time: "1 jam lalu", read: false },
    { id: 2, icon: Star, title: "Rating baru", text: "Budi memberi Anda ★★★★★", time: "2 jam lalu", read: false },
    { id: 3, icon: Bell, title: "Promo spesial", text: "Diskon 20% pakai kode HEMAT", time: "1 hari lalu", read: true },
    { id: 4, icon: Wallet, title: "Penarikan diproses", text: "Rp 200.000 sedang diproses", time: "2 hari lalu", read: true },
];

const cn = (...c) => c.filter(Boolean).join(" ");

const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -60, transition: { duration: 0.28 } },
};

export default function NotificationPage() {
    const [notifications, setNotifications] = useState(initialNotifications);

    const dismiss = (id) => setNotifications((s) => s.filter((n) => n.id !== id));
    const markRead = (id) => setNotifications((s) => s.map((n) => (n.id === id ? { ...n, read: true } : n)));
    const markAllRead = () => setNotifications((s) => s.map((n) => ({ ...n, read: true })));
    const clearAll = () => setNotifications([]);

    return (
        <AnimatedPage>
            <Helmet>
                <title>Notifikasi — Kerjain</title>
            </Helmet>

            <MotionConfig reducedMotion="user">
                <div className="relative mx-auto max-w-lg px-4 pb-16 pt-6 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="relative z-10 mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link to={-1}>
                                <Button variant="ghost" size="icon" className="rounded-full bg-card/30 backdrop-blur-md hover:bg-card/50">
                                    <ArrowLeft className="h-5 w-5 text-foreground" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-lg font-semibold text-foreground">Notifikasi</h1>
                                <p className="text-xs text-muted-foreground">Tetap update dengan info terbaru.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hidden md:flex items-center gap-1 rounded-full px-2 py-1"
                                onClick={markAllRead}
                            >
                                <Check className="h-4 w-4" /> <span className="text-xs">Tandai semua</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-card/30 backdrop-blur-md hover:bg-card/50"
                                onClick={clearAll}
                                aria-label="Bersihkan semua"
                            >
                                <Trash2 className="h-4 w-4 text-foreground" />
                            </Button>
                        </div>
                    </div>

                    {/* Notifications */}
                    <section className="space-y-3">
                        <AnimatePresence>
                            {notifications.map((n, i) => {
                                const Icon = n.icon;
                                return (
                                    <motion.div
                                        key={n.id}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="enter"
                                        exit="exit"
                                        transition={{ duration: 0.28, delay: i * 0.04 }}
                                    >
                                        <motion.div
                                            drag="x"
                                            dragConstraints={{ left: 0, right: 0 }}
                                            dragElastic={0.2}
                                            onDragEnd={(_, info) => {
                                                const offset = info.offset.x;
                                                if (offset > 100) markRead(n.id); // swipe kanan = tandai dibaca
                                                else if (offset < -100) dismiss(n.id); // swipe kiri = hapus
                                            }}
                                        >
                                            <Card
                                                className={cn(
                                                    "rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl transition",
                                                    n.read ? "" : "ring-1 ring-primary/10"
                                                )}
                                            >
                                                <CardContent className="flex items-start gap-3 p-3 md:p-4">
                                                    <div
                                                        className={cn(
                                                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full p-2",
                                                            n.read ? "bg-muted/30" : "bg-primary/10"
                                                        )}
                                                    >
                                                        <Icon className={cn("h-5 w-5", n.read ? "text-muted-foreground" : "text-primary")} />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <p className="text-sm font-medium truncate">{n.title}</p>
                                                            <span className="text-[11px] text-muted-foreground">{n.time}</span>
                                                        </div>

                                                        <p className="mt-0.5 text-sm text-muted-foreground truncate">{n.text}</p>

                                                        <div className="mt-3 flex items-center gap-2">
                                                            {!n.read ? (
                                                                <Button size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={() => markRead(n.id)}>
                                                                    <Check className="mr-1 h-3.5 w-3.5" /> Dibaca
                                                                </Button>
                                                            ) : (
                                                                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => dismiss(n.id)}>
                                                                    <X className="mr-1 h-3.5 w-3.5" /> Hapus
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {/* Empty state */}
                        {notifications.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 text-center"
                            >
                                <div className="mx-auto max-w-xs rounded-2xl border border-dashed border-border/50 bg-card/50 backdrop-blur-md p-8">
                                    <p className="text-sm text-muted-foreground">Semua notifikasi sudah dibersihkan 🎉</p>
                                    <div className="mt-4 flex justify-center">
                                        <Link to="/client/dashboard">
                                            <Button size="sm">Kembali</Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </section>
                </div>
            </MotionConfig>
        </AnimatedPage>
    );
}
