import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, Briefcase, Wallet, User, Bell, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { path: '/client/dashboard', icon: Home, label: 'Beranda' },
    { path: '/post-job', icon: Briefcase, label: 'Pekerjaan' },
    { path: '/wallet', icon: Wallet, label: 'Dompet' },
    { path: '/chat', icon: MessageSquare, label: 'Obrolan' },
    { path: '/profile', icon: User, label: 'Profil' },
];

const AppLayout = () => {
    const location = useLocation();

    const isWorker = location.pathname.startsWith('/worker');
    const adjustedNavItems = navItems.map(item => {
        if (item.path === '/client/dashboard' && isWorker) {
            return { ...item, path: '/worker/dashboard' };
        }
        return item;
    });

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link
                        to={isWorker ? "/worker/dashboard" : "/client/dashboard"}
                        className="text-2xl font-bold tracking-tighter"
                    >
                        Kerjain
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/notifications">
                            <Bell className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
                        </Link>
                        <Link to="/profile">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground">
                                U
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>

            <footer className="sticky bottom-0 z-40 mt-auto">
                <div className="md:hidden p-2">
                    <nav className="bg-muted/50 backdrop-blur-lg border border-border rounded-2xl px-4 py-2">
                        <ul className="flex justify-around items-center">
                            {adjustedNavItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className="flex flex-col items-center gap-1 p-2 rounded-lg"
                                    >
                                        <item.icon
                                            className={`h-6 w-6 transition-colors ${location.pathname.startsWith(item.path)
                                                ? "text-foreground"
                                                : "text-muted-foreground"
                                                }`}
                                        />
                                        {location.pathname.startsWith(item.path) && (
                                            <motion.div
                                                layoutId="active-nav-indicator"
                                                className="h-1 w-1 bg-foreground rounded-full"
                                            />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </footer>
        </div>

    );
};

export default AppLayout;