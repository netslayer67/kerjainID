import React from 'react';
import { motion } from 'framer-motion';
import {
    MapPin,
    Clock,
    DollarSign,
    User,
    Star,
    Calendar
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const JobCard = ({ job, onAccept, showActions = false, variant = 'default' }) => {
    const { toast } = useToast();

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

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-500',
            'accepted': 'bg-blue-500',
            'in_progress': 'bg-purple-500',
            'completed': 'bg-green-500',
            'cancelled': 'bg-red-500'
        };
        return colors[status] || 'bg-gray-500';
    };

    const getStatusText = (status) => {
        const texts = {
            'pending': 'Menunggu',
            'accepted': 'Diterima',
            'in_progress': 'Berlangsung',
            'completed': 'Selesai',
            'cancelled': 'Dibatalkan'
        };
        return texts[status] || status;
    };

    const handleAccept = () => {
        if (onAccept) {
            onAccept(job);
        } else {
            toast({
                title: "🚧 Fitur ini belum diimplementasikan—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀"
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="text-2xl">{getCategoryIcon(job.category)}</div>
                            <div>
                                <h3 className="font-semibold text-lg text-white">{job.title}</h3>
                                <p className="text-white/70 text-sm">{job.client?.name || 'Client'}</p>
                            </div>
                        </div>
                        <Badge className={getStatusColor(job.status)}>
                            {getStatusText(job.status)}
                        </Badge>
                    </div>

                    <p className="text-white/80 text-sm mb-4 line-clamp-2">
                        {job.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-white/70">
                            <DollarSign className="w-4 h-4" />
                            <span>Rp {job.budget?.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-white/70">
                            <Clock className="w-4 h-4" />
                            <span>{job.duration || 'Fleksibel'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-white/70">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-white/70">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(job.createdAt).toLocaleDateString('id-ID')}</span>
                        </div>
                    </div>

                    {job.client?.rating && (
                        <div className="flex items-center space-x-2 mb-4">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-white/70">
                                {job.client.rating} ({job.client.reviewCount} ulasan)
                            </span>
                        </div>
                    )}

                    {showActions && (
                        <div className="flex space-x-2">
                            <Button
                                onClick={handleAccept}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                            >
                                Terima Pekerjaan
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => toast({
                                    title: "🚧 Fitur ini belum diimplementasikan—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀"
                                })}
                                className="border-white/20 text-white hover:bg-white/10"
                            >
                                Detail
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default JobCard;