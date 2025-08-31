import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, ShoppingCart, Code, Hammer, Paintbrush, PartyPopper, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedPage from '@/components/AnimatedPage';
import { Helmet } from 'react-helmet';

const categories = [
    { name: 'Urusan Harian', icon: ShoppingCart },
    { name: 'Jasa Digital', icon: Code },
    { name: 'Tenaga Manual', icon: Hammer },
    { name: 'Kreatif', icon: Paintbrush },
    { name: 'Bantuan Acara', icon: PartyPopper },
];

const activeJobs = [
    { id: 1, title: 'Bersihkan Taman Belakang', worker: 'Budi S.', status: 'Dalam Pengerjaan', progress: 60 },
    { id: 2, title: 'Desain Logo untuk Startup', worker: 'Citra L.', status: 'Menunggu Review', progress: 100 },
];

const ClientDashboard = () => {
    return (
        <AnimatedPage>
            <Helmet>
                <title>Dashboard Klien - Kerjain</title>
                <meta name="description" content="Kelola pekerjaan Anda, posting pekerjaan baru, dan lihat riwayat pekerjaan sebagai klien di Kerjain." />
            </Helmet>
            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glassmorphic-card p-6 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                    <div>
                        <h1 className="text-3xl font-bold">Selamat Datang, User!</h1>
                        <p className="text-white/70">Siap untuk menyelesaikan sesuatu hari ini?</p>
                    </div>
                    <Link to="/post-job">
                        <Button size="lg" className="bg-white text-deep-indigo font-bold hover:bg-gray-200 group w-full md:w-auto">
                            <Plus className="mr-2 h-5 w-5" />
                            Posting Pekerjaan Baru
                        </Button>
                    </Link>
                </motion.div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Pilih Kategori</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Card className="bg-white/5 border-white/20 hover:bg-white/10 transition-colors cursor-pointer text-center p-4">
                                    <CardContent className="p-0 flex flex-col items-center gap-2">
                                        <category.icon className="w-8 h-8 text-purple-300" />
                                        <p className="font-semibold text-sm">{category.name}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Pekerjaan Aktif</h2>
                    {activeJobs.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-4">
                            {activeJobs.map((job) => (
                                <Link to={`/job/${job.id}/track`} key={job.id}>
                                    <Card className="bg-white/5 border-white/20 hover:bg-white/10 transition-colors">
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-start">
                                                <span>{job.title}</span>
                                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${job.status === 'Dalam Pengerjaan' ? 'bg-blue-500/20 text-blue-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                                                    {job.status}
                                                </span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <p className="text-sm text-white/70">Pekerja: {job.worker}</p>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium text-white/80">Progress</span>
                                                    <span className="text-sm font-medium text-white/80">{job.progress}%</span>
                                                </div>
                                                <div className="w-full bg-white/10 rounded-full h-2.5">
                                                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${job.progress}%` }}></div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 glassmorphic-card">
                            <p className="text-white/70">Anda tidak memiliki pekerjaan aktif saat ini.</p>
                        </div>
                    )}
                </div>
            </div>
        </AnimatedPage>
    );
};

export default ClientDashboard;