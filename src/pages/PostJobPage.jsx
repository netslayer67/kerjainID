import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Send,
    Paperclip,
    MapPin,
    DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet";

const PostJobPage = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "✅ Pekerjaan Diposting!",
            description: "Mencari pekerja yang cocok untuk Anda...",
        });
        setTimeout(() => navigate("/job/123/track"), 1800);
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Posting Pekerjaan - Kerjain</title>
            </Helmet>

            <div className="relative min-h-screen px-4 py-6 md:px-8">
                {/* Grid pattern background */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to_right, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px), repeating-linear-gradient(to_bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px)",
                    }}
                />
                {/* Gradient blobs */}
                <div className="absolute -top-24 -left-16 h-72 w-72 animate-pulse rounded-full bg-purple-600/30 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-600/20 blur-3xl" />

                {/* Header */}
                <div className="relative z-10 mb-6 flex items-center gap-3">
                    <Link to="/client/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold text-white md:text-2xl">
                        Posting Pekerjaan
                    </h1>
                </div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                >
                    <Card className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
                        <CardContent className="p-6 space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Judul */}
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-white/80">
                                        Apa yang Anda butuhkan?
                                    </Label>
                                    <Input
                                        id="title"
                                        placeholder="Contoh: Angkat lemari ke lantai 2"
                                        className="bg-white/5 border-white/20 placeholder:text-white/40"
                                        required
                                    />
                                </div>

                                {/* Deskripsi */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-white/80">
                                        Deskripsi Singkat
                                    </Label>
                                    <textarea
                                        id="description"
                                        placeholder="Detail pekerjaan Anda..."
                                        rows="3"
                                        className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                                    />
                                </div>

                                {/* Lokasi & Budget */}
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="text-white/80">
                                            Lokasi
                                        </Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                            <Input
                                                id="location"
                                                placeholder="Masukkan alamat"
                                                className="pl-10 bg-white/5 border-white/20 placeholder:text-white/40"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="budget" className="text-white/80">
                                            Anggaran
                                        </Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                            <Input
                                                id="budget"
                                                type="number"
                                                placeholder="Contoh: 100000"
                                                className="pl-10 bg-white/5 border-white/20 placeholder:text-white/40"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Lampiran */}
                                <div className="space-y-2">
                                    <Label className="text-white/80">Lampiran (opsional)</Label>
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/30 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition"
                                    >
                                        <Paperclip className="w-8 h-8 mb-2 text-white/60" />
                                        <p className="text-xs text-white/60">
                                            Klik untuk unggah / seret ke sini
                                        </p>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>

                                {/* Button Submit */}
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-white text-deep-indigo font-semibold hover:bg-gray-200 group"
                                >
                                    Cari Pekerja
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

export default PostJobPage;
