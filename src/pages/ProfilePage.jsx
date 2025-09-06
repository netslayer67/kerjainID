// ProfilePage.jsx
import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
    ArrowLeft,
    User,
    UserCog,
    Shield,
    Bell,
    HelpCircle,
    LogOut,
    ChevronRight,
    Star,
    CheckCircle,
    Award,
    Wallet,
    Gift,
} from "lucide-react";
import { Helmet } from "react-helmet";

/**
 * Lightweight profile page — redesigned:
 * - cleaner layout
 * - accent-aware hover + smooth transitions (300-350ms)
 * - role toggle (Client ↔ Worker) under "Bantuan"
 * - reduced motion aware
 */

/* Menu definition (icons only; labels minimal) */
const MENU = [
    { key: "edit", icon: User, label: "Edit Profil", to: "/profile/edit" },
    { key: "security", icon: Shield, label: "Keamanan", to: "/profile/security" },
    { key: "notif", icon: Bell, label: "Notifikasi", to: "/notifications" },
    { key: "help", icon: HelpCircle, label: "Bantuan", to: "/help" },
];

const fmtShort = (v) =>
    new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(v || 0);

const getBadge = (completed) => {
    if (completed >= 200) return { label: "Gold", color: "from-yellow-400 to-amber-500" };
    if (completed >= 100) return { label: "Silver", color: "from-gray-300 to-gray-400" };
    return { label: "Bronze", color: "from-amber-600 to-amber-700" };
};

export default function ProfilePage() {
    const navigate = useNavigate();
    const reduce = useReducedMotion();
    const [role, setRole] = useState("worker"); // client | worker

    const user = useMemo(
        () => ({
            name: "User Name",
            email: "user.name@email.com",
            initials: "U",
            completed: 128,
            rating: 4.8,
        }),
        []
    );

    const badge = getBadge(user.completed);

    const container = {
        hidden: { opacity: 0, y: 8 },
        show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: reduce ? 0 : 0.04 },
        },
    };
    const item = {
        hidden: { opacity: 0, y: 6 },
        show: { opacity: 1, y: 0, transition: { duration: 0.33, ease: "easeOut" } },
    };

    return (
        <>
            <Helmet>
                <title>Profil — Kerjain</title>
            </Helmet>

            <motion.main
                initial="hidden"
                animate="show"
                variants={container}
                className="relative min-h-dvh w-full px-4 pb-12 pt-6"
            >
                <div className="mx-auto max-w-md">
                    {/* Header */}
                    <motion.header variants={item} className="mb-6 flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            aria-label="Kembali"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/40 backdrop-blur-md hover:bg-accent hover:text-accent-foreground transition-colors duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>

                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg font-semibold text-foreground">Profil</h1>
                            <p className="mt-0.5 text-xs text-muted-foreground">Ringkasan akun</p>
                        </div>
                    </motion.header>

                    {/* Profile Card */}
                    <motion.section
                        variants={item}
                        className="rounded-2xl border border-border bg-card/60 backdrop-blur-xl p-5 shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div
                                className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full
                           bg-gradient-to-br from-primary to-accent text-2xl font-semibold text-primary-foreground
                           ring-1 ring-accent/30 shadow-sm overflow-hidden"
                                aria-hidden
                            >
                                {user.initials}
                                <span
                                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                             transition-opacity duration-[350ms]"
                                    aria-hidden
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="text-base font-semibold text-foreground truncate">{user.name}</p>

                                    <div
                                        className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] uppercase tracking-wide font-medium text-white shadow-sm bg-gradient-to-r ${badge.color}`}
                                        aria-hidden
                                    >
                                        <Award className="h-3.5 w-3.5" />
                                        {badge.label}
                                    </div>
                                </div>

                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>

                                <div className="mt-3 flex gap-3">
                                    <div className="flex items-center gap-1.5 rounded-lg bg-secondary/30 px-2.5 py-1">
                                        <Star className="h-4 w-4 text-yellow-400" />
                                        <span className="text-sm font-medium">{user.rating}</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 rounded-lg bg-secondary/30 px-2.5 py-1">
                                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                                        <span className="text-xs">
                                            {fmtShort(user.completed)} <span className="text-muted-foreground">Selesai</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Menu */}
                    <motion.nav variants={container} className="mt-6 space-y-3" aria-label="Profil menu">
                        {MENU.map((m) => {
                            const Icon = m.icon;
                            return (
                                <motion.div key={m.key} variants={item}>
                                    <Link to={m.to} className="group block">
                                        <div
                                            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card/40 px-4 py-3 backdrop-blur-xl
                                 transition-colors duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-accent hover:bg-accent/8"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/30">
                                                    <Icon className="h-4 w-4 text-foreground/80" />
                                                </div>
                                                <p className="text-sm font-medium text-foreground truncate">{m.label}</p>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent" />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}

                        {/* Role toggle block — placed after "Bantuan" visually (below menu list) */}
                        <motion.div variants={item} className="pt-1">
                            <div
                                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card/40 px-4 py-3 backdrop-blur-xl
                           transition-colors duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/30">
                                        <UserCog className="h-4 w-4 text-foreground/80" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Switch Role</p>
                                        <p className="text-xs text-muted-foreground">Pindah role kamu</p>
                                    </div>
                                </div>

                                {/* Toggle switch */}
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground ">{role === "client" ? "Client" : "Worker"}</span>

                                    <button
                                        role="switch"
                                        aria-checked={role === "worker"}
                                        onClick={() => setRole((r) => (r === "client" ? "worker" : "client"))}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-[350ms] focus:outline-none
                                ${role === "worker" ? "bg-accent" : "bg-muted/40"} ring-1 ring-border`}
                                        aria-label="Toggle peran client atau worker"
                                    >
                                        <span
                                            className={`inline-block h-5 w-5 transform rounded-full bg-card-foreground shadow-sm transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                                  ${role === "worker" ? "translate-x-5" : "translate-x-0"}`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.nav>

                    {/* Quick Actions */}
                    <motion.div variants={item} className="mt-6 grid gap-3">
                        <Link to="/wallet" className="block">
                            <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card/40 px-4 py-3 backdrop-blur-xl transition-colors duration-[350ms] hover:border-accent hover:bg-accent/8">
                                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                    <Wallet className="h-4 w-4 text-accent" />
                                    Dompet
                                </div>
                                <div className="text-xs text-muted-foreground">Saldo & Top up</div>
                            </div>
                        </Link>

                        <Link to="/referral" className="block">
                            <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card/40 px-4 py-3 backdrop-blur-xl transition-colors duration-[350ms] hover:border-primary hover:bg-primary/8">
                                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                    <Gift className="h-4 w-4 text-primary" />
                                    Undang Teman
                                </div>
                                <div className="text-xs text-muted-foreground">Dapat Poin</div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Logout */}
                    <motion.div variants={item} className="mt-6">
                        <button
                            type="button"
                            className="w-full rounded-xl bg-destructive/90 px-4 py-3 text-sm font-semibold text-destructive-foreground shadow-sm transition-all duration-[350ms] hover:bg-destructive/100 focus:ring-2 focus:ring-offset-2 focus:ring-destructive"
                        >
                            <span className="inline-flex items-center gap-2 justify-center">
                                <LogOut className="h-4 w-4" /> Keluar
                            </span>
                        </button>
                    </motion.div>

                    <motion.footer variants={item} className="mt-6 text-center text-xs text-muted-foreground" aria-hidden>
                        Kerjain • © {new Date().getFullYear()}
                    </motion.footer>
                </div>
            </motion.main>
        </>
    );
}
