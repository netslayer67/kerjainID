import React, { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Send,
    Paperclip,
    MapPin,
    DollarSign,
    Calendar,
    Tag,
    MapPinOff,
    Globe,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet";

/*
  PostJob.revamp.jsx
  - Rombak penuh: mobile-first, minimal text, accessible, liquid-glass (pure Tailwind),
    interactive blobs (SVG + framer-motion), lucide icons, framer-motion micro-interactions.
  - Bahasa UI: santai & singkat.
  - Menggunakan color tokens: bg-background, bg-card, text-foreground, border-border, etc.
  - Ringan & perf-aware (prefers-reduced-motion support).
*/

const jobTypes = [
    { id: "remote", label: "WFH" },
    { id: "hybrid", label: "WFA" },
    { id: "onsite", label: "On-site" },
];

const suggestionCats = [
    "Ride / Antar",
    "Errand",
    "Design",
    "Web Dev",
    "Marketing",
    "Cleaning",
    "Tukang",
    "Event",
];

function Chip({ children, onRemove, icon: Icon }) {
    return (
        <motion.span
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-border/30 bg-background/10 text-sm"
        >
            {Icon ? <Icon className="h-4 w-4" /> : null}
            <span className="truncate">{children}</span>
            {onRemove ? (
                <button type="button" onClick={onRemove} aria-label="hapus" className="ml-1 text-xs opacity-70">
                    <X className="h-3 w-3" />
                </button>
            ) : null}
        </motion.span>
    );
}

export default function PostJobRevamp() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const reduce = useReducedMotion();

    // form state
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [cats, setCats] = useState([]);
    const [catInput, setCatInput] = useState("");
    const [jobType, setJobType] = useState("remote");
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");
    const [deadline, setDeadline] = useState("");
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [flexible, setFlexible] = useState(true);
    const fileRef = useRef(null);

    // helpers
    const addCategory = (v) => {
        if (!v) return;
        const t = String(v).trim();
        if (!t) return;
        setCats((prev) => (prev.includes(t) ? prev : [...prev].concat(t).slice(0, 6)));
        setCatInput("");
    };
    const removeCategory = (c) => setCats((p) => p.filter((i) => i !== c));

    const addSkill = () => {
        const v = skillInput.trim();
        if (!v) return;
        setSkills((s) => (s.includes(v) ? s : [...s].concat(v).slice(0, 8)));
        setSkillInput("");
    };
    const removeSkill = (s) => setSkills((arr) => arr.filter((i) => i !== s));

    const onFile = (e) => {
        const f = e.target.files && e.target.files[0];
        if (f) toast({ title: "Lampiran siap", description: f.name });
    };

    const submit = (ev) => {
        ev.preventDefault();
        if (!title || !desc || !budget) {
            toast({ title: "Isi yang penting dulu", description: "Judul, deskripsi, & anggaran." });
            return;
        }

        const payload = { title, desc, cats, jobType, budget, deadline, skills, flexible, location: jobType === "onsite" ? location : "remote" };

        // UI feedback
        toast({ title: "Diposting ✅", description: "Santai, lagi dicari yang cocok." });

        // navigation simulation (replace with API call in real app)
        window.setTimeout(() => navigate("/job/123/track"), 900);

        console.debug("post payload", payload);
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Posting Pekerjaan — Kerjain</title>
            </Helmet>

            <div className="relative min-h-screen px-4 py-6 md:px-8 lg:px-12 bg-background text-foreground overflow-hidden">
                {/* subtle patterned background */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-transparent via-transparent to-transparent opacity-30" />

                {/* blobs */}
                <motion.div
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="pointer-events-none absolute -left-28 -top-24 w-[320px] h-[320px] md:w-[480px] md:h-[480px]"
                    style={{ filter: "blur(36px)" }}
                >
                    <svg viewBox="0 0 600 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gA" x1="0" x2="1">
                                <stop offset="0%" stopColor="rgba(124,58,237,0.28)" />
                                <stop offset="100%" stopColor="rgba(99,102,241,0.18)" />
                            </linearGradient>
                        </defs>
                        <motion.g animate={!reduce ? { y: [0, 14, 0] } : {}} transition={{ duration: 9, repeat: Infinity }}>
                            <path fill="url(#gA)" d="M300,30C380,10,520,40,560,120C600,200,520,320,430,370C340,420,200,420,120,360C40,300,40,160,140,100C220,50,260,50,300,30Z" />
                        </motion.g>
                    </svg>
                </motion.div>

                <motion.div
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    transition={{ duration: 0.9 }}
                    className="pointer-events-none right-[-8rem] bottom-[-10rem] absolute w-[300px] h-[300px] md:w-[440px] md:h-[440px]"
                    style={{ filter: "blur(40px)" }}
                >
                    <svg viewBox="0 0 600 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gB" x1="0" x2="1">
                                <stop offset="0%" stopColor="rgba(16,185,129,0.2)" />
                                <stop offset="100%" stopColor="rgba(6,95,70,0.14)" />
                            </linearGradient>
                        </defs>
                        <motion.g animate={!reduce ? { x: [0, -12, 0] } : {}} transition={{ duration: 11, repeat: Infinity }}>
                            <path fill="url(#gB)" d="M360,30C460,10,600,80,590,170C580,260,480,320,380,360C280,400,180,420,110,360C40,300,30,220,80,150C130,80,240,50,360,30Z" />
                        </motion.g>
                    </svg>
                </motion.div>

                {/* header */}
                <motion.header initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="relative z-10 mb-4 flex items-center gap-3">
                    <Link to="/client/dashboard">
                        <Button variant="ghost" size="icon" className="rounded-full bg-card/30">
                            <ArrowLeft className="h-5 w-5 text-foreground" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-lg font-semibold md:text-xl">Posting Pekerjaan</h1>
                        <p className="text-xs text-muted-foreground/70 -mt-1">Singkat — jelas — cepat</p>
                    </div>
                </motion.header>

                {/* main card */}
                <motion.main initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="relative z-10 max-w-3xl mx-auto">
                    <Card className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-xl shadow-lg overflow-hidden">
                        {/* top subtle gradient for glass sheen */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />

                        <CardContent className="p-4 md:p-6 relative">
                            <form onSubmit={submit} className="space-y-4">
                                {/* title + quick meta */}
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                    <div className="md:col-span-2">
                                        <Label htmlFor="title" className="text-sm text-foreground/80">Apa yang perlu dikerjain?</Label>
                                        <Input
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Co: Beliin kopi / Web dev"
                                            className="mt-1 bg-background/10 border-border/20"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-1">
                                        <Label className="text-sm text-foreground/80">Kategori</Label>
                                        <div className="mt-1 flex flex-wrap gap-2">
                                            {suggestionCats.map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() => addCategory(s)}
                                                    className="text-xs px-2 py-1 rounded-full border border-border/20 bg-background/10 hover:bg-background/20"
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mt-2 flex gap-2">
                                            <input
                                                value={catInput}
                                                onChange={(e) => setCatInput(e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCategory(catInput))}
                                                placeholder="Tambahkan kategori"
                                                className="w-full rounded-lg border border-border/30 bg-background/10 px-3 py-2 text-sm"
                                            />
                                            <Button type="button" size="sm" onClick={() => addCategory(catInput)}>Tambah</Button>
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {cats.map((c) => (
                                                <Chip key={c} onRemove={() => removeCategory(c)} icon={Tag}>{c}</Chip>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* desc */}
                                <div>
                                    <Label className="text-sm text-foreground/80">Deskripsi singkat</Label>
                                    <textarea
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        rows={3}
                                        placeholder="Kondisi & ekspektasi. Singkat aja."
                                        className="w-full mt-1 rounded-xl border border-border/30 bg-background/10 px-3 py-2 text-sm resize-none focus-visible:outline-none"
                                    />
                                </div>

                                {/* meta row */}
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                    <div>
                                        <Label className="text-sm text-foreground/80">Jenis</Label>
                                        <div className="mt-2 flex gap-2 flex-wrap">
                                            {jobTypes.map((t) => (
                                                <motion.button
                                                    key={t.id}
                                                    type="button"
                                                    onClick={() => setJobType(t.id)}
                                                    whileTap={{ scale: reduce ? 1 : 0.97 }}
                                                    className={`px-3 py-1 rounded-full text-sm font-medium border ${jobType === t.id ? "bg-primary text-primary-foreground border-primary" : "bg-background/10 border-border/20"}`}
                                                >
                                                    {t.label}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-sm text-foreground/80">Deadline</Label>
                                        <div className="mt-2">
                                            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full rounded-lg border border-border/30 bg-background/10 px-3 py-2 text-sm" />
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-sm text-foreground/80">Anggaran</Label>
                                        <div className="relative mt-2">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70"><DollarSign className="h-4 w-4" /></span>
                                            <Input id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Rp" className="pl-10 bg-background/10 border-border/20" type="number" required />
                                        </div>
                                    </div>
                                </div>

                                {/* location + attachment */}
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <div>
                                        <Label className="text-sm text-foreground/80">Lokasi</Label>
                                        <div className="mt-2">
                                            {jobType === "onsite" ? (
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70"><MapPin className="h-4 w-4" /></span>
                                                    <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Kota / alamat" className="pl-10 bg-background/10 border-border/20" />
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 rounded-lg border border-border/20 bg-background/5 px-3 py-2 text-sm">
                                                    <MapPinOff className="h-4 w-4 text-muted-foreground/70" />
                                                    <span className="text-sm text-muted-foreground/70">Jarak fleksibel</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-sm text-foreground/80">Lampiran</Label>
                                        <label className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-border/30 px-3 py-2 text-sm cursor-pointer bg-background/5">
                                            <Paperclip className="h-4 w-4 text-muted-foreground/70" />
                                            <span className="truncate text-sm text-muted-foreground/70">Klik / seret (opsional)</span>
                                            <input ref={fileRef} type="file" className="hidden" onChange={onFile} />
                                        </label>
                                    </div>
                                </div>

                                {/* skills + flexible */}
                                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div className="flex-1">
                                        <Label className="text-sm text-foreground/80">Skill</Label>
                                        <div className="mt-2 flex gap-2">
                                            <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} placeholder="Tambah skill, Enter" className="flex-1 rounded-lg border border-border/30 bg-background/10 px-3 py-2 text-sm" />
                                            <Button type="button" size="sm" onClick={addSkill}>Tambah</Button>
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {skills.map((s) => (
                                                <Chip key={s} icon={Tag} onRemove={() => removeSkill(s)}>{s}</Chip>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="md:w-40">
                                        <Label className="text-sm text-foreground/80">Fleksibel?</Label>
                                        <div className="mt-2">
                                            <motion.button whileTap={{ scale: reduce ? 1 : 0.97 }} type="button" onClick={() => setFlexible((v) => !v)} className={`w-full px-3 py-2 rounded-lg text-sm border ${flexible ? "bg-accent text-accent-foreground border-accent" : "bg-background/5 border-border/20"}`}>
                                                {flexible ? "Ya" : "Enggak"}
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>

                                {/* submit */}
                                <div>
                                    <Button type="submit" size="lg" className="w-full rounded-xl bg-primary text-primary-foreground font-semibold hover:scale-[1.01] hover:shadow-lg transition-transform group">
                                        Cari Pekerja
                                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </div>

                                <div className="pt-1 text-center">
                                    <p className="text-xs text-muted-foreground/60">Sedikit teks. Cepet. Gak bertele-tele.</p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.main>

                {/* floating decorative tiny blobs */}
                <div className="pointer-events-none absolute left-6 bottom-6 w-28 h-28 opacity-30 md:w-36 md:h-36">
                    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gTiny" x1="0" x2="1">
                                <stop offset="0%" stopColor="rgba(99,102,241,0.16)" />
                                <stop offset="100%" stopColor="rgba(16,185,129,0.12)" />
                            </linearGradient>
                        </defs>
                        <motion.path animate={!reduce ? {
                            d: [
                                "M43.1,-60.1C56.3,-51.7,65.6,-38.7,70.3,-24.6C75,-10.4,75.1,4.1,69.8,17.8C64.5,31.5,53.9,44.4,40.5,50.6C27.1,56.8,10.8,56.3,-3,59.8C-16.8,63.2,-33.7,70.5,-47.8,66.8C-61.8,63.2,-73,48.6,-74.9,33C-76.8,17.5,-69.5,1,-61.4,-16.7C-53.3,-34.4,-44.3,-53.3,-30.7,-61.6C-17.1,-69.9,1.2,-67.8,16.9,-61.7C32.6,-55.6,45.9,-45.3,43.1,-60.1Z",
                                "M43.1,-50.1C56.3,-41.7,65.6,-28.7,70.3,-14.6C75,-0.4,75.1,14.1,69.8,27.8C64.5,41.5,53.9,54.4,40.5,60.6C27.1,66.8,10.8,66.3,-3,69.8C-16.8,73.2,-33.7,80.5,-47.8,76.8C-61.8,73.2,-73,58.6,-74.9,43C-76.8,27.5,-69.5,11,-61.4,-6.7C-53.3,-24.4,-44.3,-43.3,-30.7,-51.6C-17.1,-59.9,1.2,-57.8,16.9,-51.7C32.6,-45.6,45.9,-35.3,43.1,-50.1Z"
                            ]
                        } : {}} transition={{ duration: 8, repeat: Infinity }} fill="url(#gTiny)" transform="translate(100 100)" />
                    </svg>
                </div>
            </div>
        </AnimatedPage>
    );
}
