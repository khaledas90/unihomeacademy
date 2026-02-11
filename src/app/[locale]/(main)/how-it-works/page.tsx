import React from "react";
import {
    UserPlus,
    Search,
    CalendarCheck,
    Mic2,
    ArrowRight,
    ChevronRight,
    PlayCircle,
    HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function HowToUsePage() {
    const steps = [
        {
            number: "01",
            title: "Create Your Account",
            desc: "Sign up in seconds. Tell us about your current level and your professional goals so we can personalize your experience.",
            icon: UserPlus,
            color: "from-blue-500 to-blue-600"
        },
        {
            number: "02",
            title: "Find Your Instructor",
            desc: "Browse our elite directory of world-class English teachers. Filter by specialty, price, and level to find your perfect match.",
            icon: Search,
            color: "from-indigo-500 to-indigo-600"
        },
        {
            number: "03",
            title: "Schedule Your First Session",
            desc: "Use our real-time booking system to pick a time that works for you. No more back-and-forth emails.",
            icon: CalendarCheck,
            color: "from-primary to-orange-600"
        },
        {
            number: "04",
            title: "Start Mastering English",
            desc: "Launch your private portal, join the live session, and start speaking with confidence from day one.",
            icon: Mic2,
            color: "from-green-500 to-green-600"
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 text-center mb-32">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
                    Your Success <span className="text-primary italic">Simplified</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                    Getting started with UniHome Academy is easy. Follow these four steps to begin your journey to English mastery.
                </p>
            </section>

            {/* Steps Visual Section */}
            <section className="container mx-auto px-4 mb-40 relative">
                {/* Connection Line (Desktop) */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 translate-y-[-50%]" />

                <div className="grid lg:grid-cols-4 gap-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="group relative text-center">
                            <div className={`w-24 h-24 mx-auto rounded-[2rem] bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-8 shadow-xl transform group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-300`}>
                                <step.icon className="w-10 h-10" />
                                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-slate-900 border-4 border-white flex items-center justify-center font-bold text-sm">
                                    {step.number}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed px-4">
                                {step.desc}
                            </p>
                            {idx < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-[48px] -right-4 translate-x-1/2 text-slate-200">
                                    <ChevronRight className="w-8 h-8 font-thin" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Video Demo Section */}
            <section className="bg-slate-50 py-32 overflow-hidden mb-32">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="w-16 h-1 bg-primary rounded-full" />
                            <h2 className="text-4xl font-bold text-slate-900">See the Platform in Action</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Take a quick 2-minute tour of our interactive classroom features, the booking portal, and our unique progress tracking system.
                            </p>
                            <Button size="lg" className="rounded-full px-8 h-14 bg-slate-900 gap-2">
                                <PlayCircle className="w-5 h-5" /> Watch Video Tutorial
                            </Button>
                        </div>
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border-[12px] border-white group cursor-pointer">
                            <div className="aspect-video bg-slate-900 flex items-center justify-center">
                                <div className="text-white/20 group-hover:text-primary transition-colors duration-500">
                                    <PlayCircle className="w-24 h-24" />
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="text-4xl font-bold text-slate-900">Have Questions?</h2>
                    <p className="text-slate-500">Everything you need to know about getting started.</p>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                    {[
                        { q: "Is there a free trial?", a: "Most of our instructors offer a short introductory session or assessment session at a reduced rate or for free. Check individual teacher profiles for details." },
                        { q: "What equipment do I need?", a: "Just a reliable internet connection, a microphone, and a webcam. Our platform works directly in your browser—no downloads required!" },
                        { q: "How do I pay for sessions?", a: "We support all major credit cards, PayPal, and local payment methods depending on your region. All transactions are securely encrypted." },
                        { q: "Can I change my teacher?", a: "Absolutely! You are free to book sessions with any teacher you like. We actually encourage trying different instructors to experience varied teaching styles." }
                    ].map((faq, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`} className="border border-slate-200 rounded-2xl px-6 bg-white overflow-hidden shadow-sm">
                            <AccordionTrigger className="text-lg font-bold text-slate-900 hover:text-primary transition-colors py-6">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600 text-base pb-6 leading-relaxed">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* Final CTA */}
            <section className="text-center py-32">
                <h2 className="text-3xl font-bold mb-8">Ready to try it yourself?</h2>
                <Button className="rounded-full px-12 h-16 text-lg font-black shadow-2xl hover:scale-105 transition-transform">
                    Register for Free <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
            </section>
        </div>
    );
}
