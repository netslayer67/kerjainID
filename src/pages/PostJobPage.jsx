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
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedPage from "@/components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet";

const jobTypes = [
    { id: "remote", label: "WFH" },
    { id: "hybrid", label: "WFA" },
    { id: "onsite", label: "On-site" },
];

const suggestionCats = [
    "Ride",
    "Errand",
    "Design",
    "Web Dev",
    "Marketing",
    "Cleaning",
    "Tukang",
    "Event",
];

// chip component
function Chip({ children, onRemove, icon: Icon }) {
    return (
        <motion.span
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-border/30 bg-background/10 text-sm"
        >
            {Icon && <Icon className="h-4 w-4" />}
            <span className="truncate">{children}</span>
            {onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="ml-1 opacity-70 hover:opacity-100"
                >
                    <X className="h-3 w-3" />
                </button>
            )}
        </motion.span>
    );
}

// --- format number ke 20.000.000 ---
const formatRupiah = (val) => {
    if (!val) return "";
    const num = val.toString().replace(/\D/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function PostJobPage() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const reduce = useReducedMotion();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [cats, setCats] = useState([]);
    const [catInput, setCatInput] = useState("");
    const [jobType, setJobType] = useState("remote");
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");
    const [deadlineType, setDeadlineType] = useState("date"); // date | duration
    const [deadlineVal, setDeadlineVal] = useState("");
    const [deadlineUnit, setDeadlineUnit] = useState("hari"); // menit, jam, hari, bulan
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [flexible, setFlexible] = useState(true);
    const fileRef = useRef(null);

    const addCategory = (v) => {
        if (!v) return;
        const t = v.trim();
        if (!t) return;
        setCats((prev) => (prev.includes(t) ? prev : [...prev, t].slice(0, 6)));
        setCatInput("");
    };
    const removeCategory = (c) => setCats((p) => p.filter((i) => i !== c));

    const addSkill = () => {
        const v = skillInput.trim();
        if (!v) return;
        setSkills((s) => (s.includes(v) ? s : [...s, v].slice(0, 8)));
        setSkillInput("");
    };
    const removeSkill = (s) => setSkills((arr) => arr.filter((i) => i !== s));

    const onFile = (e) => {
        const f = e.target.files?.[0];
        if (f) toast({ title: "Lampiran ditambahkan", description: f.name });
    };

    const submit = (ev) => {
        ev.preventDefault();
        if (!title || !desc || !budget) {
            toast({ title: "Lengkapi dulu", description: "Judul, deskripsi, & anggaran wajib diisi." });
            return;
        }
        const payload = {
            title,
            desc,
            cats,
            jobType,
            budget,
            deadline: deadlineType === "date" ? deadlineVal : `${deadlineVal} ${deadlineUnit}`,
            skills,
            flexible,
            location: jobType === "onsite" ? location : "remote",
        };
        toast({ title: "Diposting ✅", description: "Pekerjaan sedang dicari." });
        setTimeout(() => navigate("/job/123/track"), 800);
        console.debug("post payload", payload);
    };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Post Job — Kerjain</title>
            </Helmet>

            <div className="min-h-screen px-4 py-6 md:px-8 lg:px-12 bg-background/30 rounded-xl text-foreground">
                {/* header */}
                <motion.header
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-5 flex items-center gap-3"
                >
                    <Link to="/client/dashboard">
                        <Button variant="ghost" size="icon" className="rounded-full bg-card/30">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-lg font-semibold md:text-xl">Posting Job</h1>
                        <p className="text-xs text-muted-foreground/70">Ringkas & cepat</p>
                    </div>
                </motion.header>

                {/* form card */}
                <motion.main
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto"
                >
                    <Card className="rounded-2xl border border-border/30 bg-card/50 backdrop-blur-xl shadow-lg">
                        <CardContent className="p-4 md:p-6">
                            <form onSubmit={submit} className="space-y-4">
                                {/* title */}
                                <div>
                                    <Label htmlFor="title">Judul</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Contoh: Beli kopi / Web dev"
                                        className="mt-1 bg-background/10 border-border/20"
                                        required
                                    />
                                </div>

                                {/* kategori */}
                                <div>
                                    <Label>Kategori</Label>
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
                                            onKeyDown={(e) =>
                                                e.key === "Enter" && (e.preventDefault(), addCategory(catInput))
                                            }
                                            placeholder="Tambah kategori"
                                            className="flex-1 rounded-lg border border-border/30 bg-background/10 px-3 py-2 text-sm"
                                        />
                                        <Button type="button" size="sm" onClick={() => addCategory(catInput)}>
                                            Tambah
                                        </Button>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {cats.map((c) => (
                                            <Chip key={c} onRemove={() => removeCategory(c)} icon={Tag}>
                                                {c}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>

                                {/* desc */}
                                <div>
                                    <Label>Deskripsi</Label>
                                    <textarea
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        rows={3}
                                        placeholder="Tuliskan detail singkat"
                                        className="w-full mt-1 rounded-xl border border-border/30 bg-background/10 px-3 py-2 text-sm resize-none"
                                    />
                                </div>

                                {/* meta row */}
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                    {/* job type */}
                                    <div>
                                        <Label>Jenis</Label>
                                        <div className="mt-2 flex gap-2 flex-wrap">
                                            {jobTypes.map((t) => (
                                                <motion.button
                                                    key={t.id}
                                                    type="button"
                                                    onClick={() => setJobType(t.id)}
                                                    whileTap={{ scale: reduce ? 1 : 0.97 }}
                                                    className={`px-3 py-1 rounded-full text-sm border ${jobType === t.id
                                                            ? "bg-primary text-primary-foreground border-primary"
                                                            : "bg-background/10 border-border/20"
                                                        }`}
                                                >
                                                    {t.label}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* deadline */}
                                    <div>
                                        <Label>Deadline</Label>
                                        <div className="mt-2 space-y-2">
                                            <select
                                                value={deadlineType}
                                                onChange={(e) => setDeadlineType(e.target.value)}
                                                className="w-full rounded-lg border border-border/30 bg-background/10 px-3 py-2 text-sm"
                                            >
                                                <option value="date">Tanggal</option>
                                                <option value="duration">Durasi</option>
                                            </select>
                                            {deadlineType === "date" ? (
                                                <input
                                                    type="date"
                                                    value={deadlineVal}
                                                    onChange={(e) => setDeadlineVal(e.target.value)}
                                                    className="w-full rounded-lg border border-border/30 bg-background/10 px-3 py-2 text-sm"
                                                />
                                            ) : (
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="number"
                                                        value={deadlineVal}
                                                        onChange={(e) => setDeadlineVal(e.target.value)}
                                                        placeholder="10"
                                                        className="flex-1 bg-background/10 border-border/20"
                                                    />
                                                    <select
                                                        value={deadlineUnit}
                                                        onChange={(e) => setDeadlineUnit(e.target.value)}
                                                        className="rounded-lg border border-border/30 bg-background/10 px-2 text-sm"
                                                    >
                                                        <option value="menit">Menit</option>
                                                        <option value="jam">Jam</option>
                                                        <option value="hari">Hari</option>
                                                        <option value="bulan">Bulan</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* budget */}
                                    <div>
                                        <Label>Anggaran</Label>
                                        <div className="relative mt-2">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                                            <input
                                                value={budget}
                                                onChange={(e) => setBudget(formatRupiah(e.target.value))}
                                                placeholder="Rp"
                                                className="pl-10 w-full rounded-lg border border-border/30 bg-background/10 px-3 py-2 text-sm"
                                                inputMode="numeric"
                                                pattern="[0-9.]*"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* location + attachment */}
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <div>
                                        <Label>Lokasi</Label>
                                        <div className="mt-2">
                                            {jobType === "onsite" ? (
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                                                    <Input
                                                        value={location}
                                                        onChange={(e) => setLocation(e.target.value)}
                                                        placeholder="Kota / alamat"
                                                        className="pl-10 bg-background/10 border-border/20"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 rounded-lg border border-border/20 bg-background/5 px-3 py-2 text-sm">
                                                    <MapPinOff className="h-4 w-4 text-muted-foreground/70" />
                                                    <span className="text-sm text-muted-foreground/70">Fleksibel</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label>Lampiran</Label>
                                        <label className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-border/30 px-3 py-2 text-sm cursor-pointer bg-background/5">
                                            <Paperclip className="h-4 w-4 text-muted-foreground/70" />
                                            <span className="truncate text-sm text-muted-foreground/70">
                                                Upload file (opsional)
                                            </span>
                                            <input ref={fileRef} type="file" className="hidden" onChange={onFile} />
                                        </label>
                                    </div>
                                </div>

                                {/* skills */}
                                <div>
                                    <Label>Skill</Label>
                                    <div className="mt-2 flex gap-2">
                                        <input
                                            value={skillInput}
                                            onChange={(e) => setSkillInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                                            placeholder="Tambah skill"
                                            className="flex-1 rounded-lg border border-border/30 bg-background/10 px-3 py-2 text-sm"
                                        />
                                        <Button type="button" size="sm" onClick={addSkill}>
                                            Tambah
                                        </Button>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {skills.map((s) => (
                                            <Chip key={s} icon={Tag} onRemove={() => removeSkill(s)}>
                                                {s}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>

                                {/* flexible */}
                                <div>
                                    <Label>Fleksibel?</Label>
                                    <motion.button
                                        whileTap={{ scale: reduce ? 1 : 0.97 }}
                                        type="button"
                                        onClick={() => setFlexible((v) => !v)}
                                        className={`mt-2 w-full px-3 py-2 rounded-lg text-sm border ${flexible
                                                ? "bg-accent text-accent-foreground border-accent"
                                                : "bg-background/5 border-border/20"
                                            }`}
                                    >
                                        {flexible ? "Ya" : "Tidak"}
                                    </motion.button>
                                </div>

                                {/* submit */}
                                <div>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full rounded-xl bg-primary text-primary-foreground font-semibold hover:scale-[1.01] hover:shadow-lg transition-transform group"
                                    >
                                        Cari Pekerja
                                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.main>
            </div>
        </AnimatedPage>
    );
}
