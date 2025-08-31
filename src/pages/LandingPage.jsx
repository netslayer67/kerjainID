import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Code, Hammer, Paintbrush, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedPage from '@/components/AnimatedPage';
import { Helmet } from 'react-helmet';

const featureCategories = [
    { icon: ShoppingCart, text: 'Urusan Harian' },
    { icon: Code, text: 'Jasa Digital' },
    { icon: Hammer, text: 'Tenaga Manual' },
    { icon: Paintbrush, text: 'Pekerjaan Kreatif' },
    { icon: PartyPopper, text: 'Bantuan Acara' },
];

const LandingPage = () => {
    return (
        <AnimatedPage>
            <Helmet>
                <title>Kerjain - Solusi Cepat Semua Kebutuhan Jasa Anda</title>
                <meta name="description" content="Selamat datang di Kerjain. Platform revolusioner yang menghubungkan Anda dengan penyedia jasa terdekat secara otomatis untuk segala kebutuhan." />
                <meta property="og:title" content="Kerjain - Solusi Cepat Semua Kebutuhan Jasa Anda" />
                <meta property="og:description" content="Platform revolusioner yang menghubungkan Anda dengan penyedia jasa terdekat secara otomatis untuk segala kebutuhan." />
            </Helmet>
            <div className="min-h-screen overflow-hidden bg-deep-indigo text-white">
                <header className="absolute top-0 left-0 right-0 z-10 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-3xl font-bold tracking-tighter">Kerjain</h1>
                        <Link to="/login">
                            <Button variant="outline" className="bg-transparent border-white/50 hover:bg-white/10">Masuk</Button>
                        </Link>
                    </div>
                </header>

                <main className="relative min-h-screen flex items-center justify-center text-center px-4">
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-indigo via-transparent to-deep-indigo z-0"></div>
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl animate-blob"></div>
                        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative z-10 space-y-6"
                    >
                        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                            Butuh Bantuan? <br /> Kerjain Aja.
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80">
                            Platform auto-matching untuk semua kebutuhan Anda, dari tugas harian hingga proyek besar. Cepat, andal, dan ada di ujung jari Anda.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/select-role">
                                <Button size="lg" className="w-full sm:w-auto bg-white text-deep-indigo hover:bg-gray-200 font-bold text-base group">
                                    Mulai Sekarang <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link to="/worker/dashboard">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white/50 hover:bg-white/10 font-bold text-base">
                                    Jadi Pekerja
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </main>

                <section className="py-20 px-4 relative z-10">
                    <div className="container mx-auto text-center">
                        <h3 className="text-4xl font-bold mb-4">Semua Jenis Pekerjaan</h3>
                        <p className="text-lg text-white/70 mb-12 max-w-3xl mx-auto">Dari membeli kopi hingga membangun website, temukan bantuan untuk apa pun yang Anda butuhkan.</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {featureCategories.map((cat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="glassmorphic-card p-6 flex flex-col items-center justify-center gap-4"
                                >
                                    <cat.icon className="w-10 h-10 text-purple-300" />
                                    <span className="font-semibold text-center">{cat.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="text-center py-8 border-t border-white/10">
                    <p className="text-white/50">&copy; {new Date().getFullYear()} Kerjain. Semua hak dilindungi.</p>
                </footer>
            </div>
        </AnimatedPage>
    );
};

export default LandingPage;