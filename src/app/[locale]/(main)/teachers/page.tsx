"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star,
    GraduationCap,
    ArrowRight,
    Search,
    Filter,
    Users,
    BookOpen,
    Globe,
    Clock,
    PlayCircle,
    Mail,
    MessagesSquare,
    X,
    ChevronDown,
    SlidersHorizontal,
    ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTeachers } from "@/store/api/useTeachers";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TeachersPage() {
    const [search, setSearch] = useState("");
    const [levelFilter, setLevelFilter] = useState<string | null>(null);
    const [countryFilter, setCountryFilter] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "rating" | null>(null);

    const { data: teachersData, isLoading } = useTeachers();
    const teachers = teachersData?.data?.teachers || [];

    // Extract unique levels and countries for filters
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="rounded-[2.5rem] p-3 flex flex-col h-[520px] border-none shadow-sm">
                    <Skeleton className="w-full aspect-[1.1/1] rounded-[2rem]" />
                    <div className="px-3 pt-6 space-y-4">
                        <div className="flex justify-between">
                            <Skeleton className="h-7 w-40" />
                            <Skeleton className="h-6 w-16" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <Skeleton className="h-12 rounded-2xl" />
                            <Skeleton className="h-12 rounded-2xl" />
                        </div>
                        <Skeleton className="h-12 w-full rounded-2xl mt-4" />
                    </div>
                </Card>
            ))}
        </div>
    );

    const activeFiltersCount = (levelFilter ? 1 : 0) + (countryFilter ? 1 : 0) + (sortBy ? 1 : 0);

    const resetFilters = () => {
        setSearch("");
        setLevelFilter(null);
        setCountryFilter(null);
        setSortBy(null);
    };

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Header Section */}
                    <div className="text-center mb-16 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Badge variant="outline" className="px-5 py-1.5 border-primary/20 text-primary font-black bg-primary/5 uppercase tracking-widest text-[10px]">
                                World-Class Faculty
                            </Badge>
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            Meet Your <span className="text-primary">Success</span> Partners
                        </h1>
                        <p className="text-base text-slate-500 max-w-xl mx-auto font-medium">
                            World-class education delivered by passionate experts.
                        </p>
                    </div>

                    {/* Filter & Search Dashboard */}
                    <div className="max-w-6xl mx-auto mb-12">
                        <div className="bg-white rounded-[2.5rem] p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 mb-6">
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Search Bar */}
                                <div className="relative flex-[2]">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                                    <Input
                                        placeholder="Search by name, expertise, or language..."
                                        className="h-14 pl-14 pr-10 rounded-2xl bg-slate-50/50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-medium text-slate-600 placeholder:text-slate-400 text-base"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    {search && (
                                        <button
                                            onClick={() => setSearch("")}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 bg-slate-200/50 rounded-full transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>

                                {/* Filters Group */}
                                <div className="flex flex-wrap md:flex-nowrap gap-3 flex-1 lg:flex-auto">
                                    {/* Level Filter */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className={`h-14 flex-1 rounded-2xl border-slate-100 gap-3 font-bold text-sm px-6 hover:bg-slate-50 transition-all ${levelFilter ? 'border-primary/50 text-primary bg-primary/5' : 'text-slate-600'}`}>
                                                <GraduationCap className="w-4 h-4 opacity-50" />
                                                {levelFilter || "Academic Level"}
                                                <ChevronDown className="w-4 h-4 opacity-30" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="rounded-2xl p-2 border-slate-100 w-56">
                                            <DropdownMenuItem onClick={() => setLevelFilter(null)} className="rounded-xl py-2.5 font-bold">All Levels</DropdownMenuItem>
                                            {levels.map(level => (
                                                <DropdownMenuItem key={level} onClick={() => setLevelFilter(level)} className="rounded-xl py-2.5 font-bold">{level}</DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    {/* Country Filter */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className={`h-14 flex-1 rounded-2xl border-slate-100 gap-3 font-bold text-sm px-6 hover:bg-slate-50 transition-all ${countryFilter ? 'border-primary/50 text-primary bg-primary/5' : 'text-slate-600'}`}>
                                                <Globe className="w-4 h-4 opacity-50" />
                                                {countryFilter || "Location"}
                                                <ChevronDown className="w-4 h-4 opacity-30" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="rounded-2xl p-2 border-slate-100 w-56 scrollbar-thin max-h-80 overflow-y-auto">
                                            <DropdownMenuItem onClick={() => setCountryFilter(null)} className="rounded-xl py-2.5 font-bold">Anywhere</DropdownMenuItem>
                                            {countries.map(country => (
                                                <DropdownMenuItem key={country} onClick={() => setCountryFilter(country)} className="rounded-xl py-2.5 font-bold">{country}</DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    {/* Sort Dropdown */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className={`h-14 px-6 rounded-2xl border-slate-100 gap-3 font-bold text-sm hover:bg-slate-50 transition-all ${sortBy ? 'border-primary/50 text-primary bg-primary/5' : 'text-slate-600'}`}>
                                                <ArrowUpDown className="w-4 h-4 opacity-50" />
                                                <span className="hidden sm:inline">Sort By</span>
                                                <ChevronDown className="w-4 h-4 opacity-30" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-2xl p-2 border-slate-100 w-56">
                                            <DropdownMenuItem onClick={() => setSortBy("rating")} className="rounded-xl py-2.5 font-bold">Top Rated</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setSortBy("price-asc")} className="rounded-xl py-2.5 font-bold">Price: Low to High</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setSortBy("price-desc")} className="rounded-xl py-2.5 font-bold">Price: High to Low</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            {/* Active Filters Bar */}
                            {activeFiltersCount > 0 && (
                                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                        {levelFilter && (
                                            <Badge variant="secondary" className="bg-primary/10 text-primary border-none rounded-full px-4 py-1.5 gap-2 group">
                                                Level: {levelFilter}
                                                <X className="w-3.5 h-3.5 cursor-pointer opacity-50 hover:opacity-100" onClick={() => setLevelFilter(null)} />
                                            </Badge>
                                        )}
                                        {countryFilter && (
                                            <Badge variant="secondary" className="bg-primary/10 text-primary border-none rounded-full px-4 py-1.5 gap-2 group">
                                                Country: {countryFilter}
                                                <X className="w-3.5 h-3.5 cursor-pointer opacity-50 hover:opacity-100" onClick={() => setCountryFilter(null)} />
                                            </Badge>
                                        )}
                                        {sortBy && (
                                            <Badge variant="secondary" className="bg-primary/10 text-primary border-none rounded-full px-4 py-1.5 gap-2 group">
                                                Sorted By: {sortBy.replace('-', ' ')}
                                                <X className="w-3.5 h-3.5 cursor-pointer opacity-50 hover:opacity-100" onClick={() => setSortBy(null)} />
                                            </Badge>
                                        )}
                                    </div>
                                    <button
                                        onClick={resetFilters}
                                        className="text-[11px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors flex items-center gap-2"
                                    >
                                        <Filter className="w-3 h-3" /> Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Results Count Meta */}
                        <div className="flex items-center justify-between px-6 text-slate-400 font-bold text-xs uppercase tracking-widest">
                            <p>Showing {filteredTeachers.length} Experts Available Now</p>
                            <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Updated realtime</p>
                        </div>
                    </div>

                    {/* Teacher Grid */}
                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredTeachers.length > 0 ? (
                                    filteredTeachers.map((teacher) => (
                                        <motion.div
                                            layout
                                            key={teacher.id}
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Card className="group relative overflow-hidden border-none shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-500 rounded-[2.5rem] bg-white p-3.5 flex flex-col h-full transform transition-gpu hover:-translate-y-2">
                                                {/* Visual Container */}
                                                <div className="relative aspect-[1.1/1] rounded-[2rem] overflow-hidden bg-slate-50">
                                                    <Image
                                                        src={teacher.image || "/placeholder-avatar.png"}
                                                        alt={`${teacher.firstname} ${teacher.lastname}`}
                                                        fill
                                                        priority={false}
                                                        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out grayscale-[20%] group-hover:grayscale-0 shadow-inner"
                                                    />

                                                    {/* Overlays */}
                                                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                                                        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                                                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                                            <span className="font-black text-slate-900 text-xs tracking-tighter">{teacher.review || "5.0"}</span>
                                                        </div>
                                                        <Badge className="bg-slate-900/10 backdrop-blur-sm text-slate-900 border-none font-bold text-[9px] uppercase px-3 py-1.5 rounded-full">
                                                            {teacher.country}
                                                        </Badge>
                                                    </div>

                                                    {/* Interactive Layer */}
                                                    {teacher.youtube_link && teacher.youtube_link !== "#" && (
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-900/30 backdrop-blur-[2px]">
                                                            <a
                                                                href={teacher.youtube_link}
                                                                target="_blank"
                                                                rel="noopener"
                                                                className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500 hover:bg-primary hover:text-white"
                                                            >
                                                                <PlayCircle className="w-8 h-8 fill-current" />
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content Dashboard */}
                                                <div className="px-4 pt-6 pb-2 flex flex-col flex-1">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="space-y-1">
                                                            <h3 className="text-2xl font-black text-slate-900 leading-none group-hover:text-primary transition-colors tracking-tight">
                                                                {teacher.firstname} {teacher.lastname}
                                                            </h3>
                                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                                <GraduationCap className="w-4 h-4 opacity-70" />
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">
                                                                    {/* @ts-ignore */}
                                                                    {teacher.level || "Expert Faculty"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end shrink-0">
                                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Starting Hourly</span>
                                                            <div className="flex items-baseline gap-1">
                                                                <span className="text-2xl font-black text-slate-900 leading-none">{teacher.start_from}</span>
                                                                <span className="text-[10px] font-bold text-slate-400">LE</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 font-medium italic">
                                                        "{teacher.intro}"
                                                    </p>

                                                    {/* Teacher Stats Panel */}
                                                    <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50/80 p-3 rounded-[1.5rem] border border-slate-100/50">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
                                                                <Users className="w-4.5 h-4.5" />
                                                            </div>
                                                            <div>
                                                                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Students</div>
                                                                <div className="text-sm font-black text-slate-900">{teacher.students || 0}</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-2xl bg-white shadow-sm flex items-center justify-center text-orange-500">
                                                                <BookOpen className="w-4.5 h-4.5" />
                                                            </div>
                                                            <div>
                                                                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Lessons</div>
                                                                <div className="text-sm font-black text-slate-900">{teacher.lessons || 0}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Dynamic Meta Info */}
                                                    <div className="flex flex-wrap gap-2 mb-8">
                                                        <div className="flex items-center gap-2 bg-slate-100/50 hover:bg-slate-100 transition-colors px-3 py-1.5 rounded-full text-[10px] font-black text-slate-600 border border-transparent hover:border-slate-200 cursor-default">
                                                            <Clock className="w-3 h-3 opacity-50" />
                                                            {teacher.timezone?.split('/')?.[1]?.replace('_', ' ') || teacher.timezone || "General Timezone"}
                                                        </div>
                                                        <div className="flex items-center gap-2 bg-slate-100/50 hover:bg-slate-100 transition-colors px-3 py-1.5 rounded-full text-[10px] font-black text-slate-600 border border-transparent hover:border-slate-200 cursor-default">
                                                            <SlidersHorizontal className="w-3 h-3 opacity-50" />
                                                            {teacher.level || "Full Access"}
                                                        </div>
                                                    </div>

                                                    {/* Interactive CTAs */}
                                                    <div className="flex items-center gap-3 mt-auto">
                                                        <Button size="lg" className="flex-1 rounded-2xl bg-slate-900 hover:bg-primary shadow-xl shadow-slate-200 hover:shadow-primary/30 font-black transition-all h-10 group/btn">
                                                            View Full Profile
                                                            <ArrowRight className="w-4.5 h-4.5 ml-3 group-hover/btn:translate-x-1.5 transition-transform" />
                                                        </Button>
                                                        <div className="flex gap-2">
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button variant="outline" size="icon" className="w-10 h-10 rounded-2xl border-slate-100 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                                                                        <Mail className="w-5 h-5" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent className="rounded-xl font-bold">Email: {teacher.email}</TooltipContent>
                                                            </Tooltip>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button variant="outline" size="icon" className="w-10 h-10 rounded-2xl border-slate-100 bg-white hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all shadow-sm">
                                                                        <MessagesSquare className="w-5 h-5" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent className="rounded-xl font-bold">WhatsApp: {teacher.whats}</TooltipContent>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200"
                                    >
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                            <Search className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-2">No Matching Experts</h3>
                                        <p className="text-slate-500 font-medium mb-8">We couldn't find any teachers matching your current filters.</p>
                                        <Button onClick={resetFilters} variant="outline" className="rounded-xl border-primary text-primary font-bold hover:bg-primary/5">
                                            Clear All Filters
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </TooltipProvider>
    );
}
