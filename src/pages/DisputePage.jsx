import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import AnimatedPage from '@/components/AnimatedPage';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';

const DisputePage = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "Laporan Terkirim",
            description: "Tim kami akan segera meninjau laporan Anda dalam 1x24 jam.",
        });
        setTimeout(() => navigate(-1), 2000);
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Ajukan Sengketa - Kerjain</title>
                <meta name="description" content="Laporkan masalah atau ajukan sengketa terkait pekerjaan di Kerjain." />
            </Helmet>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link to={-1}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Laporkan Masalah</h1>
                </div>

                <Card className="glassmorphic-card">
                    <CardContent className="p-6 space-y-6">
                        <div className="flex items-start gap-4 bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                            <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1" />
                            <div>
                                <h3 className="font-semibold text-yellow-300">Penting</h3>
                                <p className="text-sm text-yellow-400/80">Jelaskan masalah Anda sedetail mungkin dan sertakan bukti jika ada. Laporan palsu dapat mengakibatkan penangguhan akun.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="job-id">ID Pekerjaan</Label>
                                <p className="font-mono text-sm bg-white/10 px-2 py-1 rounded-md mt-1">JOB-123-XYZ</p>
                            </div>
                            <div>
                                <Label htmlFor="issue">Jelaskan Masalah Anda</Label>
                                <textarea
                                    id="issue"
                                    rows="6"
                                    required
                                    className="mt-1 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white/5 border-white/20"
                                    placeholder="Contoh: Pekerja tidak menyelesaikan tugas sesuai kesepakatan..."
                                ></textarea>
                            </div>
                            <div>
                                <Label htmlFor="attachment">Lampirkan Bukti (Foto/Video)</Label>
                                <Input id="attachment" type="file" className="mt-1 bg-white/5 border-white/20" />
                            </div>
                            <Button type="submit" size="lg" className="w-full bg-white text-deep-indigo font-bold hover:bg-gray-200 group">
                                Kirim Laporan <Send className="ml-2 h-5 w-5" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AnimatedPage>
    );
};

export default DisputePage;