// ChatPage.jsx
import React from "react";
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
    return (
        <AnimatedPage>
            <Helmet>
                <title>Obrolan — Kerjain</title>
            </Helmet>

            <div className="relative mx-auto flex h-dvh max-w-lg flex-col">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="z-10 flex items-center justify-between border-b border-border bg-card/50 px-4 py-3 backdrop-blur-xl"
                >
                    <h1 className="text-lg font-semibold">Obrolan</h1>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Search className="h-5 w-5 text-foreground" />
                    </Button>
                </motion.div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
                    {chatList.map((chat) => (
                        <motion.div
                            key={chat.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link
                                to={`/chat/${chat.id}`}
                                className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card/40 p-3 text-left shadow-sm backdrop-blur-md hover:bg-card/60 transition"
                            >
                                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                                    {chat.initials}
                                    {chat.online && (
                                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-card"></span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate text-sm font-semibold text-foreground">
                                            {chat.name}
                                        </p>
                                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                                    </div>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {chat.lastMsg}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedPage>
    );
}
