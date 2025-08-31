import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimatedPage from '@/components/AnimatedPage';
import { Helmet } from 'react-helmet';

const faqItems = [
    { q: 'Bagaimana cara kerja auto-matching?', a: 'Sistem kami secara otomatis mencocokkan pekerjaan Anda dengan pekerja terdekat yang memiliki kualifikasi terbaik.' },
    { q: 'Bagaimana sistem komisi bekerja?', a: 'Kami memotong komisi 11% dari total bayaran setiap pekerjaan yang diselesaikan.' },
    { q: 'Apakah pembayaran tunai aman?', a: 'Ya, namun kami tetap mencatatnya di sistem. Pastikan Anda membayar sesuai nominal dan menekan tombol "Selesai" di aplikasi.' },
    { q: 'Bagaimana jika saya memiliki masalah dengan pekerjaan?', a: 'Anda dapat mengajukan sengketa melalui halaman "Laporkan Masalah" dan tim kami akan membantu.' },
];

const HelpCenterPage = () => {
    return (
        <AnimatedPage>
            <Helmet>
                <title>Pusat Bantuan - Kerjain</title>
                <meta name="description" content="Temukan jawaban atas pertanyaan Anda tentang Kerjain di pusat bantuan kami." />
            </Helmet>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link to={-1}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Pusat Bantuan</h1>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                    <Input placeholder="Cari bantuan..." className="pl-10 bg-white/10 border-white/20" />
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Pertanyaan Umum (FAQ)</h2>
                    <div className="space-y-2">
                        {faqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                            >
                                <details className="group glassmorphic-card p-4 rounded-lg">
                                    <summary className="flex items-center justify-between cursor-pointer font-semibold">
                                        {item.q}
                                        <ChevronRight className="w-5 h-5 text-white/50 transition-transform group-open:rotate-90" />
                                    </summary>
                                    <p className="mt-2 text-white/80">{item.a}</p>
                                </details>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center glassmorphic-card p-6">
                    <h3 className="text-xl font-semibold">Tidak menemukan jawaban?</h3>
                    <p className="text-white/70 my-2">Hubungi tim support kami untuk bantuan lebih lanjut.</p>
                    <Button className="mt-2 bg-white text-deep-indigo font-bold hover:bg-gray-200">Hubungi Support</Button>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default HelpCenterPage;