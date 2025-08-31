import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gift, Copy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import AnimatedPage from '@/components/AnimatedPage';
import { Helmet } from 'react-helmet';

const ReferralPage = () => {
    const { toast } = useToast();
    const referralCode = "KERJAIN-AJA-123";

    const copyCode = () => {
        navigator.clipboard.writeText(referralCode);
        toast({
            title: "Kode Disalin!",
            description: "Bagikan kode referral Anda ke teman.",
        });
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Undang Teman - Kerjain</title>
                <meta name="description" content="Undang teman Anda ke Kerjain dan dapatkan bonus untuk setiap teman yang bergabung." />
            </Helmet>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link to={-1}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Undang Teman</h1>
                </div>

                <Card className="glassmorphic-card text-center">
                    <CardContent className="p-8 space-y-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                        >
                            <Gift className="w-20 h-20 text-purple-300 mx-auto" />
                        </motion.div>
                        <h2 className="text-2xl font-bold">Dapatkan Bonus Rp 25.000</h2>
                        <p className="text-white/70 max-w-md mx-auto">
                            Ajak teman Anda untuk bergabung dengan Kerjain. Anda akan mendapatkan bonus saldo saat mereka menyelesaikan pekerjaan pertamanya!
                        </p>
                    </CardContent>
                </Card>

                <div className="space-y-4 text-center">
                    <p className="font-semibold">Kode Referral Anda</p>
                    <div className="relative max-w-sm mx-auto">
                        <Input
                            readOnly
                            value={referralCode}
                            className="text-center text-lg font-mono tracking-widest bg-white/10 border-white/20 pr-12"
                        />
                        <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={copyCode}>
                            <Copy className="h-5 w-5" />
                        </Button>
                    </div>
                    <Button size="lg" className="bg-white text-deep-indigo font-bold hover:bg-gray-200">
                        <Share2 className="mr-2 h-5 w-5" /> Bagikan Sekarang
                    </Button>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default ReferralPage;