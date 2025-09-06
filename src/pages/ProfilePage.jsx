// src/pages/ProfilePage.jsx
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
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
    Moon,
    Sun,
} from "lucide-react";
import { Helmet } from "react-helmet";
import ThemeToggle from "../components/ThemeToggle"; // gunakan komponen yang sudah ada

// minimal polite labels (Indo)
const MENU = [
    { key: "edit", icon: User, label: "Edit Profil", to: "/profile/edit" },
    { key: "security", icon: Shield, label: "Keamanan", to: "/profile/security" },
    { key: "notif", icon: Bell, label: "Notifikasi", to: "/notifications" },
    { key: "help", icon: HelpCircle, label: "Bantuan", to: "/help" },
];

const fmtShort = (v) =>
    new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(v || 0);

export default function ProfilePage() {
    const navigate = useNavigate();
    const reduce = useReducedMotion();

    // demo data — nanti ganti dari context / api
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

    // motion variants: simple & respectful of reduced motion
    const container = {
        hidden: { opacity: 0, y: 6 },
        show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: reduce ? 0 : 0.06 },
        },
    };
    const item = {
        hidden: { opacity: 0, y: 6 },
        show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: "easeOut" } },
    };

    return (
        <>
            <Helmet>
                <title>Profil — Kerjain</title>
                <meta
                    name="description"
                    content="Profil dan pengaturan akun Kerjain — data singkat & preferensi"
                />
            </Helmet>

            {/* soft background blobs (decorative) */}
            <div
                aria-hidden
                className="absolute inset-0 -z-10 overflow-hidden"
            >
                <motion.div
                    aria-hidden
                    className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
                    animate={reduce ? undefined : { y: [0, 18, 0], scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden
                    className="absolute bottom-0 -right-24 w-72 h-72 rounded-full bg-accent/20 blur-3xl"
                    animate={reduce ? undefined : { y: [0, -22, 0], scale: [1, 1.06, 1] }}
                    transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
                />
            </div>

            <motion.main
                initial="hidden"
                animate="show"
                variants={container}
                className="relative min-h-dvh w-full px-4 pb-12 pt-6"
            >
                <div className="mx-auto max-w-md">
                    {/* Header */}
                    <motion.header variants={item} className="mb-5 flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            aria-label="Kembali"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-card/30 border border-border backdrop-blur-md transition hover:bg-card/60"
                        >
                            <ArrowLeft className="h-5 w-5 text-foreground/80" />
                        </button>

                        <div className="flex-1">
                            <h1 className="text-lg font-semibold leading-tight text-foreground">
                                Profil
                            </h1>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                Akun & preferensi singkat
                            </p>
                        </div>
                    </motion.header>

                    {/* Profile card */}
                    <motion.section
                        variants={item}
                        className="rounded-2xl border border-border bg-card/60 backdrop-blur-xl p-4 shadow-sm"
                        aria-labelledby="profile-heading"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                aria-hidden={false}
                                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-2xl font-semibold text-primary-foreground ring-1 ring-border"
                                title={user.name}
                            >
                                {user.initials}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p id="profile-heading" className="text-sm font-semibold text-foreground truncate">
                                            {user.name}
                                        </p>
                                        <p className="mt-0.5 text-xs text-muted-foreground truncate">
                                            {user.email}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 rounded-xl bg-background/20 px-3 py-1">
                                        <Star className="h-4 w-4 text-yellow-400" />
                                        <span className="text-sm font-medium text-foreground">
                                            {user.rating}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-3 flex gap-3">
                                    <div className="flex items-center gap-2 rounded-xl bg-background/20 px-3 py-1">
                                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                                        <div className="text-xs text-foreground">
                                            <div className="font-semibold">{fmtShort(user.completed)}</div>
                                            <div className="text-[11px] text-muted-foreground">Selesai</div>
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

                    {/* Menu group */}
                    <motion.nav
                        variants={container}
                        className="mt-6 space-y-3"
                        aria-label="Profil menu"
                    >
                        {MENU.map((m) => {
                            const Icon = m.icon;
                            return (
                                <motion.div key={m.key} variants={item}>
                                    <Link to={m.to} className="group block">
                                        <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card/40 backdrop-blur-xl px-4 py-3 transition hover:bg-card/60">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/30">
                                                    <Icon className="h-4 w-4 text-foreground/80" aria-hidden />
                                                </div>
                                                <p className="text-sm font-medium text-foreground truncate">
                                                    {m.label}
                                                </p>
                                            </div>

                                            <ChevronRight className="h-5 w-5 text-muted-foreground" aria-hidden />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}


                    </motion.nav>

                    {/* Small actions */}
                    <motion.div variants={item} className="mt-5 grid gap-3">
                        <Link to="/wallet" className="block">
                            <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card/40 backdrop-blur-xl px-4 py-3 transition hover:bg-card/60">
                                <div className="text-sm text-foreground">Dompet saya</div>
                                <div className="text-xs text-muted-foreground">Saldo & top up</div>
                            </div>
                        </Link>

                        <Link to="/referral" className="block">
                            <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card/40 backdrop-blur-xl px-4 py-3 transition hover:bg-card/60">
                                <div className="text-sm text-foreground">Undang teman</div>
                                <div className="text-xs text-muted-foreground">Dapat poin</div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Logout */}
                    <motion.div variants={item} className="mt-6">
                        <Link to="/logout" className="block" aria-label="Keluar">
                            <button
                                type="button"
                                className="w-full rounded-xl bg-destructive px-4 py-3 text-sm font-semibold text-destructive-foreground shadow-sm transition hover:scale-[0.995]"
                            >
                                <span className="inline-flex items-center justify-center gap-2">
                                    <LogOut className="h-4 w-4" aria-hidden /> Keluar
                                </span>
                            </button>
                        </Link>
                    </motion.div>

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
