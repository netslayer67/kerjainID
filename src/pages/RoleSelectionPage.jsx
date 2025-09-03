import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Briefcase } from "lucide-react";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

const springy = {
    whileHover: { scale: 1.04, y: -4 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 260, damping: 20 },
};

const RoleCard = ({ icon: Icon, title, subtitle, onClick, ariaLabel }) => (
    <motion.button
        type="button"
        aria-label={ariaLabel}
        onClick={onClick}
        className="group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-3xl border border-border/60 bg-foreground/5 p-8 text-foreground shadow-xl backdrop-blur-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:border-border/80"
        {...springy}
    >
        {/* Subtle inner gradient/shine */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-foreground/10 via-transparent to-transparent opacity-70 mix-blend-overlay" />
        <div className="pointer-events-none absolute -inset-px rounded-3xl ring-1 ring-inset ring-border/60" />

        <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className="rounded-2xl bg-background/70 p-5 shadow-inner backdrop-blur-xl">
                <Icon className="h-14 w-14 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {/* Glow on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(40% 40% at 50% 0%, hsl(var(--accent)/0.25) 0%, transparent 60%)" }}
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
            </Helmet>

            <div className="relative flex min-h-svh items-center justify-center px-4 py-16 sm:py-20">


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 w-full max-w-4xl text-center"
                >
                    <div className="mx-auto mb-10 max-w-xl">
                        <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">Pilih Peran</h1>
                        <p className="text-sm text-muted-foreground md:text-base">Mulai sesuai kebutuhan Anda</p>
                    </div>

                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                        <RoleCard
                            icon={User}
                            title="Saya Butuh Bantuan"
                            subtitle="Posting pekerjaan, temukan pekerja."
                            ariaLabel="Pilih peran sebagai klien"
                            onClick={() => selectRole("client")}
                        />

                        <RoleCard
                            icon={Briefcase}
                            title="Saya Ingin Bekerja"
                            subtitle="Cari pekerjaan, bangun reputasi."
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
