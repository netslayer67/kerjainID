import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedPage from '@/components/AnimatedPage';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';

const PostJobPage = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "Pekerjaan Diposting!",
            description: "Mencari pekerja yang cocok untuk Anda...",
        });
        setTimeout(() => navigate('/job/123/track'), 2000);
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Posting Pekerjaan - Kerjain</title>
                <meta name="description" content="Posting pekerjaan baru di Kerjain dan biarkan sistem kami menemukan pekerja yang tepat untuk Anda." />
            </Helmet>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link to="/client/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Posting Pekerjaan Baru</h1>
                </div>

                <Card className="glassmorphic-card">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Apa yang Anda butuhkan?</Label>
                                <Input id="title" placeholder="Contoh: 'Bantu angkat lemari ke lantai 2'" className="bg-white/5 border-white/20" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi Detail</Label>
                                <textarea id="description" placeholder="Jelaskan detail pekerjaan, apa saja yang perlu disiapkan, dll." rows="4" className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white/5 border-white/20"></textarea>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Lokasi</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                        <Input id="location" placeholder="Masukkan alamat" className="pl-10 bg-white/5 border-white/20" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="budget">Anggaran (Rp)</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                        <Input id="budget" type="number" placeholder="Contoh: 50000" className="pl-10 bg-white/5 border-white/20" required />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Lampiran (Opsional)</Label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/30 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Paperclip className="w-8 h-8 mb-3 text-white/60" />
                                            <p className="mb-2 text-sm text-white/60"><span className="font-semibold">Klik untuk unggah</span> atau seret dan lepas</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>

                            <Button type="submit" size="lg" className="w-full bg-white text-deep-indigo font-bold hover:bg-gray-200 group">
                                Cari Pekerja Sekarang <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AnimatedPage>
    );
};

export default PostJobPage;