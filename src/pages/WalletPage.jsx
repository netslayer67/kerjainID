import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Download,
    Plus,
    ArrowUpRight,
    ArrowDownLeft,
    Wallet,
    Receipt,
    Shuffle,
    ScanLine,
} from "lucide-react";

const fmtIDR = (n) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
        n
    );

const seedTx = [
    { id: 1, type: "in", title: "Pembayaran Budi", amount: 150000, date: "2025-08-30" },
    { id: 2, type: "out", title: "Biaya Platform", amount: 16500, date: "2025-08-30" },
    { id: 3, type: "in", title: "Top Up", amount: 500000, date: "2025-08-29" },
    { id: 4, type: "out", title: "Pembayaran Citra", amount: 250000, date: "2025-08-28" },
    { id: 5, type: "in", title: "Refund", amount: 85000, date: "2025-08-27" },
];

export default function WalletPage() {
    const [activeTab, setActiveTab] = useState("semua");
    const [isLoading, setIsLoading] = useState(true);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(t);
    }, []);

    const balance = useMemo(() => 583500, []);

    const filtered = useMemo(() => {
        if (activeTab === "masuk") return seedTx.filter((t) => t.type === "in");
        if (activeTab === "keluar") return seedTx.filter((t) => t.type === "out");
        return seedTx;
    }, [activeTab]);

    // Framer variants
    const fadeUp = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    };

    const stagger = {
        show: {
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.05,
            },
        },
    };

    return (
        <div className="relative min-h-dvh w-full">
            {/* background subtle grid */}
            <div className="pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(70%_60%_at_50%_20%,black,transparent_80%)]" />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(to_right, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px), repeating-linear-gradient(to_bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px)",
                }}
            />

            <div className="relative mx-auto max-w-lg px-4 pb-20 pt-6">
                {/* Top Bar */}
                <div className="mb-5 flex items-center gap-3">
                    <Link
                        to={-1}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/15 hover:bg-white/20"
                    >
                        <ArrowLeft className="h-5 w-5 text-white/80" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-white/70" />
                        <h1 className="text-lg font-semibold text-white/90">Dompet</h1>
                    </div>
                </div>

                {/* Balance */}
                <motion.section initial="hidden" animate="show" variants={stagger}>
                    <motion.div variants={fadeUp}>
                        <BalanceCard
                            isLoading={isLoading}
                            balance={balance}
                            onTopUp={() => alert("Top Up")}
                            onWithdraw={() => alert("Tarik Dana")}
                        />
                    </motion.div>

                    <motion.div variants={fadeUp} className="mt-4">
                        <QuickActions />
                    </motion.div>
                </motion.section>

                {/* Tabs + Transactions */}
                <motion.section initial="hidden" animate="show" variants={stagger} className="mt-6">
                    <motion.div variants={fadeUp} className="mb-4">
                        <div className="inline-flex overflow-hidden rounded-2xl bg-white/10 p-1 backdrop-blur-md ring-1 ring-white/15">
                            {[
                                { key: "semua", label: "Semua" },
                                { key: "masuk", label: "Masuk" },
                                { key: "keluar", label: "Keluar" },
                            ].map((t) => (
                                <button
                                    key={t.key}
                                    onClick={() => setActiveTab(t.key)}
                                    className={`rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none ${activeTab === t.key
                                        ? "bg-white/20 text-white shadow-inner"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                        }`}
                                    aria-pressed={activeTab === t.key}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <CardWrapper>
                            <div className="flex items-center gap-2 pb-2">
                                <Receipt className="h-5 w-5 text-white/70" />
                                <h2 className="text-base font-semibold text-white/90">Riwayat</h2>
                            </div>
                            <div className="divide-y divide-white/10">
                                <AnimatePresence initial={false}>
                                    {isLoading
                                        ? Array.from({ length: 4 }).map((_, i) => <TxSkeleton key={i} />)
                                        : filtered.map((tx) => <TransactionItem key={tx.id} tx={tx} />)}
                                </AnimatePresence>
                            </div>
                        </CardWrapper>
                    </motion.div>
                </motion.section>
            </div>
        </div>
    );
}

// -------------------- Subcomponents --------------------

function CardWrapper({ children }) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-lg">
            {children}
        </div>
    );
}

function BalanceCard({ isLoading, balance, onTopUp, onWithdraw }) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl shadow-xl">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-wide text-white/60">Saldo</p>
                    {isLoading ? (
                        <div className="mt-2 h-8 w-40 animate-pulse rounded-lg bg-white/20" />
                    ) : (
                        <div className="mt-1 flex items-end gap-2">
                            <h2 className="text-2xl font-semibold text-white">{fmtIDR(balance)}</h2>
                            <span className="mb-1 text-xs text-white/60">tersedia</span>
                        </div>
                    )}
                </div>
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                    <button
                        onClick={onTopUp}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow hover:bg-gray-100"
                    >
                        <Plus className="h-4 w-4" /> Top Up
                    </button>
                    <button
                        onClick={onWithdraw}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-transparent px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 hover:bg-white/10"
                    >
                        <Download className="h-4 w-4" /> Tarik
                    </button>
                </div>
            </div>
        </div>
    );
}

function QuickActions() {
    const actions = [
        {
            icon: <Shuffle className="h-5 w-5" />,
            title: "Transfer",
            desc: "Kirim ke rekan cepat.",
            onClick: () => alert("Transfer"),
        },
        {
            icon: <ScanLine className="h-5 w-5" />,
            title: "Scan & Pay",
            desc: "Bayar via QR.",
            onClick: () => alert("Scan & Pay"),
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {actions.map((a, i) => (
                <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={a.onClick}
                    className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 text-left text-white/90 backdrop-blur-xl hover:bg-white/10"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white">
                        {a.icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{a.title}</span>
                            <span className="opacity-0 transition group-hover:opacity-100">→</span>
                        </div>
                        <p className="text-xs text-white/60">{a.desc}</p>
                    </div>
                </motion.button>
            ))}
        </div>
    );
}

function TransactionItem({ tx }) {
    const isIn = tx.type === "in";
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center justify-between gap-4 py-3"
        >
            <div className="flex items-center gap-4">
                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${isIn
                        ? "bg-emerald-400/15 text-emerald-300"
                        : "bg-rose-400/15 text-rose-300"
                        }`}
                >
                    {isIn ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                </div>
                <div>
                    <p className="text-sm font-medium text-white/90">{tx.title}</p>
                    <p className="text-xs text-white/60">
                        {new Date(tx.date).toLocaleDateString("id-ID")}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p
                    className={`text-sm font-semibold ${isIn ? "text-emerald-300" : "text-rose-300"
                        }`}
                >
                    {isIn ? "+" : "-"} {fmtIDR(tx.amount)}
                </p>
            </div>
        </motion.div>
    );
}

function TxSkeleton() {
    return (
        <div className="flex items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-2xl bg-white/15" />
                <div>
                    <div className="mb-1 h-3 w-40 animate-pulse rounded bg-white/20" />
                    <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
                </div>
            </div>
            <div className="h-4 w-20 animate-pulse rounded bg-white/20" />
        </div>
    );
}
