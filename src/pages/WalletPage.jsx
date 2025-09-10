// WalletPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
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

/* --- Currency Formatter --- */
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

const TRANS_MS = 320;

export default function WalletPage() {
    const [activeTab, setActiveTab] = useState("semua");
    const [isLoading, setIsLoading] = useState(true);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 700);
        return () => clearTimeout(t);
    }, []);

    const balance = useMemo(() => 583500, []);
    const filtered = useMemo(() => {
        if (activeTab === "masuk") return seedTx.filter((t) => t.type === "in");
        if (activeTab === "keluar") return seedTx.filter((t) => t.type === "out");
        return seedTx;
    }, [activeTab]);

    const onTopUp = useCallback(() => alert("Top Up (demo)"), []);
    const onWithdraw = useCallback(() => alert("Tarik Dana (demo)"), []);

    const balanceMotion = reduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: TRANS_MS / 1000, ease: "easeOut" },
        };

    return (
        <div className="relative min-h-screen text-foreground">
            <div className="relative mx-auto max-w-lg px-4 pb-24 pt-6">
                {/* HEADER */}
                <div className="mb-6 flex items-center gap-3">
                    <Link
                        to={-1}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-card/40 backdrop-blur-xl ring-1 ring-border text-muted-foreground hover:text-accent transition-colors duration-300"
                        aria-label="Kembali"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>

                    <div className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-accent" />
                        <h1 className="text-lg font-semibold">Dompet</h1>
                    </div>
                </div>

                {/* BALANCE */}
                <motion.div {...balanceMotion}>
                    <BalanceCard
                        isLoading={isLoading}
                        balance={balance}
                        onTopUp={onTopUp}
                        onWithdraw={onWithdraw}
                    />
                </motion.div>

                {/* Quick Actions */}
                <div className="mt-5">
                    <QuickActions />
                </div>

                {/* Tabs & Transactions */}
                <div className="mt-7 space-y-4">
                    <div className="inline-flex w-full justify-center rounded-2xl bg-card/40 backdrop-blur-xl p-1 ring-1 ring-border transition-colors duration-300">
                        {[
                            { key: "semua", label: "Semua" },
                            { key: "masuk", label: "Masuk" },
                            { key: "keluar", label: "Keluar" },
                        ].map((t) => (
                            <button
                                key={t.key}
                                onClick={() => setActiveTab(t.key)}
                                className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${activeTab === t.key
                                    ? "bg-accent text-accent-foreground shadow"
                                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                                    }`}
                                aria-pressed={activeTab === t.key}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <GlassCard>
                        <div className="flex items-center gap-2 pb-3">
                            <Receipt className="h-5 w-5 text-accent" />
                            <h2 className="text-base font-semibold">Riwayat Transaksi</h2>
                        </div>

                        <div className="divide-y divide-border">
                            {isLoading
                                ? Array.from({ length: 4 }).map((_, i) => <TxSkeleton key={i} />)
                                : filtered.map((tx) => <TransactionItem key={tx.id} tx={tx} />)}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}

/* ---------- Subcomponents ---------- */

function GlassCard({ children }) {
    return (
        <div className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur-xl p-5 shadow-sm transition-all duration-300 hover:border-accent/50">
            {children}
        </div>
    );
}

function BalanceCard({ isLoading, balance, onTopUp, onWithdraw }) {
    return (
        <div
            className="overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/95 to-primary backdrop-blur-xl p-6 text-primary-foreground shadow-md"
            style={{ transition: `all ${TRANS_MS}ms ease-out` }}
        >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-wide opacity-80">Saldo</p>
                    {isLoading ? (
                        <div className="mt-2 h-8 w-40 animate-pulse rounded-lg bg-primary-foreground/30" />
                    ) : (
                        <div className="mt-1 flex items-end gap-2">
                            <h2 className="text-2xl font-bold">{fmtIDR(balance)}</h2>
                            <span className="mb-1 text-xs opacity-90">tersedia</span>
                        </div>
                    )}
                </div>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                    <button
                        onClick={onTopUp}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                    >
                        <Plus className="h-4 w-4" /> Top Up
                    </button>

                    <button
                        onClick={onWithdraw}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-primary-foreground ring-1 ring-inset ring-primary-foreground/40 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
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
                <button
                    key={i}
                    onClick={a.onClick}
                    className="group flex items-center gap-4 rounded-3xl border border-border/60 bg-card/40 backdrop-blur-xl p-4 text-left transition-all duration-300 hover:border-accent/50"
                    aria-label={a.title}
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/30 text-secondary-foreground">
                        {a.icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{a.title}</span>
                            <span className="opacity-0 transition-opacity group-hover:opacity-100 text-accent">→</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{a.desc}</p>
                    </div>
                </button>
            ))}
        </div>
    );
}

/* Transaction Item */
const TransactionItem = React.memo(function TransactionItem({ tx }) {
    const isIn = tx.type === "in";
    return (
        <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-4">
                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${isIn ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"
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
            <p className={`text-sm font-semibold ${isIn ? "text-emerald-400" : "text-rose-400"}`}>
                {isIn ? "+" : "-"} {fmtIDR(tx.amount)}
            </p>
        </div>
    );
});

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
