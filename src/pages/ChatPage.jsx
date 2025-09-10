import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedPage from "@/components/AnimatedPage";
import { Helmet } from "react-helmet";

// Dummy data: daftar chat
const chatList = [
    {
        id: 1,
        name: "Budi Santoso",
        initials: "B",
        lastMsg: "Halo, saya sudah di jalan menuju lokasi Anda.",
        time: "10:30",
        online: true,
    },
    {
        id: 2,
        name: "Citra Dewi",
        initials: "C",
        lastMsg: "Oke, besok kita lanjut ya!",
        time: "Kemarin",
        online: false,
    },
    {
        id: 3,
        name: "Andi W.",
        initials: "A",
        lastMsg: "Terima kasih ya sudah selesai 🙏",
        time: "Senin",
        online: false,
    },
];

export default function ChatPage() {
    const [search, setSearch] = useState("");

    // basic input sanitizer → biar ga masukin script / link aneh
    const sanitizeInput = (value) =>
        value.replace(/<[^>]*>?/gm, "").replace(/https?:\/\/\S+/g, "");

    const filteredChats = chatList.filter((chat) =>
        chat.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AnimatedPage>
            <Helmet>
                <title>Obrolan — Kerjain</title>
            </Helmet>

            <div className="relative mx-auto flex h-dvh max-w-lg flex-col bg-background/50 backdrop-blur-xl backdrop-saturate-150">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="z-10 flex items-center justify-between border-b border-border/50 px-4 py-3"
                >
                    <h1 className="text-lg font-semibold text-foreground">Obrolan</h1>
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(sanitizeInput(e.target.value))}
                            placeholder="Cari..."
                            className="hidden md:block w-40 rounded-full border border-border/50 bg-background/60 px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2 rounded-full hover:bg-accent/20 hover:text-accent transition-colors duration-300"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                </motion.div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
                    {filteredChats.length > 0 ? (
                        filteredChats.map((chat, i) => (
                            <motion.div
                                key={chat.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: i * 0.05 }}
                            >
                                <Link
                                    to={`/chat/${chat.id}`}
                                    className="flex w-full items-center gap-3 rounded-2xl border border-border/40 bg-card/50 p-3 shadow-sm backdrop-blur-lg transition-all duration-300 hover:border-accent/60 hover:bg-card/80"
                                >
                                    {/* Avatar */}
                                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
                                        {chat.initials}
                                        {chat.online && (
                                            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-background"></span>
                                        )}
                                    </div>

                                    {/* Chat Info */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="truncate text-sm font-semibold text-foreground">
                                                {chat.name}
                                            </p>
                                            <span className="text-[11px] text-muted-foreground">
                                                {chat.time}
                                            </span>
                                        </div>
                                        <p className="truncate text-xs text-muted-foreground">
                                            {chat.lastMsg}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <p className="px-4 text-center text-sm text-muted-foreground">
                            Tidak ada obrolan ditemukan.
                        </p>
                    )}
                </div>
            </div>
        </AnimatedPage>
    );
}
