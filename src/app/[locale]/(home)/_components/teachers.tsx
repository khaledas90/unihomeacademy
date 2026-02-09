"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, GraduationCap, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const teachers = [
    {
        id: 19,
        image: "https://admin.unihomeacademy.com/public/images/EwDSugCKN9f4EnEgOzOiXSKqWJM8cT22FTChaxGK.jpg",
        firstname: "Fay",
        lastname: "Khalil",
        level: "فوق المتقدم",
        review: "5",
        start_from: 800,
        intro: "Welcome to my English Learning Adventure! I'm Teacher Fay, and I've been dedicated to teaching English for over 13 years, both online and in person, to learners of all ages. My classes are designed to be engaging and enjoyable.",
        youtube_link: "https://www.youtube.com/embed/bvXa-ciail8",
    },
];

export default function Teachers() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-[#fff5f2]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Meet Our <span className="text-primary">Expert Teachers</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-foreground/60 max-w-2xl mx-auto"
                    >
                        Learn from highly qualified educators who are passionate about your success
                    </motion.p>
                </div>

                {/* Teachers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {teachers.map((teacher, index) => (
                        <motion.div
                            key={teacher.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="group overflow-hidden border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 rounded-3xl bg-white">
                                {/* Image Section */}
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <Image
                                        src={teacher.image}
                                        alt={`${teacher.firstname} ${teacher.lastname}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Overlay for Video Play */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                        <a
                                            href={teacher.youtube_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary transform scale-0 group-hover:scale-100 transition-transform duration-500 hover:bg-primary hover:text-white"
                                        >
                                            <Play className="w-6 h-6 fill-current ml-1" />
                                        </a>
                                    </div>
                                    {/* Badge */}
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-white/90 backdrop-blur-sm text-primary border-none font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-white">
                                            {teacher.level}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                            {teacher.firstname} {teacher.lastname}
                                        </h3>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="text-sm font-bold text-foreground">{teacher.review}</span>
                                        </div>
                                    </div>

                                    <p className="text-foreground/60 text-sm mb-6 line-clamp-3 italic">
                                        "{teacher.intro}"
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-dashed border-border">
                                        <div>
                                            <p className="text-xs text-foreground/40 uppercase tracking-wider font-bold mb-1">Starting from</p>
                                            <p className="text-xl font-bold text-primary">{teacher.start_from} <span className="text-sm font-normal text-foreground/60">LE</span></p>
                                        </div>
                                        <Button variant="outline" className="rounded-full border-primary/20 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300">
                                            View Profile <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* View All Teachers CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <Button size="lg" className="rounded-full px-8 h-14 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-1 transition-all duration-300">
                        Show All Instructors
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
