"use client";

import React, { useState } from "react";
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
    MessagesSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import instructorFay from "@/assets/instructor-image.jpg";

const allTeachers = [
    {
        id: 19,
        image: instructorFay,
        firstname: "Fay",
        lastname: "Khalil",
        level: "فوق المتقدم",
        review: "5.0",
        specialty: "English Literature",
        start_from: 800,
        lessons: 423,
        students: 270,
        country: "Lebanon",
        gender: "female",
        timezone: "Asia/Beirut",
        email: "teacher.fay1@gmail.com",
        whats: "5325551",
        intro: "Welcome to my English Learning Adventure! I've been dedicated to teaching English for over 13 years, both online and in person, to learners of all ages. I focus on improving your pronunciation and conversational skills through interactive and fun sessions.",
        youtube_link: "https://www.youtube.com/embed/bvXa-ciail8",
    },
    {
        id: 20,
        image: "https://images.unsplash.com/photo-1544717297-fa154da09f9d?q=80&w=2070&auto=format&fit=crop",
        firstname: "Sarah",
        lastname: "Johnson",
        level: "Senior native",
        review: "4.9",
        specialty: "Business English",
        start_from: 1200,
        lessons: 156,
        students: 89,
        country: "USA",
        gender: "female",
        timezone: "America/New_York",
        email: "sarah.j@unihome.com",
        whats: "1234567",
        intro: "Hi, I'm Sarah! I specialize in helping professionals master Business English. My goal is to give you the confidence to speak fluently in any corporate setting.",
        youtube_link: "#",
    },
    {
        id: 21,
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
        firstname: "Michael",
        lastname: "Smith",
        level: "Expert Tutor",
        review: "4.8",
        specialty: "General English",
        start_from: 600,
        lessons: 890,
        students: 540,
        country: "UK",
        gender: "male",
        timezone: "Europe/London",
        email: "michael.s@unihome.com",
        whats: "9876543",
        intro: "Experienced English teacher with a passion for creative methods. I make learning grammar and vocabulary feel like a breeze!",
        youtube_link: "#",
    },
];

export default function TeachersPage() {
    const [search, setSearch] = useState("");

    const filteredTeachers = allTeachers.filter(t =>
        `${t.firstname} ${t.lastname}`.toLowerCase().includes(search.toLowerCase()) ||
        t.specialty.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Header */}
                    <div className="text-center mb-12 space-y-3">
                        <Badge variant="outline" className="px-4 py-1 border-primary/20 text-primary font-bold bg-primary/5">
                            Our Faculty
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            Meet Your <span className="text-primary italic">Success</span> Partners
                        </h1>
                        <p className="text-base text-slate-500 max-w-xl mx-auto font-medium">
                            World-class education delivered by passionate experts.
                        </p>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="max-w-3xl mx-auto mb-16 flex flex-col md:flex-row gap-3 items-center">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                placeholder="Search by name or expertise..."
                                className="h-12 pl-11 rounded-xl bg-white border-slate-200 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="h-12 px-6 rounded-xl border-slate-200 bg-white gap-2 font-bold text-slate-600 hover:text-primary transition-colors">
                            <Filter className="w-4 h-4" /> Filters
                        </Button>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredTeachers.map((teacher) => (
                                <motion.div
                                    layout
                                    key={teacher.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Card className="group relative overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem] bg-white p-3 flex flex-col h-full">
                                        {/* Image Box */}
                                        <div className="relative aspect-[1.1/1] rounded-[1.5rem] overflow-hidden bg-slate-100">
                                            <Image
                                                src={teacher.image}
                                                alt={`${teacher.firstname} ${teacher.lastname}`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            {/* Rating Overlay */}
                                            <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                                                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                                <span className="font-bold text-slate-800 text-xs">{teacher.review}</span>
                                            </div>
                                            {/* Video Play Trigger */}
                                            {teacher.youtube_link !== "#" && (
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                                                    <a href={teacher.youtube_link} target="_blank" rel="noopener" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                                                        <PlayCircle className="w-6 h-6" />
                                                    </a>
                                                </div>
                                            )}
                                        </div>

                                        {/* Main Content */}
                                        <div className="px-3 pt-5 pb-2 flex flex-col flex-1">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="text-xl font-bold text-slate-900 leading-none mb-1.5">
                                                        {teacher.firstname} {teacher.lastname}
                                                    </h3>
                                                    <div className="flex items-center gap-1.5 text-primary">
                                                        <GraduationCap className="w-4 h-4" />
                                                        <span className="text-[11px] font-black uppercase tracking-wider">{teacher.level}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase">From</span>
                                                    <span className="text-lg font-black text-slate-900 leading-none">{teacher.start_from}<span className="text-[10px] font-normal ml-0.5">LE</span></span>
                                                </div>
                                            </div>

                                            <p className="text-slate-500 text-[13px] leading-relaxed mb-5 line-clamp-2">
                                                {teacher.intro}
                                            </p>

                                            {/* Quick Stats Grid */}
                                            <div className="grid grid-cols-2 gap-2 mb-6">
                                                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
                                                    <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                                        <Users className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] text-slate-400 font-bold leading-none mb-0.5">Students</div>
                                                        <div className="text-xs font-black text-slate-700">{teacher.students}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
                                                    <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                                        <BookOpen className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] text-slate-400 font-bold leading-none mb-0.5">Lessons</div>
                                                        <div className="text-xs font-black text-slate-700">{teacher.lessons}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Extra Info Pills */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold cursor-help">
                                                            <Globe className="w-3 h-3" /> {teacher.country}
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Country: {teacher.country}</TooltipContent>
                                                </Tooltip>

                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold cursor-help">
                                                            <Clock className="w-3 h-3" /> {teacher.timezone.split('/')[1].replace('_', ' ')}
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Timezone: {teacher.timezone}</TooltipContent>
                                                </Tooltip>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 mt-auto">
                                                <Button size="sm" className="flex-1 rounded-xl bg-slate-900 hover:bg-primary font-bold transition-all h-10 group/btn">
                                                    View Profile
                                                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                                <div className="flex gap-1.5">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600">
                                                                <Mail className="w-4 h-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Email: {teacher.email}</TooltipContent>
                                                    </Tooltip>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-green-50 hover:text-green-600">
                                                                <MessagesSquare className="w-4 h-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Whatsapp: {teacher.whats}</TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
}
