import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedPage from '@/components/AnimatedPage';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';

const RatingPage = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            toast({
                title: "Rating Belum Diisi",
                description: "Silakan berikan rating bintang terlebih dahulu.",
                variant: "destructive",
            });
            return;
        }
        toast({
            title: "Terima Kasih Atas Ulasan Anda!",
            description: "Ulasan Anda membantu kami menjadi lebih baik.",
        });
        setTimeout(() => navigate('/client/dashboard'), 1500);
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Beri Rating - Kerjain</title>
                <meta name="description" content="Berikan rating dan ulasan untuk pekerjaan yang telah selesai di Kerjain." />
            </Helmet>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link to={-1}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Beri Ulasan</h1>
                </div>

                <Card className="glassmorphic-card">
                    <CardContent className="p-6 text-center space-y-6">
                        <h2 className="text-xl font-semibold">Bagaimana Kinerja Budi Santoso?</h2>
                        <p className="text-white/70">Pekerjaan: Bersihkan Taman Belakang</p>

                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <motion.div
                                    key={star}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Star
                                        className={`w-10 h-10 cursor-pointer transition-colors ${(hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'
                                            }`}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <textarea
                                placeholder="Tulis ulasan Anda di sini (opsional)..."
                                rows="4"
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white/5 border-white/20"
                            ></textarea>
                            <Button type="submit" size="lg" className="w-full bg-white text-deep-indigo font-bold hover:bg-gray-200 group">
                                Kirim Ulasan <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AnimatedPage>
    );
};

export default RatingPage;