import React from "react";
import {
    Rocket,
    Target,
    ShieldCheck,
    Clock,
    Award,
    HeartHandshake,
    ArrowRight,
    TrendingUp,
    Globe2,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhyUsPage() {
    const benefits = [
        {
            title: "Real-World Focus",
            desc: "Our curriculum isn't just about grammar; it's about giving you the tools to succeed in professional meetings, interviews, and global business.",
            icon: Target,
            color: "bg-blue-50 text-blue-600"
        },
        {
            title: "24/7 Learning Access",
            desc: "Access recorded sessions and interactive materials anytime, anywhere. Your schedule shouldn't be an obstacle to your success.",
            icon: Clock,
            color: "bg-orange-50 text-orange-600"
        },
        {
            title: "Certified Methodology",
            desc: "We use internationally recognized teaching standards that ensure rapid progress and retention of complex linguistic skills.",
            icon: Award,
            color: "bg-green-50 text-green-600"
        },
        {
            title: "Dynamic Expert Community",
            desc: "Join a network of thousands of professionals and expert teachers who support each other in achieving fluency.",
            icon: HeartHandshake,
            color: "bg-purple-50 text-purple-600"
        },
        {
            title: "Global Reach",
            desc: "Practice with students from over 45 countries, gaining exposure to different accents and cultural perspectives.",
            icon: Globe2,
            color: "bg-cyan-50 text-cyan-600"
        },
        {
            title: "Accelerated Growth",
            desc: "Our intensive programs are designed to get you from beginner to confident speaker in record time.",
            icon: Zap,
            color: "bg-yellow-50 text-yellow-600"
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 overflow-hidden">
         
            <section className="container mx-auto px-4 text-center mb-24 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-primary font-bold text-xs uppercase tracking-widest">The UniHome Advantage</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-8">
                    The Smarter Way to <br />
                    <span className="italic underline decoration-primary/30">Master English</span>
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    We combined professional expertise with cutting-edge technology to build a platform that actually delivers results.
                </p>
            </section>
 
            <section className="container mx-auto px-4 mb-32">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {benefits.map((benefit, idx) => (
                        <div key={idx} className="group relative p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                            <div className={`w-14 h-14 rounded-2xl ${benefit.color} flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform`}>
                                <benefit.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                            <p className="text-slate-500 leading-relaxed mb-6">
                                {benefit.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
 
            <section className="bg-slate-900 py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] mix-blend-screen" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-20 text-white">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Unrivaled Experience</h2>
                        <p className="text-slate-400 max-w-xl mx-auto">How we compare to traditional learning methods.</p>
                    </div>

                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                            <h4 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">Traditional Schooling</h4>
                            <ul className="space-y-6">
                                {["Fixed, rigid schedules", "Generic textbook material", "Large, passive classes", "Slow feedback loops"].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-400 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 rounded-3xl bg-primary/10 border border-primary/20 relative group overflow-hidden">
                            <div className="absolute top-4 right-4 animate-bounce">
                                <Rocket className="text-primary w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-8 border-b border-primary/20 pb-4">UniHome Academy</h4>
                            <ul className="space-y-6">
                                {[
                                    "Complete flexibility 24/7",
                                    "Career-specific curriculum",
                                    "One-on-one & Small groups",
                                    "Instant, AI-enhanced analytics"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-white font-medium text-sm">
                                        <ShieldCheck className="w-5 h-5 text-primary" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
 
            <section className="py-32 container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-12 italic">
                        "We don't just teach English; we build the bridge to your next career breakthrough."
                    </h2>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" className="rounded-full cursor-pointer px-10 h-14 text-lg font-bold">
                            Join Us Today <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
