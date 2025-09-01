import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

const messages = [
    { id: 1, sender: "other", text: "Halo, saya sudah di jalan menuju lokasi Anda.", time: "10:30" },
    { id: 2, sender: "me", text: "Oke, ditunggu ya. Kalau sudah dekat kabari.", time: "10:31" },
    { id: 3, sender: "other", text: "Siap!", time: "10:31" },
];

export default function ChatPage() {
    return (
        <AnimatedPage>
            <Helmet>
                <title>Obrolan — Kerjain</title>
            </Helmet>

            <div className="relative mx-auto flex h-dvh max-w-lg flex-col">
                {/* Grid Pattern Background */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-15"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to_right, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px), repeating-linear-gradient(to_bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 56px)",
                    }}
                />
                {/* Gradient Blobs */}
                <div className="absolute -top-20 -left-10 h-72 w-72 animate-pulse rounded-full bg-purple-600/30 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-blue-600/20 blur-3xl" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 flex items-center gap-3 border-b border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl"
                >
                    <Link to={-1}>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="h-5 w-5 text-white" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-sm font-semibold text-white">
                            B
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold text-white">Budi Santoso</h1>
                            <p className="text-xs text-emerald-400">Online</p>
                        </div>
                    </div>
                </motion.div>

                {/* Messages */}
                <div className="relative z-10 flex-1 space-y-4 overflow-y-auto px-4 py-5">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-md backdrop-blur ${msg.sender === "me"
                                        ? "rounded-br-none bg-purple-600 text-white"
                                        : "rounded-bl-none bg-white/10 text-white"
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <p className="mt-1 text-[11px] text-right text-white/60">
                                    {msg.time}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Input Area */}
                <motion.form
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 flex items-center gap-2 border-t border-white/10 bg-white/10 px-3 py-2 backdrop-blur-xl"
                >
                    <Button variant="ghost" size="icon" type="button" className="rounded-full">
                        <Paperclip className="h-5 w-5 text-white/70" />
                    </Button>
                    <Input
                        placeholder="Ketik pesan..."
                        className="flex-1 rounded-full border-white/20 bg-white/10 text-white placeholder:text-white/50"
                    />
                    <Button
                        size="icon"
                        type="submit"
                        className="rounded-full bg-purple-600 hover:bg-purple-700"
                    >
                        <Send className="h-5 w-5 text-white" />
                    </Button>
                </motion.form>
            </div>
        </AnimatedPage>
    );
}
