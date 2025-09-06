import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft, Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet";

const RatingPage = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const { toast } = useToast();
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    // Role & target bisa dikirim via state { role: 'client' | 'worker', target: { name, jobTitle } }
    const role = location.state?.role || "worker";
    const target = location.state?.target || {
        name: "User",
        jobTitle: "Tugas Anda",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            toast({
                title: "Rating belum diisi",
                description: "Silakan pilih bintang terlebih dahulu.",
                variant: "destructive",
            });
            return;
        }

        // Simulasi API submit
        toast({
            title: "Terima kasih!",
            description: "Ulasan Anda sudah terkirim.",
        });

        // Redirect sesuai role
        setTimeout(() => {
            navigate(role === "client" ? "/client/dashboard" : "/worker/dashboard");
        }, 1200);
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Beri Ulasan — Kerjain</title>
            </Helmet>

            <div className="relative min-h-dvh w-full px-4 py-6 md:px-6">
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
                            className="rounded-full bg-background/30 backdrop-blur-md hover:bg-background/50"
                        >
                            <ArrowLeft className="h-5 w-5 text-foreground" />
                        </Button>
                    </Link>
                    <h1 className="text-lg font-semibold text-foreground">Beri Ulasan</h1>
                </motion.div>

                {/* Rating Card */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="rounded-3xl border border-border/40 bg-background/40 shadow-2xl backdrop-blur-2xl">
                        <CardContent className="p-6 text-center space-y-6">
                            <h2 className="text-lg font-semibold text-foreground">
                                Nilai {role === "client" ? "Kinerja" : "Klien"}{" "}
                                <span className="text-primary font-bold">{target.name}</span>
                            </h2>
                            <p className="text-sm text-muted-foreground">{target.jobTitle}</p>

                            {/* Stars */}
                            <div className="flex justify-center gap-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.div
                                        key={star}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Star
                                            className={`h-10 w-10 cursor-pointer transition-colors ${(hoverRating || rating) >= star
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-muted-foreground"
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
                                    placeholder={`Tulis komentar singkat (opsional)...`}
                                    rows="3"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full rounded-2xl border border-border/40 bg-background/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 backdrop-blur-sm"
                                ></textarea>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full rounded-2xl bg-foreground text-background font-semibold shadow hover:bg-foreground/90 group"
                                >
                                    Kirim
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
