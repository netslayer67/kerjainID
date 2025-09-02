// PageLoader.jsx
import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
            {/* Background grid pattern */}
            <div className="absolute inset-0 bg-grid-small [mask-image:radial-gradient(circle_at_center,white,transparent)] opacity-20 pointer-events-none" />

            {/* Glassmorphic loader container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative flex flex-col items-center gap-5 rounded-2xl bg-card/40 px-8 py-10 shadow-xl backdrop-blur-xl border border-border/50"
            >
                {/* Animated loader */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                    <Loader2 className="w-12 h-12 text-primary" />
                </motion.div>

                {/* Animated pulse text */}
                <motion.p
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-base font-medium text-foreground tracking-wide"
                >
                    Memuat...
                </motion.p>

                {/* Decorative glowing ring */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0.5 }}
                    animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="absolute -inset-4 rounded-3xl border-2 border-primary/40 blur-xl"
                />
            </motion.div>
        </div>
    );
};

export default PageLoader;
