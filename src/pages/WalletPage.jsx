// WalletPage.jsx
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

// --- Helpers
const fmtIDR = (n) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(n);

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
    const reduceMotion = useReducedMotion();

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

    const fadeUp = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
    };

    return (
        <div className="relative min-h-screen text-foreground">
            {/* floating blobs */}
            <motion.div
                className="absolute top-20 left-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.35, 0.5] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-32 right-6 h-44 w-44 rounded-full bg-secondary/20 blur-3xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.3, 0.45] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            />

            {/* Content */}
            <div className="relative mx-auto max-w-lg px-4 pb-24 pt-6">
                {/* Header */}
                <div className="mb-6 flex items-center gap-3">
                    <Link
                        to={-1}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-card/40 backdrop-blur-md ring-1 ring-border hover:bg-card transition"
                    >
                        <ArrowLeft className="h-5 w-5 text-foreground" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-muted-foreground" />
                        <h1 className="text-lg font-semibold">Dompet</h1>
                    </div>
                </div>

                {/* Balance */}
                <motion.div variants={fadeUp} initial="hidden" animate="show">
                    <BalanceCard
                        isLoading={isLoading}
                        balance={balance}
                        onTopUp={() => alert("Top Up")}
                        onWithdraw={() => alert("Tarik Dana")}
                    />
                </motion.div>

                {/* Quick Actions */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="mt-5">
                    <QuickActions />
                </motion.div>

                {/* Tabs & Transactions */}
                <motion.div variants={fadeUp} initial="hidden" animate="show" className="mt-7 space-y-4">
                    {/* Tabs */}
                    <div className="inline-flex w-full justify-center rounded-2xl bg-card/40 p-1 backdrop-blur-md ring-1 ring-border">
                        {[
                            { key: "semua", label: "Semua" },
                            { key: "masuk", label: "Masuk" },
                            { key: "keluar", label: "Keluar" },
                        ].map((t) => (
                            <button
                                key={t.key}
                                onClick={() => setActiveTab(t.key)}
                                className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${activeTab === t.key
                                    ? "bg-card text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-card/40"
                                    }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Transaction History */}
                    <CardWrapper>
                        <div className="flex items-center gap-2 pb-3">
                            <Receipt className="h-5 w-5 text-muted-foreground" />
                            <h2 className="text-base font-semibold">Riwayat</h2>
                        </div>
                        <div className="divide-y divide-border">
                            <AnimatePresence initial={false}>
                                {isLoading
                                    ? Array.from({ length: 4 }).map((_, i) => <TxSkeleton key={i} />)
                                    : filtered.map((tx) => <TransactionItem key={tx.id} tx={tx} />)}
                            </AnimatePresence>
                        </div>
                    </CardWrapper>
                </motion.div>
            </div>
        </div>
    );
}

// ---------------- Subcomponents ----------------

function CardWrapper({ children }) {
    return (
        <div className="rounded-3xl border border-border bg-card/50 p-5 backdrop-blur-xl shadow-xl">
            {children}
        </div>
    );
}

function BalanceCard({ isLoading, balance, onTopUp, onWithdraw }) {
    return (
        <div className="overflow-hidden rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                {/* Saldo */}
                <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Saldo</p>
                    {isLoading ? (
                        <div className="mt-2 h-8 w-40 animate-pulse rounded-lg bg-muted/40" />
                    ) : (
                        <div className="mt-1 flex items-end gap-2">
                            <h2 className="text-2xl font-semibold">{fmtIDR(balance)}</h2>
                            <span className="mb-1 text-xs text-muted-foreground">tersedia</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                    <button
                        onClick={onTopUp}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" /> Top Up
                    </button>
                    <button
                        onClick={onWithdraw}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-foreground ring-1 ring-inset ring-border hover:bg-card/50"
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
        { icon: <Shuffle className="h-5 w-5" />, title: "Transfer", desc: "Kirim cepat", onClick: () => alert("Transfer") },
        { icon: <ScanLine className="h-5 w-5" />, title: "Scan & Pay", desc: "Bayar QR", onClick: () => alert("Scan & Pay") },
    ];

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {actions.map((a, i) => (
                <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={a.onClick}
                    className="group flex items-center gap-4 rounded-3xl border border-border bg-card/50 p-5 text-left backdrop-blur-xl hover:bg-card/60 transition"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-foreground">
                        {a.icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{a.title}</span>
                            <span className="opacity-0 transition group-hover:opacity-100">→</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{a.desc}</p>
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center justify-between gap-4 py-4"
        >
            <div className="flex items-center gap-4">
                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${isIn ? "bg-emerald-400/15 text-emerald-300" : "bg-rose-400/15 text-rose-300"
                        }`}
                >
                    {isIn ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                </div>
                <div>
                    <p className="text-sm font-medium">{tx.title}</p>
                    <p className="text-xs text-muted-foreground">
                        {new Date(tx.date).toLocaleDateString("id-ID")}
                    </p>
                </div>
            </div>
            <p className={`text-sm font-semibold ${isIn ? "text-emerald-300" : "text-rose-300"}`}>
                {isIn ? "+" : "-"} {fmtIDR(tx.amount)}
            </p>
        </motion.div>
    );
}

function TxSkeleton() {
    return (
        <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-2xl bg-muted animate-pulse" />
                <div>
                    <div className="mb-1 h-3 w-40 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-24 animate-pulse rounded bg-muted/70" />
                </div>
            </div>
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        </div>
    );
}
