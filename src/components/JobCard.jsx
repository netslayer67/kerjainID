import React from "react";
import { motion } from "framer-motion";
import {
    MapPin,
    Clock,
    DollarSign,
    User,
    Star,
    Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const JobCard = ({ job, onAccept, showActions = false }) => {
    const { toast } = useToast();

    const getCategoryIcon = (category) => {
        const icons = {
            daily_errands: "🛒",
            digital_services: "💻",
            manual_labor: "🔨",
            creative_work: "🎨",
            event_assistance: "🎉",
        };
        return icons[category] || "💼";
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: "bg-yellow-500/80 text-black",
            accepted: "bg-blue-500/80",
            in_progress: "bg-purple-500/80",
            completed: "bg-green-500/80",
            cancelled: "bg-red-500/80",
        };
        return colors[status] || "bg-gray-500/80";
    };

    const getStatusText = (status) => {
        const texts = {
            pending: "Menunggu",
            accepted: "Diterima",
            in_progress: "Berlangsung",
            completed: "Selesai",
            cancelled: "Dibatalkan",
        };
        return texts[status] || status;
    };

    const handleAccept = () => {
        if (onAccept) {
            onAccept(job);
        } else {
            toast({
                title: "🚧 Fitur belum aktif",
                description: "Tombol ini bisa Anda aktifkan pada tahap selanjutnya.",
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative"
        >
            {/* Grid pattern + glassmorphism background */}
            <Card className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to_right, rgba(255,255,255,0.15) 0 1px, transparent 1px 56px), repeating-linear-gradient(to_bottom, rgba(255,255,255,0.15) 0 1px, transparent 1px 56px)",
                    }}
                />
                <CardContent className="relative p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl">{getCategoryIcon(job.category)}</div>
                            <div>
                                <h3 className="font-semibold text-lg text-white">
                                    {job.title}
                                </h3>
                                <p className="text-white/60 text-sm flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {job.client?.name || "Client"}
                                </p>
                            </div>
                        </div>
                        <Badge
                            className={`${getStatusColor(
                                job.status
                            )} text-xs px-3 py-1 rounded-full font-medium backdrop-blur-md`}
                        >
                            {getStatusText(job.status)}
                        </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-white/80 text-sm line-clamp-2">
                        {job.description}
                    </p>

                    {/* Job Info Grid */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            <span>Rp {job.budget?.toLocaleString("id-ID")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{job.duration || "Fleksibel"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(job.createdAt).toLocaleDateString("id-ID")}</span>
                        </div>
                    </div>

                    {/* Client Rating */}
                    {job.client?.rating && (
                        <div className="flex items-center gap-2 text-sm">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white/70">
                                {job.client.rating} ({job.client.reviewCount} ulasan)
                            </span>
                        </div>
                    )}

                    {/* Actions */}
                    {showActions && (
                        <div className="flex gap-2 pt-2">
                            <Button
                                onClick={handleAccept}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-xl"
                            >
                                Terima Pekerjaan
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() =>
                                    toast({
                                        title: "🚧 Fitur Detail belum aktif",
                                    })
                                }
                                className="border-white/20 text-white hover:bg-white/10 rounded-xl"
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
