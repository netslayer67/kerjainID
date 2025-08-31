import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Phone, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedPage from '@/components/AnimatedPage';
import { Helmet } from 'react-helmet';

const JobTrackingPage = () => {
    const steps = [
        { name: 'Diterima', completed: true },
        { name: 'Menuju Lokasi', completed: true },
        { name: 'Dalam Pengerjaan', completed: true },
        { name: 'Selesai', completed: false },
    ];

    return (
        <AnimatedPage>
            <Helmet>
                <title>Lacak Pekerjaan - Kerjain</title>
                <meta name="description" content="Lacak status pekerjaan Anda secara real-time di Kerjain." />
            </Helmet>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link to="/client/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Lacak Pekerjaan</h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="glassmorphic-card">
                            <CardHeader>
                                <CardTitle>Peta Lokasi Pekerja</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-black/30 rounded-lg flex items-center justify-center">
                                    <p className="text-white/50">Peta akan ditampilkan di sini</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="glassmorphic-card">
                            <CardHeader>
                                <CardTitle>Status Pengerjaan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between">
                                    {steps.map((step, index) => (
                                        <div key={step.name} className="flex-1 flex flex-col items-center relative">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step.completed ? 'bg-purple-500 border-purple-500' : 'border-white/30'}`}>
                                                {step.completed && <Check className="w-5 h-5 text-white" />}
                                            </div>
                                            <p className={`mt-2 text-sm ${step.completed ? 'font-semibold' : 'text-white/60'}`}>{step.name}</p>
                                            {index < steps.length - 1 && (
                                                <div className={`absolute top-4 left-1/2 w-full h-0.5 ${steps[index + 1].completed ? 'bg-purple-500' : 'bg-white/30'}`}></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <Card className="glassmorphic-card">
                            <CardHeader>
                                <CardTitle>Info Pekerja</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center font-bold text-2xl">
                                        B
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Budi Santoso</p>
                                        <div className="flex items-center gap-1 text-sm text-yellow-400">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span>4.9 (120 pekerjaan)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link to="/chat" className="w-full">
                                        <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20">
                                            <MessageSquare className="mr-2 h-4 w-4" /> Chat
                                        </Button>
                                    </Link>
                                    <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                                        <Phone className="mr-2 h-4 w-4" /> Telepon
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Link to="/job/123/rate">
                            <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 font-bold">
                                Selesaikan & Beri Rating
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default JobTrackingPage;