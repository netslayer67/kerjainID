// ProfilePage.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    User,
    Shield,
    Bell,
    HelpCircle,
    LogOut,
    ChevronRight,
    Star,
    CheckCircle,
} from "lucide-react";
import { Helmet } from "react-helmet";

const MENU = [
    { key: "edit", icon: User, label: "Edit Profil", to: "/profile/edit" },
    { key: "security", icon: Shield, label: "Keamanan", to: "/profile/security" },
    { key: "notif", icon: Bell, label: "Notifikasi", to: "/notifications" },
    { key: "help", icon: HelpCircle, label: "Bantuan", to: "/help" },
];

const fmtShort = (v) =>
    new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(v);

export default function ProfilePage() {
    const reduce = useReducedMotion();

    const container = {
        hidden: { opacity: 0, y: 8 },
        show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: reduce ? 0 : 0.08 },
        },
    };
    const item = {
        hidden: { opacity: 0, y: 6 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    };

    // demo data (replace with props/state)
    const user = {
        name: "User Name",
        email: "user.name@email.com",
        initials: "U",
        completed: 128,
        rating: 4.8,
    };

    return (
        <>
            <Helmet>
                <title>Profil — Kerjain</title>
                <meta
                    name="description"
                    content="Profil — pengaturan dan informasi akun"
                />
            </Helmet>

            {/* background blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl"
                    animate={{ y: [0, 25, 0], scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 -right-28 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
                    animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
                />
            </div>

            <motion.main
                initial="hidden"
                animate="show"
                variants={container}
                className="relative min-h-dvh w-full px-4 pb-16 pt-6"
            >
                <div className="relative z-10 mx-auto max-w-md">
                    {/* Header */}
                    <motion.header
                        variants={item}
                        className="mb-6 flex items-center gap-3"
                    >
                        <Link
                            to={-1}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-card/40 border border-border backdrop-blur-md transition hover:bg-card/60"
                            aria-label="Kembali"
                        >
                            <ArrowLeft className="h-5 w-5 text-foreground/80" />
                        </Link>

                        <div className="flex-1">
                            <h1 className="text-lg font-semibold leading-tight text-foreground">
                                Profil
                            </h1>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                Akun & pengaturan
                            </p>
                        </div>
                    </motion.header>

                    {/* Profile card */}
                    <motion.section
                        variants={item}
                        className="rounded-2xl border border-border bg-card/60 backdrop-blur-xl p-4 shadow-xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-2xl font-bold text-white ring-1 ring-border">
                                {user.initials}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-semibold text-foreground truncate">
                                            {user.name}
                                        </p>
                                        <p className="mt-0.5 text-xs text-muted-foreground truncate">
                                            {user.email}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 rounded-xl bg-background/30 px-3 py-1">
                                        <Star className="h-4 w-4 text-yellow-400" />
                                        <span className="text-sm font-medium text-foreground">
                                            {user.rating}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-3 flex gap-3">
                                    <div className="flex items-center gap-2 rounded-xl bg-background/30 px-3 py-1">
                                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                                        <div className="text-xs text-foreground">
                                            <div className="font-semibold">
                                                {fmtShort(user.completed)}
                                            </div>
                                            <div className="text-[11px] text-muted-foreground">
                                                Selesai
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        to="/profile/edit"
                                        className="ml-auto inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Menu */}
                    <motion.nav variants={container} className="mt-6 space-y-3">
                        {MENU.map((m) => {
                            const Icon = m.icon;
                            return (
                                <motion.div key={m.key} variants={item}>
                                    <Link to={m.to} className="group block">
                                        <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card/40 backdrop-blur-xl px-4 py-3 transition hover:bg-card/60">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/30">
                                                    <Icon className="h-4 w-4 text-foreground/80" />
                                                </div>
                                                <p className="text-sm font-medium text-foreground truncate">
                                                    {m.label}
                                                </p>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.nav>

                    {/* Logout */}
                    <motion.div variants={item} className="mt-6">
                        <Link to="/logout" className="block">
                            <button
                                type="button"
                                className="w-full rounded-xl bg-destructive px-4 py-3 text-sm font-semibold text-destructive-foreground shadow-sm transition hover:scale-[0.995]"
                            >
                                <span className="inline-flex items-center justify-center gap-2">
                                    <LogOut className="h-4 w-4" /> Keluar
                                </span>
                            </button>
                        </Link>
                    </motion.div>

                    {/* Footer */}
                    <motion.footer
                        variants={item}
                        className="mt-5 text-center text-xs text-muted-foreground"
                        aria-hidden
                    >
                        Kerjain • © {new Date().getFullYear()}
                    </motion.footer>
                </div>
            </motion.main>
        </>
    );
}
