import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const PageLoader = () => {
    return (
        <div className="fixed inset-0 bg-deep-indigo flex items-center justify-center z-[100]">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-4"
            >
                <Loader2 className="w-12 h-12 text-white animate-spin" />
                <p className="text-lg font-semibold text-white">Memuat...</p>
            </motion.div>
        </div>
    );
};

export default PageLoader;