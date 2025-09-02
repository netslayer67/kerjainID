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
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(to_right, hsl(var(--muted-foreground)/.12) 0 1px, transparent 1px 56px), repeating-linear-gradient(to_bottom, hsl(var(--muted-foreground)/.12) 0 1px, transparent 1px 56px)",
                    }}
                />
                {/* Gradient blobs */}
                <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 flex items-center gap-3 border-b border-border bg-card/50 px-4 py-3 backdrop-blur-xl"
                >
                    <Link to={-1}>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="h-5 w-5 text-foreground" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                            B
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold text-foreground">Budi Santoso</h1>
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
                                className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-xl backdrop-blur ${msg.sender === "me"
                                    ? "rounded-br-none bg-primary text-primary-foreground"
                                    : "rounded-bl-none bg-card/70 text-foreground"
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <p className="mt-1 text-[11px] text-right text-muted-foreground">
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
                    className="relative z-10 flex items-center gap-2 border-t border-border bg-card/50 px-3 py-2 backdrop-blur-xl"
                >
                    <Button variant="ghost" size="icon" type="button" className="rounded-full">
                        <Paperclip className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <Input
                        placeholder="Ketik pesan..."
                        className="flex-1 rounded-full border-border bg-background/50 text-foreground placeholder:text-muted-foreground"
                    />
                    <Button
                        size="icon"
                        type="submit"
                        className="rounded-full bg-primary hover:bg-primary/90"
                    >
                        <Send className="h-5 w-5 text-primary-foreground" />
                    </Button>
                </motion.form>
            </div>
        </AnimatedPage>
    );
}
