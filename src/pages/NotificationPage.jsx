import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
    ArrowLeft,
    Wallet,
    Star,
    Bell,
    Check,
    Trash2,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";

// --- Example data (replace with hooks / API) ---
const initialNotifications = [
    { id: 1, icon: Wallet, title: "Pembayaran Berhasil", text: "Rp 150.000 dari Budi", time: "1 jam lalu", read: false },
    { id: 2, icon: Star, title: "Rating Baru", text: "Budi memberi Anda ★★★★★", time: "2 jam lalu", read: false },
    { id: 3, icon: Bell, title: "Promo", text: "Diskon 20% dengan kode HEMAT", time: "1 hari lalu", read: true },
    { id: 4, icon: Wallet, title: "Penarikan Diproses", text: "Rp 200.000 sedang diproses", time: "2 hari lalu", read: true },
];

const cn = (...c) => c.filter(Boolean).join(" ");

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
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

                    {/* Background accents: subtle grid + blobs */}
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(#00000010_1px,#0000_1px)] [background-size:18px_18px]" />
                        <motion.div aria-hidden initial={{ x: -80, y: -40 }} animate={{ x: [-80, 10, -40, -80] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-24 -left-20 h-60 w-60 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.24), transparent 60%)' }} />
                        <motion.div aria-hidden initial={{ x: 80, y: 60 }} animate={{ x: [80, -10, 60, 80] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[-4rem] right-[-3rem] h-72 w-72 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle at 70% 70%, hsl(var(--accent) / 0.28), transparent 60%)' }} />
                    </div>

                    {/* Header */}
                    <div className="relative z-10 mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link to={-1}>
                                <Button variant="ghost" size="icon" className="rounded-full bg-card/30 backdrop-blur-lg hover:bg-card/50">
                                    <ArrowLeft className="h-5 w-5 text-foreground" />
                                </Button>
                            </Link>

                            <div>
                                <h1 className="text-lg font-semibold text-foreground">Notifikasi</h1>
                                <p className="text-xs text-muted-foreground">Jangan sampai kelewatan update penting.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="hidden items-center gap-2 rounded-full px-2 py-1 md:flex" onClick={markAllRead}>
                                <Check className="h-4 w-4" /> <span className="text-xs">Tandai semua</span>
                            </Button>

                            <Button variant="ghost" size="icon" className="rounded-full bg-card/30 backdrop-blur-lg hover:bg-card/50" onClick={clearAll} aria-label="Bersihkan semua notifikasi">
                                <Trash2 className="h-4 w-4 text-foreground" />
                            </Button>
                        </div>
                    </div>

                    {/* Notifications list */}
                    <section className="space-y-3">
                        <AnimatePresence>
                            {notifications.map((n, i) => {
                                const Icon = n.icon;
                                return (
                                    <motion.div key={n.id} variants={itemVariants} initial="hidden" animate="enter" exit="exit" transition={{ duration: 0.32, delay: i * 0.03 }}>
                                        <motion.div
                                            drag="x"
                                            dragConstraints={{ left: 0, right: 0 }}
                                            dragElastic={0.18}
                                            onDragEnd={(_, info) => {
                                                const offset = info.offset.x;
                                                // swipe right -> mark read, swipe left -> dismiss
                                                if (offset > 110) markRead(n.id);
                                                else if (offset < -110) dismiss(n.id);
                                            }}
                                        >
                                            <Card className={cn("rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl transition", n.read ? "" : "ring-1 ring-primary/10")}>
                                                <CardContent className="flex items-start gap-3 p-3 md:p-4">
                                                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full p-2", n.read ? "bg-muted/30" : "bg-primary/10")}>
                                                        <Icon className={cn("h-5 w-5", n.read ? "text-muted-foreground" : "text-primary")} />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-3">
                                                            <p className="text-sm font-medium truncate text-foreground">{n.title}</p>
                                                            <div className="flex items-center gap-2">
                                                                {!n.read && <span className="hidden h-2 w-2 rounded-full bg-primary md:inline-block" aria-hidden />}
                                                                <span className="text-[11px] text-muted-foreground">{n.time}</span>
                                                            </div>
                                                        </div>

                                                        <p className="mt-1 text-sm text-muted-foreground truncate">{n.text}</p>

                                                        <div className="mt-3 flex items-center gap-2">
                                                            {!n.read ? (
                                                                <Button size="sm" className="!px-2" onClick={() => markRead(n.id)}>
                                                                    <Check className="mr-2 h-4 w-4" /> Tandai dibaca
                                                                </Button>
                                                            ) : (
                                                                <Button variant="ghost" size="sm" className="!px-2" onClick={() => dismiss(n.id)}>
                                                                    <X className="mr-2 h-4 w-4" /> Hapus
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

                        {notifications.length === 0 && (
                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-center">
                                <div className="mx-auto max-w-xs rounded-3xl border border-dashed border-border/60 bg-card/40 backdrop-blur-xl p-8">
                                    <p className="text-sm text-muted-foreground">Keren — semua notifikasi sudah dibersihin.</p>
                                    <div className="mt-4 flex justify-center">
                                        <Link to="/client/dashboard">
                                            <Button size="sm">Kembali ke Beranda</Button>
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
