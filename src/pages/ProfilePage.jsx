// ProfilePage.jsx
import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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

/**
 * Minimal, mobile-first Profile page
 * - Pure Tailwind utilities
 * - Framer Motion for subtle transitions
 * - Lucide icons
 */

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
        show: { opacity: 1, y: 0, transition: { staggerChildren: reduce ? 0 : 0.06 } },
    };
    const item = {
        hidden: { opacity: 0, y: 6 },
        show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } },
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
                <meta name="description" content="Profil — pengaturan dan informasi akun" />
            </Helmet>

            <motion.main
                initial="hidden"
                animate="show"
                variants={container}
                className="min-h-dvh w-full  px-4 pb-16 pt-6"
            >
                <div className="mx-auto max-w-lg">
                    {/* Header */}
                    <motion.header variants={item} className="mb-6 flex items-center gap-3">
                        <Link
                            to={-1}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/6 ring-1 ring-white/8 backdrop-blur transition hover:bg-white/10"
                            aria-label="Kembali"
                        >
                            <ArrowLeft className="h-5 w-5 text-white/85" />
                        </Link>

                        <div className="flex-1">
                            <h1 className="text-lg font-semibold leading-tight text-white">Profil</h1>
                            <p className="mt-0.5 text-xs text-white/50">Akun & pengaturan</p>
                        </div>

                        <Link to="/notifications" className="inline-flex items-center justify-center rounded-full p-2">
                            <Bell className="h-5 w-5 text-white/60" />
                        </Link>
                    </motion.header>

                    {/* Profile card */}
                    <motion.section
                        variants={item}
                        className="rounded-2xl border border-white/8 bg-white/4 p-4 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-2xl font-bold text-white/95 ring-1 ring-white/10">
                                {user.initials}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                                        <p className="mt-0.5 text-xs text-white/60 truncate">{user.email}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex shrink-0 items-center gap-2 rounded-xl bg-white/6 px-3 py-1">
                                            <Star className="h-4 w-4 text-yellow-300" />
                                            <span className="text-sm font-medium text-white/90">{user.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 flex gap-3">
                                    <div className="flex items-center gap-2 rounded-xl bg-white/6 px-3 py-1">
                                        <CheckCircle className="h-4 w-4 text-emerald-300" />
                                        <div className="text-xs text-white/80">
                                            <div className="font-semibold">{fmtShort(user.completed)}</div>
                                            <div className="text-[11px] text-white/60">Selesai</div>
                                        </div>
                                    </div>

                                    <Link
                                        to="/profile/edit"
                                        className="ml-auto inline-flex items-center gap-2 rounded-xl bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm hover:opacity-95"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Menu */}
                    <motion.nav variants={container} className="mt-6 space-y-3">
                        {MENU.map((m, i) => {
                            const Icon = m.icon;
                            return (
                                <motion.div key={m.key} variants={item}>
                                    <Link to={m.to} className="group block">
                                        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/6 bg-white/3 px-4 py-3 transition hover:bg-white/6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/6 text-white">
                                                    <Icon className="h-4 w-4 text-white/85" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-white truncate">{m.label}</p>
                                                    {/* intentionally minimal — add subtitle only when needed */}
                                                </div>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-white/50" />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.nav>

                    {/* Danger / Logout */}
                    <motion.div variants={item} className="mt-6">
                        <Link to="/logout" className="block">
                            <button
                                type="button"
                                className="w-full rounded-xl border border-transparent bg-rose-500/95 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:scale-[0.997]"
                            >
                                <span className="inline-flex items-center justify-center gap-2">
                                    <LogOut className="h-4 w-4" /> Keluar
                                </span>
                            </button>
                        </Link>
                    </motion.div>

                    {/* Small footer */}
                    <motion.footer
                        variants={item}
                        className="mt-5 text-center text-xs text-white/40"
                        aria-hidden
                    >
                        Kerjain • © {new Date().getFullYear()}
                    </motion.footer>
                </div>
            </motion.main>
        </>
    );
}
