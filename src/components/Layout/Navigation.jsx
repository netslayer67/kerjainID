import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Home,
    Briefcase,
    MessageCircle,
    Wallet,
    User,
    Bell,
    LogOut,
    Settings
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

const Navigation = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogout = () => {
        logout();
        navigate('/');
        toast({
            title: "Berhasil Logout",
            description: "Sampai jumpa lagi! 👋"
        });
    };

    const navItems = [
        {
            icon: Home,
            label: 'Dashboard',
            path: user?.role === 'client' ? '/client' : '/worker'
        },
        {
            icon: Briefcase,
            label: 'Pekerjaan',
            path: user?.role === 'client' ? '/post-job' : '/worker'
        },
        {
            icon: MessageCircle,
            label: 'Chat',
            path: '/chat/general'
        },
        {
            icon: Wallet,
            label: 'Dompet',
            path: '/wallet'
        }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:bottom-auto">
            <div className="glass-dark border-t border-white/20 md:border-b md:border-t-0">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="hidden md:flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">K</span>
                            </div>
                            <span className="text-white font-bold text-xl">Kerjain</span>
                        </div>

                        {/* Navigation Items */}
                        <div className="flex items-center justify-around w-full md:w-auto md:space-x-8">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path ||
                                    (item.path.includes('/chat') && location.pathname.includes('/chat'));

                                return (
                                    <Link key={item.path} to={item.path}>
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-colors ${isActive
                                                    ? 'text-purple-400 bg-purple-500/20'
                                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span className="text-xs font-medium">{item.label}</span>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* User Menu */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate('/notifications')}
                                className="text-white hover:bg-white/10"
                            >
                                <Bell className="w-5 h-5" />
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user?.avatar} alt={user?.name} />
                                            <AvatarFallback>
                                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <div className="flex items-center justify-start gap-2 p-2">
                                        <div className="flex flex-col space-y-1 leading-none">
                                            <p className="font-medium">{user?.name}</p>
                                            <p className="w-[200px] truncate text-sm text-white/70">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profil</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate('/gamification')}>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Pengaturan</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;