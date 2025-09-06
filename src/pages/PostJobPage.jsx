// src/pages/PostJobPage.jsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Send,
    Paperclip,
    MapPin,
    DollarSign,
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

/* ---------- constants ---------- */
const JOB_TYPES = [
    { id: "remote", label: "WFH" },
    { id: "hybrid", label: "WFA" },
    { id: "onsite", label: "On-site" },
];

const SUGGESTION_CATS = [
    "Ride",
    "Errand",
    "Design",
    "Web Dev",
    "Marketing",
    "Cleaning",
    "Handyman",
    "Event",
];

const MAX_CATEGORIES = 6;
const MAX_SKILLS = 8;

/* ---------- small helper components ---------- */
const Chip = React.memo(function Chip({ children, onRemove, Icon }) {
    return (
        <motion.span
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-background/5 px-3 py-1 text-xs"
        >
            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            <span className="max-w-[10rem] truncate">{children}</span>
            {onRemove && (
                <button
                    type="button"
                    aria-label={`Hapus ${children}`}
                    onClick={onRemove}
                    className="ml-1 inline-flex items-center justify-center rounded-full p-0.5 text-muted-foreground hover:bg-muted/10"
                >
                    <X className="h-3 w-3" />
                </button>
            )}
        </motion.span>
    );
});

/* ---------- util ---------- */
const formatRupiah = (val) => {
    if (val == null) return "";
    const digits = String(val).replace(/[^\d]/g, "");
    if (!digits) return "";
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const toNumber = (formatted) => Number(String(formatted).replace(/\D/g, "") || 0);

/* ---------- main page ---------- */
export default function PostJobPage() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const reduce = useReducedMotion();

    // form state
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [categories, setCategories] = useState([]);
    const [catInput, setCatInput] = useState("");
    const [jobType, setJobType] = useState("remote");
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");
    const [deadlineType, setDeadlineType] = useState("date"); // date | duration
    const [deadlineVal, setDeadlineVal] = useState("");
    const [deadlineUnit, setDeadlineUnit] = useState("hari");
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [flexible, setFlexible] = useState(true);
    const [attachment, setAttachment] = useState(null);

    const fileRef = useRef(null);

    /* ---------- handlers ---------- */
    const addCategory = useCallback(
        (v) => {
            if (!v) return;
            const t = v.trim();
            if (!t) return;
            if (categories.includes(t)) {
                toast({ title: "Kategori sudah ada", description: t });
                return;
            }
            if (categories.length >= MAX_CATEGORIES) {
                toast({ title: "Batas kategori", description: `Maks ${MAX_CATEGORIES} kategori` });
                return;
            }
            setCategories((s) => [...s, t]);
            setCatInput("");
        },
        [categories, toast]
    );

    const removeCategory = useCallback((c) => setCategories((s) => s.filter((x) => x !== c)), []);

    const addSkill = useCallback(() => {
        const v = skillInput.trim();
        if (!v) return;
        if (skills.includes(v)) {
            toast({ title: "Skill sudah ada", description: v });
            setSkillInput("");
            return;
        }
        if (skills.length >= MAX_SKILLS) {
            toast({ title: "Batas skill", description: `Maks ${MAX_SKILLS} skill` });
            return;
        }
        setSkills((s) => [...s, v]);
        setSkillInput("");
    }, [skillInput, skills, toast]);

    const removeSkill = useCallback((s) => setSkills((arr) => arr.filter((i) => i !== s)), []);

    const onFile = useCallback(
        (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setAttachment({ name: f.name, size: f.size, file: f });
            toast({ title: "Lampiran ditambahkan", description: f.name });
        },
        [toast]
    );

    const removeAttachment = useCallback(() => setAttachment(null), []);

    const handleBudgetChange = useCallback((e) => {
        setBudget(formatRupiah(e.target.value));
    }, []);

    const isValid = useMemo(() => {
        return title.trim() && desc.trim() && toNumber(budget) > 0;
    }, [title, desc, budget]);

    const submit = useCallback(
        (ev) => {
            ev.preventDefault();
            if (!isValid) {
                toast({ title: "Lengkapi form", description: "Judul, deskripsi & anggaran wajib diisi." });
                return;
            }

            const payload = {
                title: title.trim(),
                desc: desc.trim(),
                categories,
                jobType,
                budget: toNumber(budget),
                deadline: deadlineType === "date" ? deadlineVal : `${deadlineVal} ${deadlineUnit}`,
                skills,
                flexible,
                location: jobType === "onsite" ? location.trim() : "remote",
                attachmentName: attachment?.name ?? null,
            };

            // visual feedback
            toast({ title: "Diposting", description: "Mencari pekerja terbaik..." });

            // log payload (replace with API call)
            console.debug("Post job payload:", payload);

            // simulate redirect to tracking page
            setTimeout(() => navigate("/job/123/track"), 800);
        },
        [
            isValid,
            title,
            desc,
            categories,
            jobType,
            budget,
            deadlineType,
            deadlineVal,
            deadlineUnit,
            skills,
            flexible,
            location,
            attachment,
            navigate,
            toast,
        ]
    );

    /* preview data */
    const preview = useMemo(
        () => ({
            title: title || "Judul pekerjaan (preview)",
            desc: desc || "Deskripsi singkat tentang tugas yang ingin Anda posting.",
            amount: budget ? `Rp ${formatRupiah(toNumber(budget))}` : "—",
            type: JOB_TYPES.find((t) => t.id === jobType)?.label ?? jobType,
            location: jobType === "onsite" ? location || "Lokasi belum diisi" : "Remote / Fleksibel",
            categories,
            skills,
            deadline: deadlineType === "date" ? deadlineVal || "—" : `${deadlineVal || "—"} ${deadlineUnit}`,
            attachment: attachment?.name ?? null,
        }),
        [title, desc, budget, jobType, location, categories, skills, deadlineType, deadlineVal, deadlineUnit, attachment]
    );

    const prefersReducedMotion = reduce;

    /* ---------- styles / motion ---------- */
    const cardMotion = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.32 } };

    return (
        <AnimatedPage>
            <Helmet>
                <title>Posting Pekerjaan — Kerjain</title>
            </Helmet>

            <div className="min-h-screen px-4 py-6 lg:px-12">
                {/* header */}
                <motion.header {...cardMotion} className="mb-6 flex items-center gap-3">
                    <Link to="/client/dashboard" aria-label="Kembali ke dashboard">
                        <Button variant="ghost" size="icon" className="rounded-full bg-card/30 hover:bg-card/50 transition-colors duration-300">
                            <ArrowLeft className="h-5 w-5 text-foreground" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-lg md:text-xl font-semibold text-foreground">Posting Job</h1>
                        <p className="text-xs text-muted-foreground">Buat posting singkat agar cepat mendapatkan penawar.</p>
                    </div>
                </motion.header>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* form column */}
                    <motion.main {...cardMotion} className="lg:col-span-7">
                        <Card className="rounded-2xl border border-border/30 bg-card/60 backdrop-blur-xl shadow-lg">
                            <CardContent className="p-4 md:p-6">
                                <form onSubmit={submit} className="space-y-4">
                                    {/* title */}
                                    <div>
                                        <Label htmlFor="title">Judul</Label>
                                        <Input
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Contoh: Antar dokumen / Buat landing page"
                                            className="mt-1 bg-background/5 border-border/20"
                                            required
                                        />
                                    </div>

                                    {/* categories */}
                                    <div>
                                        <Label>Kategori</Label>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {SUGGESTION_CATS.map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() => addCategory(s)}
                                                    className="text-xs rounded-full px-2 py-1 border border-border/20 bg-background/5 hover:bg-accent/10 transition-colors duration-300"
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="mt-3 flex gap-2">
                                            <Input
                                                value={catInput}
                                                onChange={(e) => setCatInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        addCategory(catInput);
                                                    }
                                                }}
                                                placeholder="Tambah kategori (Enter)"
                                                className="flex-1 bg-background/5 border-border/20"
                                            />
                                            <Button type="button" size="sm" onClick={() => addCategory(catInput)} className="min-w-[88px]">
                                                Tambah
                                            </Button>
                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {categories.map((c) => (
                                                <Chip key={c} Icon={Tag} onRemove={() => removeCategory(c)}>
                                                    {c}
                                                </Chip>
                                            ))}
                                        </div>
                                    </div>

                                    {/* description */}
                                    <div>
                                        <Label>Deskripsi</Label>
                                        <textarea
                                            value={desc}
                                            onChange={(e) => setDesc(e.target.value)}
                                            rows={4}
                                            placeholder="Jelaskan tugas secara singkat & jelas (apa yang perlu dikerjakan, hasil yang diharapkan)."
                                            className="w-full mt-1 rounded-xl border border-border/30 bg-background/5 px-3 py-2 text-sm resize-none"
                                            required
                                        />
                                        <p className="mt-1 text-xs text-muted-foreground">Tip: sertakan batas waktu, revisi, atau file referensi jika perlu.</p>
                                    </div>

                                    {/* meta row */}
                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                        {/* job type */}
                                        <div>
                                            <Label>Jenis</Label>
                                            <div className="mt-2 flex gap-2 flex-wrap">
                                                {JOB_TYPES.map((t) => (
                                                    <motion.button
                                                        key={t.id}
                                                        type="button"
                                                        whileTap={{ scale: prefersReducedMotion ? 1 : 0.97 }}
                                                        onClick={() => setJobType(t.id)}
                                                        className={`px-3 py-1 rounded-full text-sm border transition-colors duration-300 ${jobType === t.id
                                                                ? "bg-accent text-accent-foreground border-accent shadow-sm"
                                                                : "bg-background/5 border-border/20 hover:bg-card/50"
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
                                                    className="w-full rounded-lg border border-border/30 bg-background/5 px-3 py-2 text-sm"
                                                    aria-label="Pilih tipe deadline"
                                                >
                                                    <option value="date">Tanggal</option>
                                                    <option value="duration">Durasi</option>
                                                </select>

                                                {deadlineType === "date" ? (
                                                    <input
                                                        type="date"
                                                        value={deadlineVal}
                                                        onChange={(e) => setDeadlineVal(e.target.value)}
                                                        className="w-full rounded-lg border border-border/30 bg-background/5 px-3 py-2 text-sm"
                                                        aria-label="Pilih tanggal deadline"
                                                    />
                                                ) : (
                                                    <div className="flex gap-2">
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            value={deadlineVal}
                                                            onChange={(e) => setDeadlineVal(e.target.value)}
                                                            placeholder="10"
                                                            className="flex-1 bg-background/5 border-border/20"
                                                            aria-label="Durasi deadline"
                                                        />
                                                        <select
                                                            value={deadlineUnit}
                                                            onChange={(e) => setDeadlineUnit(e.target.value)}
                                                            className="rounded-lg border border-border/30 bg-background/5 px-2 text-sm"
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
                                                    onChange={handleBudgetChange}
                                                    placeholder="0"
                                                    className="pl-10 w-full rounded-lg border border-border/30 bg-background/5 px-3 py-2 text-sm"
                                                    inputMode="numeric"
                                                    pattern="[0-9.]*"
                                                    aria-label="Anggaran pekerjaan (IDR)"
                                                    required
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
                                                            className="pl-10 bg-background/5 border-border/20"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 rounded-lg border border-border/20 bg-background/5 px-3 py-2 text-sm">
                                                        <MapPinOff className="h-4 w-4 text-muted-foreground/70" />
                                                        <span className="text-sm text-muted-foreground">Fleksibel / Remote</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Lampiran (opsional)</Label>
                                            <label
                                                htmlFor="attachment"
                                                className="mt-2 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border/30 px-3 py-2 text-sm bg-background/5 hover:bg-card/50 transition-colors duration-300"
                                            >
                                                <Paperclip className="h-4 w-4 text-muted-foreground/70" />
                                                <span className="truncate text-sm text-muted-foreground">
                                                    {attachment?.name ?? "Upload file (jpg, png, pdf)"}
                                                </span>
                                                <input id="attachment" ref={fileRef} type="file" onChange={onFile} className="hidden" />
                                            </label>

                                            {attachment && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <span className="text-xs text-muted-foreground/80">{attachment.name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={removeAttachment}
                                                        className="text-xs text-destructive hover:underline"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* skills */}
                                    <div>
                                        <Label>Skill (opsional)</Label>
                                        <div className="mt-2 flex gap-2">
                                            <Input
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        addSkill();
                                                    }
                                                }}
                                                placeholder="Tambah skill & tekan Enter"
                                                className="flex-1 bg-background/5 border-border/20"
                                            />
                                            <Button type="button" size="sm" onClick={addSkill}>
                                                Tambah
                                            </Button>
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {skills.map((s) => (
                                                <Chip key={s} Icon={Tag} onRemove={() => removeSkill(s)}>
                                                    {s}
                                                </Chip>
                                            ))}
                                        </div>
                                    </div>

                                    {/* flexible */}
                                    <div>
                                        <Label>Fleksibel?</Label>
                                        <div className="mt-2">
                                            <motion.button
                                                whileTap={{ scale: prefersReducedMotion ? 1 : 0.97 }}
                                                type="button"
                                                onClick={() => setFlexible((v) => !v)}
                                                className={`w-full rounded-lg px-3 py-2 text-sm transition-colors duration-300 ${flexible ? "bg-accent text-accent-foreground shadow-sm" : "bg-background/5 border border-border/20"
                                                    }`}
                                                aria-pressed={flexible}
                                            >
                                                {flexible ? "Ya — fleksibel untuk lokasi/waktu" : "Tidak — butuh spesifik"}
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* submit */}
                                    <div>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className={`w-full rounded-xl bg-primary text-primary-foreground font-semibold transition-transform duration-300 ${isValid ? "hover:scale-[1.01] hover:shadow-lg" : "opacity-60 pointer-events-none"}`}
                                            aria-disabled={!isValid}
                                        >
                                            Cari Pekerja
                                            <Send className="ml-2 h-4 w-4 transition-transform" />
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.main>

                    {/* preview column */}
                    <motion.aside {...cardMotion} className="lg:col-span-5 hidden lg:block">
                        <div className="sticky top-6">
                            <Card className="rounded-2xl border border-border/30 bg-card/50 backdrop-blur-xl shadow-lg">
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="text-base font-semibold text-foreground">Preview Posting</h3>
                                            <p className="text-xs text-muted-foreground">Tinjau sebelum dipublikasikan</p>
                                        </div>
                                        <div className="text-xs text-muted-foreground">Live</div>
                                    </div>

                                    <div className="mt-4 space-y-3">
                                        <div className="rounded-xl border border-border/20 bg-background/5 p-3">
                                            <h4 className="truncate text-sm font-semibold text-foreground">{preview.title}</h4>
                                            <p className="mt-1 text-xs text-muted-foreground line-clamp-3">{preview.desc}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-lg bg-background/5 p-3">
                                                <p className="text-xs text-muted-foreground">Tipe</p>
                                                <p className="mt-1 font-medium">{preview.type}</p>
                                            </div>
                                            <div className="rounded-lg bg-background/5 p-3">
                                                <p className="text-xs text-muted-foreground">Anggaran</p>
                                                <p className="mt-1 font-medium">{preview.amount}</p>
                                            </div>
                                        </div>

                                        <div className="rounded-lg bg-background/5 p-3">
                                            <p className="text-xs text-muted-foreground">Lokasi</p>
                                            <p className="mt-1 font-medium">{preview.location}</p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground">Kategori</p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {preview.categories.length ? preview.categories.map((c) => <span key={c} className="rounded-full bg-background/10 px-3 py-1 text-xs">{c}</span>) : <span className="text-xs text-muted-foreground">—</span>}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground">Skill</p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {preview.skills.length ? preview.skills.map((s) => <span key={s} className="rounded-full bg-background/10 px-3 py-1 text-xs">{s}</span>) : <span className="text-xs text-muted-foreground">—</span>}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-muted-foreground">Deadline</p>
                                            <p className="text-sm font-medium">{preview.deadline}</p>
                                        </div>

                                        {preview.attachment && (
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <span>Attachment</span>
                                                <span className="truncate max-w-[10rem]">{preview.attachment}</span>
                                            </div>
                                        )}

                                        <div className="mt-3">
                                            <p className="text-xs text-muted-foreground">Ringkasan</p>
                                            <div className="mt-2 rounded-md border border-border/20 bg-background/5 p-3 text-xs">
                                                <div><strong className="text-foreground">Posting:</strong> {preview.title}</div>
                                                <div><strong className="text-foreground">Budget:</strong> {preview.amount}</div>
                                                <div><strong className="text-foreground">Tipe:</strong> {preview.type}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <Button variant="ghost" size="sm" className="flex-1" onClick={() => toast({ title: "Simpan sebagai draft", description: "Fitur draft (coming soon)" })}>
                                            Simpan Draft
                                        </Button>
                                        <Button size="sm" className="flex-1 bg-primary text-primary-foreground" onClick={() => { /* scroll to form submit */ document.querySelector("form")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}>
                                            Edit
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.aside>
                </div>
            </div>
        </AnimatedPage>
    );
}
