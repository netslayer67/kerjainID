// NotificationPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Wallet, Star, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

const initialNotifications = [
    {
        id: 1,
        icon: Wallet,
        title: "Pembayaran Berhasil",
        text: "Rp 150.000 dari Budi",
        time: "1 jam lalu",
        read: false,
    },
    {
        id: 2,
        icon: Star,
        title: "Rating Baru",
        text: "Budi memberi Anda ★★★★★",
        time: "2 jam lalu",
        read: false,
    },
    {
        id: 3,
        icon: Bell,
        title: "Promo",
        text: "Diskon 20% dengan kode HEMAT",
        time: "1 hari lalu",
        read: true,
    },
    {
        id: 4,
        icon: Wallet,
        title: "Penarikan Diproses",
        text: "Rp 200.000 sedang diproses",
        time: "2 hari lalu",
        read: true,
    },
];

const NotificationPage = () => {
    const [notifications, setNotifications] = useState(initialNotifications);

    const handleDismiss = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const handleMarkRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Notifikasi — Kerjain</title>
            </Helmet>

            <div className="relative mx-auto max-w-lg px-4 pb-16 pt-6 space-y-6">


                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between relative z-10"
                >
                    <div className="flex items-center gap-3">
                        <Link to={-1}>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-card/30 backdrop-blur-lg hover:bg-card/50"
                            >
                                <ArrowLeft className="h-5 w-5 text-foreground" />
                            </Button>
                        </Link>
                        <h1 className="text-lg font-semibold text-foreground">Notifikasi</h1>
                    </div>
                    <Button
                        variant="link"
                        className="text-primary text-sm"
                        onClick={() =>
                            setNotifications((prev) =>
                                prev.map((n) => ({ ...n, read: true }))
                            )
                        }
                    >
                        Tandai semua
                    </Button>
                </motion.div>

                {/* Notifications */}
                <div className="space-y-3 relative z-10">
                    <AnimatePresence>
                        {notifications.map((notif, i) => {
                            const Icon = notif.icon;
                            return (
                                <motion.div
                                    key={notif.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                >
                                    <motion.div
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        onDragEnd={(_, info) => {
                                            if (info.offset.x > 120) {
                                                handleMarkRead(notif.id);
                                            } else if (info.offset.x < -120) {
                                                handleDismiss(notif.id);
                                            }
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <Card
                                            className={`rounded-2xl border backdrop-blur-xl shadow-md transition-all ${notif.read
                                                ? "bg-card/30 border-border"
                                                : "bg-primary/10 border-primary/40"
                                                }`}
                                        >
                                            <CardContent className="flex items-start gap-4 p-4">
                                                <div
                                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${notif.read ? "bg-muted/30" : "bg-primary/20"
                                                        }`}
                                                >
                                                    <Icon
                                                        className={`h-5 w-5 ${notif.read
                                                            ? "text-muted-foreground"
                                                            : "text-primary"
                                                            }`}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate text-foreground">
                                                        {notif.title}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {notif.text}
                                                    </p>
                                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                                        {notif.time}
                                                    </p>
                                                </div>
                                                {!notif.read && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary"
                                                    />
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Empty state */}
                {notifications.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground pt-8">
                        Tidak ada notifikasi
                    </p>
                )}
            </div>
        </AnimatedPage>
    );
};

export default NotificationPage;
