// NotificationPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Wallet,
    Star,
    Bell,
    Check,
    X,
} from "lucide-react";
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
            prev.map((n) =>
                n.id === id ? { ...n, read: true } : n
            )
        );
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Notifikasi — Kerjain</title>
            </Helmet>

            <div className="mx-auto max-w-lg space-y-6 px-4 pb-16 pt-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to={-1}>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <h1 className="text-lg font-semibold">Notifikasi</h1>
                    </div>
                    <Button
                        variant="link"
                        className="text-purple-300 text-sm"
                        onClick={() =>
                            setNotifications((prev) =>
                                prev.map((n) => ({ ...n, read: true }))
                            )
                        }
                    >
                        Tandai semua
                    </Button>
                </div>

                {/* Notifications */}
                <div className="space-y-3">
                    <AnimatePresence>
                        {notifications.map((notif) => {
                            const Icon = notif.icon;
                            return (
                                <motion.div
                                    key={notif.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.25 }}
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
                                        className={`cursor-pointer`}
                                    >
                                        <Card
                                            className={`overflow-hidden transition-colors ${notif.read
                                                    ? "bg-white/5 border-white/10"
                                                    : "bg-white/10 border-purple-400/30"
                                                }`}
                                        >
                                            <CardContent className="flex items-start gap-4 p-4">
                                                <div
                                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${notif.read ? "bg-white/10" : "bg-purple-500/20"
                                                        }`}
                                                >
                                                    <Icon
                                                        className={`h-5 w-5 ${notif.read
                                                                ? "text-white/50"
                                                                : "text-purple-300"
                                                            }`}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">
                                                        {notif.title}
                                                    </p>
                                                    <p className="text-xs text-white/70 truncate">
                                                        {notif.text}
                                                    </p>
                                                    <p className="mt-1 text-[11px] text-white/50">
                                                        {notif.time}
                                                    </p>
                                                </div>
                                                {!notif.read && (
                                                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-purple-400" />
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {notifications.length === 0 && (
                    <p className="text-center text-sm text-white/60 pt-8">
                        Tidak ada notifikasi
                    </p>
                )}
            </div>
        </AnimatedPage>
    );
};

export default NotificationPage;
