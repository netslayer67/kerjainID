import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Key, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AnimatedPage from '@/components/AnimatedPage';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';

const LoginPage = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        toast({
            title: "Login Berhasil!",
            description: "Mengalihkan ke pemilihan peran...",
        });
        setTimeout(() => navigate('/select-role'), 1500);
    };

    const handleSocialLogin = (provider) => {
        toast({
            title: `🚧 Fitur Login ${provider} Belum Tersedia`,
            description: "Fitur ini belum diimplementasikan. Anda dapat memintanya di prompt berikutnya! 🚀",
        });
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Masuk - Kerjain</title>
                <meta name="description" content="Masuk ke akun Kerjain Anda untuk mulai mencari atau menawarkan jasa." />
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-deep-indigo p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="glassmorphic-card p-8 space-y-6">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-white">Selamat Datang Kembali</h1>
                            <p className="text-white/70">Masuk untuk melanjutkan</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                    <Input id="email" type="email" placeholder="anda@email.com" className="pl-10 bg-white/5 border-white/20 focus:ring-purple-500" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Kata Sandi</Label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                    <Input id="password" type="password" placeholder="••••••••" className="pl-10 bg-white/5 border-white/20 focus:ring-purple-500" required />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-white text-deep-indigo font-bold hover:bg-gray-200 group">
                                Masuk <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/20" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white/10 px-2 text-white/70">Atau lanjutkan dengan</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="bg-white/5 border-white/20 hover:bg-white/10" onClick={() => handleSocialLogin('Google')}>
                                Google
                            </Button>
                            <Button variant="outline" className="bg-white/5 border-white/20 hover:bg-white/10" onClick={() => handleSocialLogin('Apple')}>
                                Apple
                            </Button>
                        </div>

                        <p className="text-center text-sm text-white/70">
                            Belum punya akun?{' '}
                            <Link to="/verify" className="font-semibold text-purple-300 hover:underline">
                                Daftar
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default LoginPage;