import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedSlidePage from "@/components/AnimatedSlidePage"; // pastiin path bener
import { Helmet } from "react-helmet";

// Dummy data sama kayak di ChatPage.jsx
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

    // Cari chat berdasarkan id dari URL
    const selectedChat = chatList.find((chat) => String(chat.id) === id);

    // Kalau gak ada chatnya → redirect ke /chat
    useEffect(() => {
        if (!selectedChat) {
            navigate("/chat", { replace: true });
        }
    }, [selectedChat, navigate]);

    if (!selectedChat) return null; // Jangan render apapun sebelum redirect

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
                    className="z-10 flex items-center gap-3 border-b border-border bg-card/50 px-4 py-3 backdrop-blur-xl"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => navigate("/chat")}
                    >
                        <ArrowLeft className="h-5 w-5 text-foreground" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                            {selectedChat.initials}
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold text-foreground">
                                {selectedChat.name}
                            </h1>
                            <p
                                className={`text-xs ${selectedChat.online
                                        ? "text-emerald-400"
                                        : "text-muted-foreground"
                                    }`}
                            >
                                {selectedChat.online ? "Online" : "Offline"}
                            </p>
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
                            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"
                                }`}
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
        </AnimatedSlidePage>
    );
}
