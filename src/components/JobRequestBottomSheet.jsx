import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { MapPin, Clock, DollarSign, User, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const JobRequestBottomSheet = ({ job, isVisible, onAccept, onReject, autoRejectTime = 30 }) => {
    const [timeLeft, setTimeLeft] = useState(autoRejectTime);
    const [expanded, setExpanded] = useState(false);
    const dragControls = useDragControls();

    useEffect(() => {
        if (!isVisible) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
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
            // auto-expand if description is long
            setExpanded(job?.description?.length > 100);
        }
    }, [isVisible, autoRejectTime, job]);

    return (
        <AnimatePresence>
            {isVisible && job && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        drag="y"
                        dragControls={dragControls}
                        dragElastic={0.2}
                        onDragEnd={(e, info) => {
                            if (info.offset.y > 120) setExpanded(false);
                            if (info.offset.y < -80) setExpanded(true);
                        }}
                        initial={{ y: "100%" }}
                        animate={{ y: expanded ? "10%" : "40%" }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-2xl border border-white/10 rounded-t-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Drag handle */}
                        <div
                            className="w-12 h-1.5 bg-white/30 rounded-full mx-auto my-3 cursor-grab"
                            onPointerDown={e => dragControls.start(e)}
                        />

                        <Card className="bg-transparent border-none">
                            <CardHeader className="px-5 py-3 bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-base font-semibold">Pekerjaan Baru 🎯</CardTitle>
                                    <span className="text-xs font-mono">{timeLeft}s</span>
                                </div>
                                <Progress value={(timeLeft / autoRejectTime) * 100} className="h-1 mt-2 bg-white/20" />
                            </CardHeader>

                            <CardContent className="p-5 space-y-4">
                                {/* Compact info */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-white font-semibold">{job.title}</h3>
                                        <div className="flex items-center gap-1 text-white/70 text-sm">
                                            <User className="w-3 h-3" /> {job.client}
                                        </div>
                                    </div>
                                    <span className="text-emerald-400 font-bold">{job.fee}</span>
                                </div>

                                {/* Expanded details */}
                                {expanded && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-3 text-sm text-white/80"
                                    >
                                        <p className="leading-relaxed">{job.description}</p>
                                        <div className="flex justify-between">
                                            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {job.distance}</span>
                                            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {job.time}</span>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-3 pt-3">
                                    <Button
                                        onClick={onReject}
                                        variant="outline"
                                        className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/20"
                                    >
                                        <X className="w-4 h-4 mr-1" /> Tolak
                                    </Button>
                                    <Button
                                        onClick={() => onAccept(job)}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                    >
                                        <Check className="w-4 h-4 mr-1" /> Terima
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

export default JobRequestBottomSheet;
