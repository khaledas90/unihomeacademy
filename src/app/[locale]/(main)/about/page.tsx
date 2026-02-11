import React from "react";
import Image from "next/image";
import { CheckCircle2, Globe, GraduationCap, ShieldCheck, Users } from "lucide-react";
import heroImage from "@/assets/students-learning-together.jpg";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
        
            <section className="relative pt-32 pb-20 items-center overflow-hidden bg-slate-50">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-slate-900">
                            Transforming Lives Through <br />
                            <span className="bg-primary bg-clip-text text-transparent italic">English Excellence</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            UniHome Academy is more than just a language school. We're a global community dedicated to helping you achieve your professional and personal goals through English.
                        </p>
                    </div>
                </div>
 
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
            </section>
 
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative group">
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                                <Image
                                    src={heroImage}
                                    alt="Our Story"
                                    className="w-full h-auto object-cover aspect-[4/3]"
                                />
                            </div>
                            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/20 rounded-3xl -z-10 animate-blob" />
                        </div>

                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Legacy</span>
                            </div>
                            <h2 className="text-4xl font-bold text-slate-900">Empowering Students Worldwide Since 2020</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Founded with a vision to bridge the communication gap in the global market, UniHome Academy provides high-quality English education that is accessible, affordable, and effective.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { title: "Personalized Learning", desc: "Curriculums tailored to your specific career needs." },
                                    { title: "Expert Instructors", desc: "Learn from native and bilingual professionals." },
                                    { title: "Interactive Hub", desc: "Modern platform with real-time collaboration." },
                                    { title: "Career Support", desc: "We don't just teach English; we help you find jobs." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="mt-1">
                                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{item.title}</h4>
                                            <p className="text-sm text-slate-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-colors group">
                            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110">
                                <Globe className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-3xl font-bold mb-6 italic">Our Mission</h3>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                To democratize English education by providing a premium learning experience that equips students with the linguistic tools necessary for global competition, personal growth, and cross-cultural understanding.
                            </p>
                        </div>

                        <div className="p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-secondary/50 transition-colors group">
                            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110">
                                <GraduationCap className="w-8 h-8 text-secondary" />
                            </div>
                            <h3 className="text-3xl font-bold mb-6 italic">Our Vision</h3>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                To become the world's most trusted partner for career-focused English learning, recognized for our results-driven methods and our vibrant community of successful professionals.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Animated Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[100px]" />
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Students", value: "12K+", icon: Users },
                            { label: "Teachers", value: "200+", icon: GraduationCap },
                            { label: "Countries", value: "45+", icon: Globe },
                            { label: "Success Rate", value: "98%", icon: ShieldCheck }
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center space-y-2 p-6 rounded-2xl hover:bg-slate-50 transition-colors">
                                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                    <stat.icon className="w-6 h-6 text-primary" />
                                </div>
                                <div className="text-4xl font-bold text-slate-900 leading-none">{stat.value}</div>
                                <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
