// src/pages/RoomChat.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedSlidePage from "@/components/AnimatedSlidePage";
import { Helmet } from "react-helmet";

/**
 * RoomChat (refactor)
 * - Mobile-first layout
 * - Liquid glass look via bg-card/.. + backdrop-blur-xl
 * - Smooth transitions (300-350ms)
 * - Safe input: strip tags & links, limit length
 * - Auto-scroll on new message
 * - Memoized message bubble for perf
 */

/* ---------------- Dummy data (demo) ---------------- */
const chatList = [
    { id: 1, name: "Budi Santoso", initials: "B", online: true },
    { id: 2, name: "Citra Dewi", initials: "C", online: false },
    { id: 3, name: "Andi W.", initials: "A", online: false },
];

const initialMessages = [
    { id: 1, sender: "other", text: "Halo, saya sudah di jalan menuju lokasi Anda.", time: "10:30" },
    { id: 2, sender: "me", text: "Oke, ditunggu ya. Kalau sudah dekat kabari.", time: "10:31" },
    { id: 3, sender: "other", text: "Siap!", time: "10:31" },
];

/* ---------------- Utilities ---------------- */
// sanitize user input: remove HTML tags, urls, long whitespace, limit length
const sanitizeMessage = (v = "", maxLen = 800) =>
    String(v || "")
        .replace(/<[^>]*>/g, "") // remove tags
        .replace(/\b(?:https?:|mailto:|ftp:|javascript:)[^\s]*/gi, "") // remove common protocols
        .replace(/https?:\/\/[^\s]+/gi, "") // remove URLs
        .replace(/\s{2,}/g, " ")
        .trim()
        .slice(0, maxLen);

// tiny util to get hh:mm for messages
const nowTime = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

/* ---------------- Message Bubble (memoized) ---------------- */
const MessageBubble = React.memo(function MessageBubble({ msg }) {
    const mine = msg.sender === "me";
    return (
        <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[78%] px-4 py-2 rounded-2xl transition-colors duration-300 shadow-sm ${mine
                    ? "rounded-br-none bg-primary text-primary-foreground"
                    : "rounded-bl-none bg-card/70 text-foreground border border-border/40"
                    }`}
                aria-live="polite"
            >
                <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                <p className="mt-1 text-[11px] text-right text-muted-foreground">{msg.time}</p>
            </div>
        </div>
    );
});

/* ---------------- Main Component ---------------- */
export default function RoomChat() {
    const { id } = useParams();
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    // select chat from list (dummy)
    const selectedChat = useMemo(
        () => chatList.find((c) => String(c.id) === String(id)),
        [id]
    );

    // redirect if no chat (graceful)
    useEffect(() => {
        if (!selectedChat) {
            navigate("/worker/chat" || "/client/chat", { replace: true });
        }
    }, [selectedChat, navigate]);

    // messages state (allows send)
    const [messages, setMessages] = useState(initialMessages);

    // input
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);

    // scroll ref
    const listRef = useRef(null);

    // safe send handler
    const handleSend = useCallback(
        (e) => {
            e && e.preventDefault();
            const clean = sanitizeMessage(text, 600);
            if (!clean) return;
            // optimistic UI append
            const next = {
                id: Date.now(),
                sender: "me",
                text: clean,
                time: nowTime(),
            };
            setSending(true);
            setMessages((prev) => [...prev, next]);
            setText("");
            // simulate network
            setTimeout(() => {
                setSending(false);
                // in real app: await API and update with real id/time/ack
            }, 400);
        },
        [text]
    );

    // auto-scroll to bottom when messages change
    useEffect(() => {
        if (!listRef.current) return;
        // small delay to allow layout
        const t = setTimeout(() => {
            listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
        }, 80);
        return () => clearTimeout(t);
    }, [messages]);

    if (!selectedChat) return null; // navigation will redirect

    /* motion variants */
    const headerAnim = reduceMotion
        ? { initial: {}, animate: {} }
        : { initial: { opacity: 0, y: -12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.32 } };

    const listAnim = reduceMotion
        ? { initial: {}, animate: {} }
        : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.32 } };

    return (
        <AnimatedSlidePage onSwipeBack={() => navigate("/chat")}>
            <Helmet>
                <title>Chat dengan {selectedChat.name} — Kerjain</title>
            </Helmet>

            <div className="relative mx-auto flex h-dvh max-w-lg flex-col bg-background/50">
                {/* Header */}
                <motion.header
                    {...headerAnim}
                    className="z-10 flex items-center gap-3 border-b border-border bg-background/70 px-4 py-3 backdrop-blur-xl"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-accent/20 hover:text-accent transition-colors duration-300"
                        onClick={() => navigate("/chat")}
                        aria-label="Kembali"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>

                    <div className="flex items-center gap-3">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
                            {selectedChat.initials}
                            {selectedChat.online && (
                                <span className="absolute -bottom-0.5 -right-0.5 block h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-background" />
                            )}
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-sm font-semibold text-foreground truncate">{selectedChat.name}</h1>
                            <p className={`text-xs ${selectedChat.online ? "text-emerald-400" : "text-muted-foreground"}`}>
                                {selectedChat.online ? "Online" : "Offline"}
                            </p>
                        </div>
                    </div>
                </motion.header>

                {/* Messages list */}
                <motion.div
                    {...listAnim}
                    ref={listRef}
                    className="relative z-0 flex-1 overflow-y-auto px-4 py-5 space-y-4"
                    aria-live="polite"
                >
                    {messages.map((m, i) => (
                        <motion.div
                            key={m.id}
                            initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
                            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.32, delay: i * 0.02 }}
                        >
                            <MessageBubble msg={m} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Composer / Input area */}
                <motion.form
                    onSubmit={handleSend}
                    initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
                    animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.32 }}
                    className="z-10 flex items-center gap-2 border-t border-border bg-background/70 px-3 py-2 backdrop-blur-xl"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="rounded-full hover:bg-accent/20 hover:text-accent transition-colors duration-300"
                        aria-label="Lampirkan file"
                        onClick={() => {
                            /* placeholder for attach flow */
                        }}
                    >
                        <Paperclip className="h-5 w-5" />
                    </Button>

                    <Input
                        aria-label="Ketik pesan"
                        placeholder="Ketik pesan..."
                        value={text}
                        onChange={(e) => setText(sanitizeMessage(e.target.value, 600))}
                        className="flex-1 rounded-full border border-border/40 bg-card/60 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 transition-all duration-300"
                        onKeyDown={(e) => {
                            // Ctrl+Enter to send OR Enter to send
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />

                    <Button
                        size="icon"
                        type="submit"
                        className={`rounded-full bg-primary hover:bg-primary/90 transition-colors duration-300 shadow-md ${sending ? "opacity-70" : ""
                            }`}
                        aria-label="Kirim pesan"
                        disabled={sending || text.trim().length === 0}
                    >
                        <Send className="h-5 w-5 text-primary-foreground" />
                    </Button>
                </motion.form>
            </div>
        </AnimatedSlidePage>
    );
}
