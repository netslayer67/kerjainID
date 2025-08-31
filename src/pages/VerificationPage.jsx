import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, Camera, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedPage from '@/components/AnimatedPage';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';

const VerificationPage = () => {
    const [step, setStep] = useState(1);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleAction = (actionType) => {
        toast({
            title: `🚧 Fitur ${actionType} Belum Tersedia`,
            description: "Fitur ini belum diimplementasikan. Anda dapat memintanya di prompt berikutnya! 🚀",
        });
        // Simulate success and move to next step
        setTimeout(() => {
            toast({
                title: "Verifikasi Berhasil!",
                description: "Melanjutkan ke langkah berikutnya...",
            });
            if (step < 2) {
                setStep(step + 1);
            } else {
                navigate('/select-role');
            }
        }, 1500);
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Verifikasi Akun - Kerjain</title>
                <meta name="description" content="Lengkapi verifikasi KTP dan wajah untuk mengamankan akun Kerjain Anda." />
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-deep-indigo p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="glassmorphic-card p-8 space-y-6">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-white">Verifikasi Akun Anda</h1>
                            <p className="text-white/70">Satu langkah lagi untuk keamanan.</p>
                        </div>

                        <div className="flex items-center justify-center gap-4">
                            <div className={`w-1/3 h-1 rounded-full transition-colors ${step >= 1 ? 'bg-purple-500' : 'bg-white/20'}`}></div>
                            <div className={`w-1/3 h-1 rounded-full transition-colors ${step >= 2 ? 'bg-purple-500' : 'bg-white/20'}`}></div>
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-4 text-center"
                                >
                                    <h2 className="text-xl font-semibold">Verifikasi KTP</h2>
                                    <p className="text-white/70">Unggah foto KTP Anda untuk verifikasi data.</p>
                                    <div className="border-2 border-dashed border-white/30 rounded-xl p-12 flex flex-col items-center justify-center space-y-4">
                                        <Upload className="w-12 h-12 text-white/50" />
                                        <p className="text-sm text-white/60">Seret & lepas atau klik untuk unggah</p>
                                    </div>
                                    <Button onClick={() => handleAction('Unggah KTP')} className="w-full bg-white text-deep-indigo font-bold hover:bg-gray-200 group">
                                        Unggah KTP <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-4 text-center"
                                >
                                    <h2 className="text-xl font-semibold">Pindai Wajah</h2>
                                    <p className="text-white/70">Posisikan wajah Anda di dalam bingkai.</p>
                                    <div className="aspect-square bg-black/30 rounded-xl flex items-center justify-center">
                                        <Camera className="w-16 h-16 text-white/30" />
                                    </div>
                                    <Button onClick={() => handleAction('Pindai Wajah')} className="w-full bg-white text-deep-indigo font-bold hover:bg-gray-200 group">
                                        Mulai Pindai <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <p className="text-center text-sm text-white/70">
                            Sudah punya akun?{' '}
                            <Link to="/login" className="font-semibold text-purple-300 hover:underline">
                                Masuk
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default VerificationPage;