// ChatPage.jsx
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

            <div className="mx-auto flex h-dvh max-w-lg flex-col">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3 px-4 py-3 border-b border-white/10 backdrop-blur-md bg-white/5"
                >
                    <Link to={-1}>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-white font-semibold">
                            B
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold text-white">Budi Santoso</h1>
                            <p className="text-xs text-emerald-400">Online</p>
                        </div>
                    </div>
                </motion.div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md backdrop-blur ${msg.sender === "me"
                                    ? "bg-purple-600 text-white rounded-br-none"
                                    : "bg-white/10 text-white rounded-bl-none"
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <p className="mt-1 text-[11px] text-white/60 text-right">{msg.time}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Input Area */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 border-t border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md"
                >
                    <Button variant="ghost" size="icon" type="button" className="rounded-full">
                        <Paperclip className="h-5 w-5 text-white/70" />
                    </Button>
                    <Input
                        placeholder="Ketik pesan..."
                        className="flex-1 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    <Button size="icon" type="submit" className="rounded-full bg-purple-600 hover:bg-purple-700">
                        <Send className="h-5 w-5 text-white" />
                    </Button>
                </motion.form>
            </div>
        </AnimatedPage>
    );
}
