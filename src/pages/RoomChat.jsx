import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedSlidePage from "@/components/AnimatedSlidePage";
import { Helmet } from "react-helmet";

// Dummy data
const chatList = [
    { id: 1, name: "Budi Santoso", initials: "B", online: true },
    { id: 2, name: "Citra Dewi", initials: "C", online: false },
    { id: 3, name: "Andi W.", initials: "A", online: false },
];

const messages = [
    { id: 1, sender: "other", text: "Halo, saya sudah di jalan menuju lokasi Anda.", time: "10:30" },
    { id: 2, sender: "me", text: "Oke, ditunggu ya. Kalau sudah dekat kabari.", time: "10:31" },
    { id: 3, sender: "other", text: "Siap!", time: "10:31" },
];

export default function RoomChat() {
    const { id } = useParams();
    const navigate = useNavigate();

    const selectedChat = chatList.find((chat) => String(chat.id) === id);

    useEffect(() => {
        if (!selectedChat) {
            navigate("/chat", { replace: true });
        }
    }, [selectedChat, navigate]);

    if (!selectedChat) return null;

    return (
        <AnimatedSlidePage onSwipeBack={() => navigate("/chat")}>
            <Helmet>
                <title>Chat dengan {selectedChat.name} — Kerjain</title>
            </Helmet>

            <div className="relative mx-auto flex h-dvh max-w-lg flex-col">
                {/* Header Room */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="z-10 flex items-center gap-3 border-b border-border bg-background/70 px-4 py-3 backdrop-blur-xl"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-accent/20 hover:text-accent transition-colors"
                        onClick={() => navigate("/chat")}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>

                    <div className="flex items-center gap-3">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                            {selectedChat.initials}
                            {selectedChat.online && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-background" />
                            )}
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold text-foreground">
                                {selectedChat.name}
                            </h1>
                            <p
                                className={`text-xs ${selectedChat.online ? "text-emerald-400" : "text-muted-foreground"
                                    }`}
                            >
                                {selectedChat.online ? "Online" : "Offline"}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Messages */}
                <div className="relative z-10 flex-1 space-y-4 overflow-y-auto px-4 py-5">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: i * 0.05 }}
                            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[75%] px-4 py-2 shadow-md backdrop-blur rounded-2xl transition-colors ${msg.sender === "me"
                                        ? "rounded-br-none bg-primary text-primary-foreground"
                                        : "rounded-bl-none bg-card/70 text-foreground border border-border/40"
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
                    className="relative z-10 flex items-center gap-2 border-t border-border bg-background/70 px-3 py-2 backdrop-blur-xl"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="rounded-full hover:bg-accent/20 hover:text-accent transition-colors"
                    >
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                        placeholder="Ketik pesan..."
                        className="flex-1 rounded-full border border-border/40 bg-card/60 text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-accent"
                    />
                    <Button
                        size="icon"
                        type="submit"
                        className="rounded-full bg-primary hover:bg-primary/90 transition-colors shadow-md"
                    >
                        <Send className="h-5 w-5 text-primary-foreground" />
                    </Button>
                </motion.form>
            </div>
        </AnimatedSlidePage>
    );
}
