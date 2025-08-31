import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Password Tidak Cocok",
                description: "Pastikan password dan konfirmasi password sama.",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Store temporary user data for verification
            localStorage.setItem('temp_user_data', JSON.stringify(formData));

            toast({
                title: "Pendaftaran Berhasil! 🎉",
                description: "Silakan lanjutkan ke proses verifikasi."
            });

            navigate('/verification');
        } catch (error) {
            toast({
                title: "Pendaftaran Gagal",
                description: "Terjadi kesalahan. Silakan coba lagi.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSocialSignup = (provider) => {
        toast({
            title: "🚧 Fitur ini belum diimplementasikan—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀"
        });
    };

    return (
        <>
            <Helmet>
                <title>Daftar - Kerjain</title>
                <meta name="description" content="Daftar akun Kerjain gratis dan mulai menawarkan jasa atau mencari pekerja dengan sistem auto-matching terdepan." />
                <meta property="og:title" content="Daftar - Kerjain" />
                <meta property="og:description" content="Daftar akun Kerjain gratis dan mulai menawarkan jasa atau mencari pekerja dengan sistem auto-matching terdepan." />
            </Helmet>

            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Back Button */}
                    <Link to="/">
                        <Button variant="ghost" className="mb-6 text-white hover:bg-white/10">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali
                        </Button>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card>
                            <CardHeader className="text-center">
                                <div className="flex items-center justify-center space-x-2 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                                        <span className="text-white font-bold">K</span>
                                    </div>
                                    <span className="text-white font-bold text-2xl">Kerjain</span>
                                </div>
                                <CardTitle className="text-2xl font-bold text-white">
                                    Bergabung dengan Kerjain! 🚀
                                </CardTitle>
                                <p className="text-white/70">
                                    Daftar gratis dan mulai perjalanan kerja Anda
                                </p>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-white">Nama Lengkap</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Masukkan nama lengkap"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-white">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="nama@email.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-white">Nomor Telepon</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="+62812345678"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-white">Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Minimal 8 karakter"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="pl-10 pr-10"
                                                required
                                                minLength={8}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword" className="text-white">Konfirmasi Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                                            <Input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Ulangi password"
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                className="pl-10 pr-10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-2">
                                        <input type="checkbox" className="mt-1 rounded" required />
                                        <span className="text-sm text-white/70">
                                            Saya setuju dengan{' '}
                                            <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                                                Syarat & Ketentuan
                                            </Link>{' '}
                                            dan{' '}
                                            <Link to="/privacy" className="text-purple-400 hover:text-purple-300">
                                                Kebijakan Privasi
                                            </Link>
                                        </span>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                                        disabled={loading}
                                    >
                                        {loading ? "Memproses..." : "Daftar Sekarang"}
                                    </Button>
                                </form>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/20"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-transparent text-white/70">Atau daftar dengan</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleSocialSignup('google')}
                                        className="border-white/20 text-white hover:bg-white/10"
                                    >
                                        <img className="w-5 h-5 mr-2" alt="Google logo" src="https://images.unsplash.com/photo-1678483789111-3a04c4628bd6" />
                                        Google
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleSocialSignup('apple')}
                                        className="border-white/20 text-white hover:bg-white/10"
                                    >
                                        <img className="w-5 h-5 mr-2" alt="Apple logo" src="https://images.unsplash.com/photo-1620829868801-8a443f0370f3" />
                                        Apple
                                    </Button>
                                </div>

                                <div className="text-center">
                                    <span className="text-white/70">Sudah punya akun? </span>
                                    <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                                        Masuk di sini
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default SignupPage;