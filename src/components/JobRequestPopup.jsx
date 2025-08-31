import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Clock,
    DollarSign,
    User,
    X,
    Check,
    AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const JobRequestPopup = ({ job, isVisible, onAccept, onReject, autoRejectTime = 30 }) => {
    const [timeLeft, setTimeLeft] = useState(autoRejectTime);
    const { toast } = useToast();

    useEffect(() => {
        if (!isVisible) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    onReject();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isVisible, onReject]);

    useEffect(() => {
        if (isVisible) {
            setTimeLeft(autoRejectTime);
        }
    }, [isVisible, autoRejectTime]);

    const getCategoryIcon = (category) => {
        const icons = {
            'daily_errands': '🛒',
            'digital_services': '💻',
            'manual_labor': '🔨',
            'creative_work': '🎨',
            'event_assistance': '🎉'
        };
        return icons[category] || '💼';
    };

    const progressPercentage = (timeLeft / autoRejectTime) * 100;

    return (
        <AnimatePresence>
            {isVisible && job && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.8, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="w-full max-w-md"
                    >
                        <Card className="overflow-hidden border-2 border-purple-500/50 shadow-2xl">
                            <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-bold">
                                        Pekerjaan Baru! 🎯
                                    </CardTitle>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4" />
                                        <span className="font-mono text-sm">{timeLeft}s</span>
                                    </div>
                                </div>
                                <Progress value={progressPercentage} className="h-2 bg-white/20" />
                            </CardHeader>

                            <CardContent className="p-6">
                                <div className="flex items-start space-x-3 mb-4">
                                    <div className="text-3xl">{getCategoryIcon(job.category)}</div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-xl text-white mb-1">
                                            {job.title}
                                        </h3>
                                        <div className="flex items-center space-x-2 text-white/70">
                                            <User className="w-4 h-4" />
                                            <span>{job.client?.name || 'Client'}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-white/80 mb-4 text-sm leading-relaxed">
                                    {job.description}
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-white/70">
                                            <DollarSign className="w-4 h-4" />
                                            <span className="text-sm">Budget</span>
                                        </div>
                                        <span className="font-semibold text-green-400">
                                            Rp {job.budget?.toLocaleString('id-ID')}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-white/70">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-sm">Lokasi</span>
                                        </div>
                                        <span className="text-white text-sm">{job.location}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-white/70">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm">Durasi</span>
                                        </div>
                                        <span className="text-white text-sm">{job.duration || 'Fleksibel'}</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 mb-6 p-3 bg-yellow-500/20 rounded-xl">
                                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                                    <span className="text-sm text-yellow-200">
                                        Pekerjaan akan otomatis ditolak dalam {timeLeft} detik
                                    </span>
                                </div>

                                <div className="flex space-x-3">
                                    <Button
                                        onClick={onReject}
                                        variant="outline"
                                        className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/20"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Tolak
                                    </Button>
                                    <Button
                                        onClick={() => onAccept(job)}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                    >
                                        <Check className="w-4 h-4 mr-2" />
                                        Terima
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default JobRequestPopup;