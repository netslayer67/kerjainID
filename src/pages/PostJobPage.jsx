import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, FileText, WalletMinimal, HandCoins } from "lucide-react";
import { Link } from "react-router-dom";

// --- Input sanitization helper ---
const sanitizeInput = (value) =>
    value
        .replace(/<.*?>/g, "")
        .replace(/(javascript:|data:|vbscript:)/gi, "")
        .replace(/https?:\/\/[^\s]+/gi, "")
        .trimStart();

export default function PostJobPage() {
    const [mode, setMode] = useState("quick");
    const [payment, setPayment] = useState("cash");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: "", // formatted
        budgetRaw: "", // pure number
        durationValue: "",
        durationUnit: "jam",
        category: "",
        skills: "",
        deadline: "",
        location: "",
    });

    // generic handler
    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: sanitizeInput(value) }));
    };

    // budget khusus: raw + formatted
    const handleBudgetChange = (value) => {
        const raw = value.replace(/\D/g, "");
        const formatted = raw ? new Intl.NumberFormat("id-ID").format(Number(raw)) : "";
        setFormData((prev) => ({
            ...prev,
            budgetRaw: raw,
            budget: formatted,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            budget: formData.budgetRaw, // kirim raw ke backend
        };
        alert(
            `Posting ${mode} job dengan pembayaran ${payment}:\n${JSON.stringify(
                payload,
                null,
                2
            )}`
        );
    };

    const fadeSlide = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
        exit: { opacity: 0, y: -15, transition: { duration: 0.25, ease: "easeIn" } },
    };

    return (
        <div className="relative min-h-screen text-foreground">
            {/* Header */}
            <header className="mx-auto max-w-2xl px-4 py-6 flex items-center gap-3">
                <Link
                    to={-1}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/40 backdrop-blur-xl text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-lg font-semibold tracking-tight">Buat Pekerjaan</h1>
            </header>

            {/* Mode Toggle */}
            <section className="mx-auto max-w-2xl px-4">
                <div className="inline-flex w-full rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl p-1">
                    <ToggleButton
                        active={mode === "quick"}
                        onClick={() => setMode("quick")}
                        icon={<Zap className="h-4 w-4" />}
                        label="Cepat"
                    />
                    <ToggleButton
                        active={mode === "detail"}
                        onClick={() => setMode("detail")}
                        icon={<FileText className="h-4 w-4" />}
                        label="Detail"
                    />
                </div>
            </section>

            {/* Form */}
            <main className="mx-auto max-w-2xl px-4 py-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                        {mode === "quick" ? (
                            <motion.div
                                key="quick"
                                variants={fadeSlide}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="space-y-5"
                            >
                                <InputField
                                    label="Judul"
                                    placeholder="Contoh: Antar kopi ke kantor"
                                    value={formData.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                />
                                <TextAreaField
                                    label="Deskripsi Singkat"
                                    placeholder="Tuliskan kebutuhanmu"
                                    value={formData.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="2"
                                        className="w-24 rounded-xl border border-border bg-card/60 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        value={formData.durationValue}
                                        onChange={(e) => handleChange("durationValue", e.target.value)}
                                        onWheel={(e) => e.target.blur()}
                                    />
                                    <select
                                        className="flex-1 rounded-xl border border-border bg-card/60 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                                        value={formData.durationUnit}
                                        onChange={(e) => handleChange("durationUnit", e.target.value)}
                                    >
                                        <option value="menit">Menit</option>
                                        <option value="jam">Jam</option>
                                        <option value="hari">Hari</option>
                                    </select>
                                </div>
                                <InputField
                                    label="Budget"
                                    placeholder="Rp 100.000"
                                    value={formData.budget}
                                    onChange={(e) => handleBudgetChange(e.target.value)}
                                    type="text"
                                    inputMode="numeric"
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="detail"
                                variants={fadeSlide}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="space-y-5"
                            >
                                <InputField
                                    label="Judul"
                                    placeholder="Contoh: Desain Logo Brand"
                                    value={formData.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                />
                                <TextAreaField
                                    label="Deskripsi"
                                    placeholder="Ceritakan detail pekerjaanmu"
                                    value={formData.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                />
                                <InputField
                                    label="Kategori"
                                    placeholder="Design, IT, Marketing..."
                                    value={formData.category}
                                    onChange={(e) => handleChange("category", e.target.value)}
                                />
                                <InputField
                                    label="Skill"
                                    placeholder="UI/UX, React.js, Copywriting..."
                                    value={formData.skills}
                                    onChange={(e) => handleChange("skills", e.target.value)}
                                />
                                <InputField
                                    label="Budget"
                                    placeholder="Rp 1.000.000"
                                    value={formData.budget}
                                    onChange={(e) => handleBudgetChange(e.target.value)}
                                    type="text"
                                    inputMode="numeric"
                                />
                                <InputField
                                    label="Deadline"
                                    type="date"
                                    value={formData.deadline}
                                    onChange={(e) => handleChange("deadline", e.target.value)}
                                />
                                <InputField
                                    label="Lokasi (Opsional)"
                                    placeholder="Jakarta Selatan"
                                    value={formData.location}
                                    onChange={(e) => handleChange("location", e.target.value)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Payment Method */}
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground/80">
                            Metode Pembayaran
                        </p>
                        <div className="flex gap-2">
                            <PayButton
                                active={payment === "cash"}
                                onClick={() => setPayment("cash")}
                                icon={<HandCoins className="h-4 w-4" />}
                                label="Tunai"
                            />
                            <PayButton
                                active={payment === "wallet"}
                                onClick={() => setPayment("wallet")}
                                icon={<WalletMinimal className="h-4 w-4" />}
                                label="Saldo Wallet"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full rounded-2xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm transition-all duration-350 hover:bg-accent hover:text-accent-foreground"
                        >
                            {mode === "quick" ? "Cari Bantuan" : "Posting Pekerjaan"}
                        </motion.button>
                    </div>
                </form>
            </main>
        </div>
    );
}

/* --- Sub Components --- */
function ToggleButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            type="button"
            className={`flex-1 flex items-center justify-center gap-1 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${active
                    ? "bg-accent text-accent-foreground shadow"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                }`}
        >
            {icon} {label}
        </button>
    );
}

function PayButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            type="button"
            className={`flex-1 flex items-center justify-center gap-1 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${active
                    ? "bg-accent text-accent-foreground shadow"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                }`}
        >
            {icon} {label}
        </button>
    );
}

function InputField({ label, ...props }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1 text-foreground/80">
                {label}
            </label>
            <input
                {...props}
                className="w-full rounded-xl border border-border bg-card/70 px-4 py-2 text-sm shadow-sm placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
            />
        </div>
    );
}

function TextAreaField({ label, ...props }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1 text-foreground/80">
                {label}
            </label>
            <textarea
                rows={4}
                {...props}
                className="w-full rounded-xl border border-border bg-card/70 px-4 py-2 text-sm shadow-sm placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
            />
        </div>
    );
}
