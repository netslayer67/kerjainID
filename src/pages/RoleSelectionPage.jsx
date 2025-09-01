// RoleSelectionPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Briefcase } from "lucide-react";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

const RoleSelectionPage = () => {
    const navigate = useNavigate();

    const selectRole = (role) => {
        if (role === "client") navigate("/client/dashboard");
        else navigate("/worker/dashboard");
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Pilih Peran — Kerjain</title>
            </Helmet>

            <div className="relative flex min-h-screen items-center justify-center  px-4">
                {/* Grid overlay */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to_right, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px), repeating-linear-gradient(to_bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px)",
                    }}
                />
                {/* Blobs */}
                <div className="absolute -top-24 -left-16 h-72 w-72 animate-pulse rounded-full bg-purple-600/30 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-600/20 blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 w-full max-w-4xl text-center"
                >
                    <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">
                        Pilih Peran
                    </h1>
                    <p className="mb-10 text-sm text-white/60 md:text-base">
                        Mulai sesuai kebutuhan Anda
                    </p>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Client */}
                        <motion.div
                            whileHover={{ scale: 1.05, y: -6 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 250, damping: 20 }}
                            onClick={() => selectRole("client")}
                            className="cursor-pointer rounded-2xl border border-white/10 bg-white/10 p-8 shadow-xl backdrop-blur-xl hover:shadow-2xl"
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <User className="h-16 w-16 text-purple-300" />
                                <h2 className="text-xl font-semibold text-white">
                                    Saya Butuh Bantuan
                                </h2>
                                <p className="text-sm text-white/70">
                                    Posting pekerjaan, temukan pekerja.
                                </p>
                            </div>
                        </motion.div>

                        {/* Worker */}
                        <motion.div
                            whileHover={{ scale: 1.05, y: -6 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 250, damping: 20 }}
                            onClick={() => selectRole("worker")}
                            className="cursor-pointer rounded-2xl border border-white/10 bg-white/10 p-8 shadow-xl backdrop-blur-xl hover:shadow-2xl"
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <Briefcase className="h-16 w-16 text-blue-300" />
                                <h2 className="text-xl font-semibold text-white">
                                    Saya Ingin Bekerja
                                </h2>
                                <p className="text-sm text-white/70">
                                    Cari pekerjaan, bangun reputasi.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default RoleSelectionPage;
