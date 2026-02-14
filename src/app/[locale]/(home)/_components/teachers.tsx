"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star, GraduationCap, Search, Users,
    Globe, Clock, Mail, MessagesSquare, X, ChevronDown,
    ArrowUpDown, PlayCircle, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip as DescriptionTooltip } from "@/components/ui/tooltip-card";
import { useTeachers } from "@/store/api/useTeachers";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Teachers() {
    const [search, setSearch] = useState("");
    const [levelFilter, setLevelFilter] = useState<string | null>(null);
    const [countryFilter, setCountryFilter] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "rating" | null>(null);

    const { data: teachersData, isLoading } = useTeachers();
    const teachers = teachersData?.data?.teachers || [];

    const levels = useMemo(() => Array.from(new Set(teachers.map(t => t.level).filter(Boolean))), [teachers]);
    const countries = useMemo(() => Array.from(new Set(teachers.map(t => t.country).filter(Boolean))), [teachers]);

    const filteredTeachers = useMemo(() => {
        let result = teachers.filter(t => {
            const matchesSearch = `${t.firstname} ${t.lastname}`.toLowerCase().includes(search.toLowerCase()) ||
                t.intro.toLowerCase().includes(search.toLowerCase());
            const matchesLevel = levelFilter ? t.level === levelFilter : true;
            const matchesCountry = countryFilter ? t.country === countryFilter : true;
            return matchesSearch && matchesLevel && matchesCountry;
        });

        if (sortBy) {
            result = [...result].sort((a, b) => {
                if (sortBy === "price-asc") return a.start_from - b.start_from;
                if (sortBy === "price-desc") return b.start_from - a.start_from;
                if (sortBy === "rating") return (parseFloat(b.review) || 0) - (parseFloat(a.review) || 0);
                return 0;
            });
        }
        return result;
    }, [teachers, search, levelFilter, countryFilter, sortBy]);

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="rounded-[2rem] p-4 flex flex-col sm:flex-row gap-5 h-auto sm:h-44 border-none shadow-sm">
                    <Skeleton className="w-full sm:w-40 aspect-square sm:aspect-auto rounded-[1.5rem]" />
                    <div className="flex-1 space-y-3 py-1">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <div className="flex gap-3 mt-auto">
                            <Skeleton className="h-10 flex-1 rounded-xl" />
                            <Skeleton className="h-10 w-10 rounded-xl" />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );

    return (
        <TooltipProvider>
            <section className="py-16 bg-[#F8FAFC]">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div>
                            <Badge variant="outline" className="mb-3 px-4 py-1 flex w-fit border-primary/20 text-primary  bg-white text-[10px] uppercase tracking-widest rounded-full">Explore Experts</Badge>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl  text-slate-900 tracking-tight leading-none">Meet our <span className="text-primary">Expert</span> partners</h2>
                        </div>
                        <div className="flex gap-6 bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-100 shrink-0">
                            <div className="text-center px-2">
                                <p className="text-2xl  text-slate-900 leading-none">{teachers.length}+</p>
                                <p className="text-[10px]  text-slate-400 uppercase tracking-widest mt-2">Experts</p>
                            </div>
                            <div className="w-px h-10 bg-slate-100" />
                            <div className="text-center px-2">
                                <p className="text-2xl  text-primary leading-none">4.9</p>
                                <p className="text-[10px]  text-slate-400 uppercase tracking-widest mt-2">Rating</p>
                            </div>
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-sm border border-slate-100 mb-10">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="relative flex-[2.5]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4 opacity-40" />
                                <Input placeholder="Find instructor by name or subject..." className="h-11 pl-11 pr-10 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/20  text-slate-700 placeholder:text-slate-300 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
                                {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"><X className="w-4 h-4" /></button>}
                            </div>
                            <div className="flex gap-3 flex-1 md:flex-auto">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className={cn("h-11 flex-1 rounded-xl border-slate-100 gap-2  text-[11px] hover:bg-slate-50", levelFilter && "bg-primary/5 text-primary border-primary/20")}>
                                            <GraduationCap className="w-4 h-4 opacity-40" />
                                            {levelFilter || "Academic Level"}
                                            <ChevronDown className="w-3 h-3 ml-auto opacity-20" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="rounded-xl p-1 w-48 shadow-xl">
                                        <DropdownMenuItem onClick={() => setLevelFilter(null)} className="rounded-lg py-2  text-[11px]">All Levels</DropdownMenuItem>
                                        {levels.map(l => <DropdownMenuItem key={l} onClick={() => setLevelFilter(l)} className="rounded-lg py-2  text-[11px] text-zinc-600">{l}</DropdownMenuItem>)}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className={cn("h-11 flex-1 rounded-xl border-slate-100 gap-2  text-[11px] hover:bg-slate-50", countryFilter && "bg-primary/5 text-primary border-primary/20")}>
                                            <Globe className="w-4 h-4 opacity-40" />
                                            {countryFilter || "Location"}
                                            <ChevronDown className="w-3 h-3 ml-auto opacity-20" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="rounded-xl p-1 w-48 max-h-60 overflow-y-auto shadow-xl">
                                        <DropdownMenuItem onClick={() => setCountryFilter(null)} className="rounded-lg py-2  text-[11px]">Global Access</DropdownMenuItem>
                                        {countries.map(c => <DropdownMenuItem key={c} onClick={() => setCountryFilter(c)} className="rounded-lg py-2  text-[11px] text-zinc-600">{c}</DropdownMenuItem>)}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button onClick={() => setSortBy(sortBy === "price-asc" ? "price-desc" : "price-asc")} variant="outline" className={cn("h-11 w-11 p-0 rounded-xl border-slate-100 flex items-center justify-center transition-all", sortBy && "bg-primary/5 text-primary border-primary/20 shadow-inner")}>
                                    <ArrowUpDown className="w-4 h-4 opacity-40" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {isLoading ? <LoadingSkeleton /> : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredTeachers.map((teacher) => (
                                    <motion.div key={teacher.id} layout initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.99 }} transition={{ duration: 0.2 }}>
                                        <Card className="group relative overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-[2rem] bg-white p-4 flex flex-col sm:flex-row gap-5 h-auto">
                                            {/* Image Panel */}
                                            <div className="relative w-full sm:w-40 lg:w-48 aspect-square sm:aspect-auto rounded-[1.5rem] overflow-hidden bg-slate-50 shrink-0">
                                                <Image src={teacher.image || "/placeholder-avatar.png"} alt={`${teacher.firstname} ${teacher.lastname}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />

                                                {/* Youtube Button Overlay */}
                                                {teacher.youtube_link && (
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 rounded-[1.5rem] backdrop-blur-sm">
                                                        <a href={teacher.youtube_link} target="_blank" rel="noopener noreferrer" className="bg-white/90 text-red-600 p-3 rounded-full hover:scale-110 transition-transform shadow-xl">
                                                            <PlayCircle className="w-8 h-8 fill-red-600/10" />
                                                        </a>
                                                    </div>
                                                )}

                                                {/* Rating Badge */}
                                                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg shadow-sm">
                                                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                                    <span className=" text-slate-900 text-[11px]">{teacher.review || "5.0"}</span>
                                                    {teacher.reviewsCount && (
                                                        <span className="text-[10px] text-slate-400  border-l pl-1.5 ml-1">({teacher.reviewsCount})</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Details Panel */}
                                            <div className="flex-1 flex flex-col py-1 pr-1">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h3 className="text-[17px]  text-slate-900 group-hover:text-primary transition-colors leading-tight line-clamp-1">{teacher.firstname} {teacher.lastname}</h3>
                                                        <p className="text-[10px]  text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                                                            {teacher.level || "Expert"}
                                                            {teacher.country && (
                                                                <>
                                                                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                                    {teacher.country}
                                                                </>
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <p className="text-xl  text-slate-900 leading-none">{teacher.start_from}<span className="text-[10px]  text-slate-400 ml-1 uppercase">EGP</span></p>
                                                    </div>
                                                </div>

                                                <DescriptionTooltip
                                                    content={
                                                        <div className="max-w-xs">
                                                            <p className=" text-primary mb-1">About {teacher.firstname}</p>
                                                            <p className="text-slate-600 leading-relaxed">{teacher.intro}</p>
                                                        </div>
                                                    }
                                                >
                                                    <p className="text-slate-500 text-[13px] leading-relaxed mb-4 line-clamp-2 pl-3 border-l-2 border-slate-100 font-medium tracking-tight cursor-help">
                                                        "{teacher.intro}"
                                                    </p>
                                                </DescriptionTooltip>

                                                {/* Stats Group */}
                                                <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5 mt-auto">
                                                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600 transition-colors">
                                                        <Users className="w-4 h-4 opacity-60" />
                                                        <span className="text-[10px]  uppercase tracking-tight">{teacher.students || 0} Students</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600 transition-colors">
                                                        <BookOpen className="w-4 h-4 opacity-60" />
                                                        <span className="text-[10px]  uppercase tracking-tight">{teacher.lessons || 0} Lessons</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600 transition-colors">
                                                        <Clock className="w-4 h-4 opacity-60" />
                                                        <span className="text-[10px]  uppercase tracking-tight truncate max-w-[100px]">{teacher.timezone?.split('/')?.pop()?.replace('_', ' ') || "Available"}</span>
                                                    </div>
                                                </div>

                                                {/* Actions Row */}
                                                <div className="flex items-center gap-3 pt-3.5 border-t border-slate-50 mt-auto">
                                                    <Button asChild className="flex-1 rounded-xl bg-slate-900 hover:bg-primary h-10 text-[11px]  transition-all shadow-sm active:scale-95">
                                                        <Link href={`/teachers/profile/${teacher.id}`}>Check Profile</Link>
                                                    </Button>
                                                    <div className="flex gap-2">
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-slate-100 hover:bg-green-50 hover:text-green-600 transition-all" asChild>
                                                                    <a href={`https://wa.me/${teacher.whats}`} target="_blank" rel="noopener noreferrer">
                                                                        <MessagesSquare className="w-4.5 h-4.5" />
                                                                    </a>
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="text-[10px]  p-2.5 bg-slate-900 text-white rounded-xl shadow-2xl">WhatsApp Expert</TooltipContent>
                                                        </Tooltip>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-all" asChild>
                                                                    <a href={`mailto:${teacher.email}`}>
                                                                        <Mail className="w-4.5 h-4.5" />
                                                                    </a>
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent className="text-[10px]  p-2.5 bg-slate-900 text-white rounded-xl shadow-2xl">Email Expert</TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                                {filteredTeachers.length === 0 && <div className="col-span-full py-16 text-center text-slate-300  text-xs uppercase tracking-widest">No matching experts found</div>}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </section>
        </TooltipProvider>
    );
}
