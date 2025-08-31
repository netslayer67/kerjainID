import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase } from 'lucide-react';
import AnimatedPage from '@/components/AnimatedPage';
import { Helmet } from 'react-helmet';

const RoleSelectionPage = () => {
    const navigate = useNavigate();

    const selectRole = (role) => {
        if (role === 'client') {
            navigate('/client/dashboard');
        } else {
            navigate('/worker/dashboard');
        }
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Pilih Peran Anda - Kerjain</title>
                <meta name="description" content="Pilih peran Anda di Kerjain. Apakah Anda ingin mencari bantuan atau menawarkan jasa?" />
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-deep-indigo p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-4xl text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pilih Peran Anda</h1>
                    <p className="text-lg text-white/70 mb-12">Apa yang ingin Anda lakukan di Kerjain hari ini?</p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -10 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            onClick={() => selectRole('client')}
                            className="glassmorphic-card p-8 md:p-12 flex flex-col items-center justify-center space-y-6 cursor-pointer"
                        >
                            <User className="w-20 h-20 text-purple-300" />
                            <h2 className="text-3xl font-bold">Saya Butuh Bantuan</h2>
                            <p className="text-white/80">Posting pekerjaan dan dapatkan bantuan dari para pekerja terampil.</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -10 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            onClick={() => selectRole('worker')}
                            className="glassmorphic-card p-8 md:p-12 flex flex-col items-center justify-center space-y-6 cursor-pointer"
                        >
                            <Briefcase className="w-20 h-20 text-blue-300" />
                            <h2 className="text-3xl font-bold">Saya Ingin Bekerja</h2>
                            <p className="text-white/80">Temukan pekerjaan, dapatkan penghasilan, dan bangun reputasi Anda.</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default RoleSelectionPage;