import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, Briefcase, Wallet, User, Bell, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { path: '/client/dashboard', icon: Home, label: 'Beranda' },
    { path: '/post-job', icon: Briefcase, label: 'Pekerjaan' },
    { path: '/wallet', icon: Wallet, label: 'Dompet' },
    { path: '/chat', icon: MessageSquare, label: 'Obrolan' },
    // { path: '/profile', icon: User, label: 'Profil' },
];

const AppLayout = () => {
    const location = useLocation();
    const isWorker = location.pathname.startsWith('/worker');

    const adjustedNavItems = navItems.map((item) =>
        item.path === '/client/dashboard' && isWorker
            ? { ...item, path: '/worker/dashboard' }
            : item
    );

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* ======= HEADER / TOP NAV ======= */}
            <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link
                        to={isWorker ? '/worker/dashboard' : '/client/dashboard'}
                        className="text-2xl font-bold tracking-tight text-primary hover:text-accent transition-colors"
                    >
                        Kerjain
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        {adjustedNavItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname.startsWith(item.path)
                                    ? 'bg-primary text-accent-foreground'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/notifications"
                            className="relative p-2 rounded-full hover:bg-secondary/30 transition-colors"
                        >
                            <Bell className="h-6 w-6 text-muted-foreground hover:text-accent transition-colors" />
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
                        </Link>
                        <Link to="/profile">
                            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground hover:opacity-90 transition">
                                U
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            {/* ======= MAIN ======= */}
            <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
                <Outlet />
            </main>

            {/* ======= MOBILE BOTTOM NAV ======= */}
            <footer className="sticky bottom-0 z-40 md:hidden">
                <nav className="mx-2 mb-2 bg-muted/60 backdrop-blur-xl border border-border rounded-2xl px-4 py-2 shadow-sm">
                    <ul className="flex justify-around items-center">
                        {adjustedNavItems.map((item) => {
                            const active = location.pathname.startsWith(item.path);
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${active
                                            ? 'text-accent'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                                            }`}
                                    >
                                        <item.icon className="text-primary h-6 w-6" />
                                        {/* <span className="text-[11px] font-medium">{item.label}</span> */}
                                        {active && (
                                            <motion.div
                                                layoutId="active-nav-indicator"
                                                className="h-1.5 w-1.5 bg-primary rounded-full mt-1"
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
