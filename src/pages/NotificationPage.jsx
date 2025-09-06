// src/pages/NotificationPage.jsx
import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import { ArrowLeft, Wallet, Star, Bell, Check, Trash2, X, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";

/**
 * Sample data (replace with API)
 */
const initialNotifications = [
    { id: 1, icon: Wallet, title: "Pembayaran berhasil", text: "Rp 150.000 dari Budi", time: "1 jam lalu", read: false },
    { id: 2, icon: Star, title: "Rating baru", text: "Budi memberi Anda ★★★★★", time: "2 jam lalu", read: false },
    { id: 3, icon: Bell, title: "Promo spesial", text: "Diskon 20% pakai kode HEMAT", time: "1 hari lalu", read: true },
    { id: 4, icon: Wallet, title: "Penarikan diproses", text: "Rp 200.000 sedang diproses", time: "2 hari lalu", read: true },
];

/* small helper */
const cn = (...c) => c.filter(Boolean).join(" ");

const listVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemMotion = (reduced) => ({
    hidden: { opacity: 0, y: reduced ? 0 : 8 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.32 } },
    exit: { opacity: 0, x: -60, transition: { duration: 0.28 } },
});

/* ---------------- NotificationItem (memoized) ---------------- */
const NotificationItem = React.memo(function NotificationItem({
    n,
    onMarkRead,
    onDismiss,
    reduceMotion,
}) {
    const Icon = n.icon || BellRing;

    return (
        <motion.div
            layout
            variants={itemMotion(reduceMotion)}
            initial="hidden"
            animate="enter"
            exit="exit"
            className="relative"
        >
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                    const dx = info.offset.x;
                    if (dx > 120) onMarkRead(n.id);
                    else if (dx < -120) onDismiss(n.id);
                }}
            >
                <Card
                    className={cn(
                        "rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(.2,.9,.2,1)]",
                        n.read ? "opacity-85 hover:opacity-95" : "ring-1 ring-primary/20 shadow-sm"
                    )}
                    role="article"
                    aria-live={n.read ? "polite" : "assertive"}
                >
                    <CardContent className="flex items-start gap-3 p-4">
                        {/* icon */}
                        <div
                            className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                                n.read ? "bg-secondary/20 text-muted-foreground" : "bg-primary/10 text-primary"
                            )}
                            aria-hidden
                        >
                            <Icon className="h-5 w-5" />
                        </div>

                        {/* main */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                                    <p className="mt-1 truncate text-xs text-muted-foreground">{n.text}</p>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <time className="text-[11px] text-muted-foreground" aria-hidden>
                                        {n.time}
                                    </time>

                                    {/* unread dot */}
                                    {!n.read ? (
                                        <span className="inline-flex h-2 w-2 rounded-full bg-accent ring-2 ring-card/40" aria-hidden />
                                    ) : null}
                                </div>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                {!n.read ? (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 px-2 text-xs transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
                                        onClick={() => onMarkRead(n.id)}
                                        aria-label={`Tandai notifikasi ${n.title} sebagai dibaca`}
                                    >
                                        <Check className="mr-1 h-3.5 w-3.5" /> Dibaca
                                    </Button>
                                ) : (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 px-2 text-xs transition-colors duration-300 hover:text-destructive"
                                        onClick={() => onDismiss(n.id)}
                                        aria-label={`Hapus notifikasi ${n.title}`}
                                    >
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
});
/* ---------------------------------------------------------------- */

export default function NotificationPage() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const reduceMotion = useReducedMotion();

    const dismiss = useCallback((id) => setNotifications((s) => s.filter((n) => n.id !== id)), []);
    const markRead = useCallback((id) => setNotifications((s) => s.map((n) => (n.id === id ? { ...n, read: true } : n))), []);
    const markAllRead = useCallback(() => setNotifications((s) => s.map((n) => ({ ...n, read: true }))), []);
    const clearAll = useCallback(() => setNotifications([]), []);

    const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications.length, notifications]);

    return (
        <AnimatedPage>
            <Helmet>
                <title>Notifikasi — Kerjain</title>
            </Helmet>

            <MotionConfig reducedMotion="user">
                <div className="relative mx-auto max-w-lg px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                    {/* header */}
                    <header className="relative z-10 mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link to={-1} aria-label="Kembali">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full bg-card/30 backdrop-blur-md hover:bg-card/50 transition-colors duration-300"
                                >
                                    <ArrowLeft className="h-5 w-5 text-foreground" />
                                </Button>
                            </Link>

                            <div>
                                <h1 className="text-lg font-semibold text-foreground">Notifikasi</h1>
                                <p className="text-xs text-muted-foreground">Tetap terupdate — geser untuk aksi cepat.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="hidden md:flex items-center gap-3">
                                <span className="text-xs text-muted-foreground">Belum dibaca</span>
                                <div className="inline-flex items-center rounded-full bg-card/40 px-3 py-1 text-sm font-medium text-foreground ring-1 ring-border/40">
                                    <Bell className="h-4 w-4 mr-2 text-accent" />
                                    <span>{unreadCount}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hidden md:inline-flex items-center gap-2 rounded-full px-2 py-1 transition-colors duration-300 hover:bg-accent/10 hover:text-accent"
                                    onClick={markAllRead}
                                    aria-label="Tandai semua notifikasi sebagai dibaca"
                                >
                                    <Check className="h-4 w-4" />
                                    <span className="text-xs">Tandai semua</span>
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full bg-card/30 backdrop-blur-md hover:bg-card/50 transition-colors duration-300"
                                    onClick={clearAll}
                                    aria-label="Bersihkan semua notifikasi"
                                >
                                    <Trash2 className="h-4 w-4 text-foreground" />
                                </Button>
                            </div>
                        </div>
                    </header>

                    {/* list */}
                    <motion.section
                        initial="hidden"
                        animate="show"
                        variants={listVariants}
                        className="space-y-3"
                    >
                        <AnimatePresence>
                            {notifications.length > 0 ? (
                                notifications.map((n) => (
                                    <NotificationItem
                                        key={n.id}
                                        n={n}
                                        onMarkRead={markRead}
                                        onDismiss={dismiss}
                                        reduceMotion={reduceMotion}
                                    />
                                ))
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className="mt-8 text-center"
                                >
                                    <div className="mx-auto max-w-xs rounded-2xl border border-dashed border-border/50 bg-card/50 backdrop-blur-md p-8">
                                        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-3">
                                            <BellRing className="h-6 w-6" />
                                        </div>
                                        <p className="text-sm font-medium text-foreground">Semua notifikasi sudah dibersihkan 🎉</p>
                                        <p className="mt-2 text-xs text-muted-foreground">Tidak ada notifikasi terbaru.</p>

                                        <div className="mt-4 flex justify-center">
                                            <Link to="/client/dashboard">
                                                <Button size="sm" className="rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
                                                    Kembali ke Beranda
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.section>
                </div>
            </MotionConfig>
        </AnimatedPage>
    );
}
