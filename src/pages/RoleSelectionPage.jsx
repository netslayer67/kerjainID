import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Briefcase } from "lucide-react";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

// --- Motion preset for interactive cards ---
const springy = {
    whileHover: { scale: 1.05, y: -3 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 260, damping: 22 },
};

const RoleCard = ({ icon: Icon, title, subtitle, onClick, ariaLabel }) => (
    <motion.button
        type="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className="group relative flex w-full flex-col items-center justify-center rounded-3xl border border-border/50 bg-background/40 p-8 text-foreground shadow-lg backdrop-blur-2xl transition-all duration-350 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:border-accent hover:bg-accent/5 hover:shadow-xl"
        {...springy}
    >
        {/* glass gradient overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-70 mix-blend-overlay" />
        <div className="pointer-events-none absolute -inset-px rounded-3xl ring-1 ring-inset ring-border/50" />

        <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="rounded-2xl bg-secondary/30 p-5 shadow-inner backdrop-blur-xl transition-colors duration-350 group-hover:bg-secondary/50">
                <Icon className="h-14 w-14 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground max-w-[16ch]">{subtitle}</p>
        </div>

        {/* hover glow */}
        <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 blur-2xl transition-opacity duration-350 group-hover:opacity-100"
            style={{
                background:
                    "radial-gradient(45% 40% at 50% 0%, hsl(var(--accent)/0.22) 0%, transparent 70%)",
            }}
        />
    </motion.button>
);

const RoleSelectionPage = () => {
    const navigate = useNavigate();
    const prefersReducedMotion = useReducedMotion();

    const selectRole = (role) => {
        if (role === "client") navigate("/client/dashboard");
        else navigate("/worker/dashboard");
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Pilih Peran — Kerjain</title>
                <meta
                    name="description"
                    content="Pilih peran Anda di Kerjain: posting pekerjaan atau mencari pekerjaan."
                />
            </Helmet>

            <div className="relative flex min-h-svh items-center justify-center px-4 py-16 sm:py-20">
                <motion.div
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 w-full max-w-4xl text-center"
                >
                    {/* Title */}
                    <div className="mx-auto mb-12 max-w-xl">
                        <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
                            Pilih Peran Anda
                        </h1>
                        <p className="text-sm text-muted-foreground md:text-base">
                            Tentukan cara Anda menggunakan <span className="text-accent font-medium">Kerjain</span>.
                        </p>
                    </div>

                    {/* Options */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <RoleCard
                            icon={User}
                            title="Saya Butuh Bantuan"
                            subtitle="Posting pekerjaan & temukan pekerja tepat"
                            ariaLabel="Pilih peran sebagai klien"
                            onClick={() => selectRole("client")}
                        />

                        <RoleCard
                            icon={Briefcase}
                            title="Saya Ingin Bekerja"
                            subtitle="Cari pekerjaan & bangun reputasi Anda"
                            ariaLabel="Pilih peran sebagai pekerja"
                            onClick={() => selectRole("worker")}
                        />
                    </div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default RoleSelectionPage;