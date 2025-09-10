import React, { useMemo } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import {
    Home,
    Briefcase,
    Wallet,
    User,
    Bell,
    MessageSquare,
    ListChecks,
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= ROLE-BASED NAV ================= */
const navItemsClient = [
    { path: "/client/dashboard", icon: Home, label: "Beranda" },
    { path: "/post-job", icon: Briefcase, label: "Posting Job" },
    { path: "/client/wallet", icon: Wallet, label: "Dompet" },
    { path: "/worker/chat", icon: MessageSquare, label: "Obrolan" },
];

const navItemsWorker = [
    { path: "/worker/dashboard", icon: Home, label: "Beranda" },
    { path: "/worker/jobs", icon: ListChecks, label: "Tugas Saya" },
    { path: "/worker/wallet", icon: Wallet, label: "Dompet" },
    { path: "/worker/chat", icon: MessageSquare, label: "Obrolan" },
];

const AppLayout = () => {
    const location = useLocation();
    const isWorker = location.pathname.startsWith("/worker");

    const navItems = useMemo(
        () => (isWorker ? navItemsWorker : navItemsClient),
        [isWorker]
    );

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            {/* ======= HEADER ======= */}
            <header className="sticky top-0 z-40 border-b border-border/50 bg-background/50 backdrop-blur-xl backdrop-saturate-150">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    {/* Logo */}
                    <Link
                        to={isWorker ? "/worker/dashboard" : "/client/dashboard"}
                        className="text-xl font-bold tracking-tight text-primary transition-colors duration-300 hover:text-accent"
                    >
                        Kerjain
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => {
                            const active = location.pathname.startsWith(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300 ${active
                                            ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                                        }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right actions */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/notifications"
                            className="relative rounded-full p-2 transition-all duration-300 hover:bg-secondary/40"
                        >
                            <Bell className="h-6 w-6 text-muted-foreground transition-colors duration-300 hover:text-accent" />
                            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
                        </Link>
                        <Link to="/profile">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-bold text-primary-foreground transition duration-300 hover:opacity-90">
                                U
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            {/* ======= MAIN ======= */}
            <main className="container mx-auto flex-grow px-4 py-6 md:py-10">
                <Outlet />
            </main>

            {/* ======= MOBILE NAV ======= */}
            <footer className="sticky bottom-0 z-40 md:hidden">
                <nav className="mx-2 mb-2 rounded-2xl border border-border/50 bg-background/50 px-4 py-2 shadow-lg backdrop-blur-2xl backdrop-saturate-150">
                    <ul className="flex items-center justify-around">
                        {navItems.map((item) => {
                            const active = location.pathname.startsWith(item.path);
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-all duration-300 ${active
                                                ? "text-accent"
                                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                                            }`}
                                    >
                                        <item.icon
                                            className={`h-6 w-6 transition-colors duration-300 ${active ? "text-primary" : "text-muted-foreground"
                                                }`}
                                        />
                                        {active && (
                                            <motion.div
                                                layoutId="active-nav-indicator"
                                                className="mt-1 h-1.5 w-1.5 rounded-full bg-primary"
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </footer>
        </div>
    );
};

export default AppLayout;
