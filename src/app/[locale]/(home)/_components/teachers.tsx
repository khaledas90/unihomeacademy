"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, GraduationCap, ArrowRight, Play, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useTeachers } from "@/store/api/useTeachers";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Teachers() {
    const { data: teachersData, isLoading } = useTeachers();
    const teachers = teachersData?.data?.teachers || [];

    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            slidesToScroll: 1,
            breakpoints: {
                "(min-width: 640px)": { slidesToScroll: 2 }
            }
        },
        [Autoplay({ delay: 4000, stopOnInteraction: false, playOnInit: true })]
    );

    const LoadingSkeleton = () => (
        <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] px-2">
                    <Card className="rounded-[2rem] overflow-hidden border-none shadow-sm h-[450px]">
                        <Skeleton className="h-1/2 w-full" />
                        <div className="p-4 space-y-3">
                            <div className="flex justify-between">
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-5 w-10" />
                            </div>
                            <Skeleton className="h-12 w-full" />
                            <div className="flex justify-between pt-3 border-t border-dashed">
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-8 w-24" />
                            </div>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );

    return (
        <section className="py-20 bg-gradient-to-b from-white to-[#F8FAFC] overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-3 px-3 py-0.5 border-primary/20 text-primary font-bold bg-primary/5 text-[10px]">
                        Our Faculty
                    </Badge>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3"
                    >
                        Meet Our <span className="text-primary">Expert Teachers</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base text-slate-500 max-w-xl mx-auto font-medium"
                    >
                        Learn from highly qualified educators who are passionate about your success
                    </motion.p>
                </div>

                {/* Carousel */}
                <div className="max-w-[1400px] mx-auto">
                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : (
                        <div className="embla overflow-hidden" ref={emblaRef}>
                            <div className="embla__container flex -ml-4">
                                {teachers.map((teacher) => (
                                    <div key={teacher.id} className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] pl-4 py-4">
                                        <Card className="group h-full overflow-hidden border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_45px_rgb(0,0,0,0.08)] transition-all duration-500 rounded-[2rem] bg-white">
                                            {/* Image Section */}
                                            <div className="relative aspect-[4/4.5] overflow-hidden">
                                                <Image
                                                    src={teacher.image || "/placeholder-avatar.png"}
                                                    alt={`${teacher.firstname} ${teacher.lastname}`}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                {/* Overlay for Video Play */}
                                                {teacher.youtube_link && teacher.youtube_link !== "#" && (
                                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                                        <a
                                                            href={teacher.youtube_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary transform scale-0 group-hover:scale-100 transition-transform duration-500 hover:bg-primary hover:text-white shadow-lg"
                                                        >
                                                            <Play className="w-5 h-5 fill-current ml-0.5" />
                                                        </a>
                                                    </div>
                                                )}
                                                {/* Badge */}
                                                <div className="absolute top-4 left-4">
                                                    <Badge className="bg-white/95 backdrop-blur-md text-primary border-none font-black px-3 py-1 rounded-xl shadow-sm hover:bg-white text-[9px] uppercase tracking-wider">
                                                        {/* @ts-ignore */}
                                                        {teacher.level || "Expert"}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-5">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h3 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
                                                            {teacher.firstname} {teacher.lastname}
                                                        </h3>
                                                        <div className="flex items-center gap-1 text-slate-400 mt-0.5">
                                                            <GraduationCap className="w-3 h-3" />
                                                            <span className="text-[10px] font-bold">{teacher.country}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-0.5 bg-yellow-50 px-1.5 py-0.5 rounded-lg text-yellow-600">
                                                        <Star className="w-2.5 h-2.5 fill-current" />
                                                        <span className="text-[10px] font-black">{teacher.review || "5.0"}</span>
                                                    </div>
                                                </div>

                                                <p className="text-slate-500 text-xs mb-6 line-clamp-2 font-medium leading-relaxed italic">
                                                    "{teacher.intro}"
                                                </p>

                                                <div className="flex items-center justify-between pt-4 border-t border-dashed border-slate-100">
                                                    <div>
                                                        <p className="text-[9px] text-slate-400 uppercase tracking-widest font-black mb-0.5">From</p>
                                                        <p className="text-lg font-black text-slate-900">{teacher.start_from}<span className="text-[10px] font-normal text-slate-400 ml-0.5">LE</span></p>
                                                    </div>
                                                    <Button variant="outline" className="rounded-xl border-slate-100 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 font-bold h-9 px-4 text-xs">
                                                        Profile <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* View All Teachers CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-20"
                >
                    <Button asChild size="lg" className="rounded-2xl bg-slate-900 hover:bg-primary font-black px-10 h-10 shadow-xl shadow-slate-200 hover:shadow-primary/20 transform hover:-translate-y-1 transition-all duration-500">
                        <Link href="/teachers">
                            Show All Instructors
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
