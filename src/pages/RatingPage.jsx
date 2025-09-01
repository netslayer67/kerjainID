import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet";

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
                description: "Silakan pilih bintang terlebih dahulu.",
                variant: "destructive",
            });
            return;
        }
        toast({
            title: "Terima Kasih!",
            description: "Ulasan Anda membantu kami menjadi lebih baik.",
        });
        setTimeout(() => navigate("/client/dashboard"), 1500);
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Beri Rating — Kerjain</title>
                <meta
                    name="description"
                    content="Berikan rating dan ulasan untuk pekerjaan yang telah selesai di Kerjain."
                />
            </Helmet>

            <div className="relative min-h-dvh w-full overflow-hidden px-4 py-6">
                {/* Background: grid + blur blobs */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to_right, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px), repeating-linear-gradient(to_bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px)",
                    }}
                />
                <div className="absolute -top-20 left-10 h-72 w-72 animate-pulse rounded-full bg-purple-500/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-indigo-500/20 blur-3xl" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6 flex items-center gap-3"
                >
                    <Link to={-1}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20"
                        >
                            <ArrowLeft className="h-5 w-5 text-white" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-semibold text-white">Beri Ulasan</h1>
                </motion.div>

                {/* Rating Card */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-2xl">
                        <CardContent className="p-6 text-center space-y-6">
                            <h2 className="text-lg font-semibold text-white">
                                Bagaimana kinerja{" "}
                                <span className="text-purple-300">Budi Santoso</span>?
                            </h2>
                            <p className="text-sm text-white/60">
                                Pekerjaan: Bersihkan Taman Belakang
                            </p>

                            {/* Stars */}
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.div
                                        key={star}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Star
                                            className={`h-10 w-10 cursor-pointer transition-colors ${(hoverRating || rating) >= star
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-white/30"
                                                }`}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <textarea
                                    placeholder="Tulis ulasan Anda (opsional)..."
                                    rows="4"
                                    className="w-full rounded-2xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 backdrop-blur-sm"
                                ></textarea>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full rounded-2xl bg-white text-gray-900 font-semibold shadow hover:bg-gray-100 group"
                                >
                                    Kirim Ulasan
                                    <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default RatingPage;
