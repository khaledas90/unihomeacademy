"use client";

import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageCircle,
    Facebook,
    Instagram,
    Linkedin,
    Clock,
    Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function ContactUsPage() {
    const contactInfo = [
        {
            title: "Email Support",
            value: "hello@unihomeacademy.com",
            icon: Mail,
            link: "mailto:hello@unihomeacademy.com"
        },
        {
            title: "Direct WhatsApp",
            value: "+20 123 456 7890",
            icon: MessageCircle,
            link: "https://wa.me/201234567890"
        },
        {
            title: "Global HQ",
            value: "City Stars Hub, Cairo, Egypt",
            icon: MapPin,
            link: "#"
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 bg-slate-50">
            <div className="container mx-auto px-4">
           
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <h1 className="text-4xl md:text-5xl  text-slate-900 leading-tight mb-8">
                        Let's Start a <br />
                        <span className="text-primary ">Conversation</span>
                    </h1>
                    <p className="text-xl text-slate-500 leading-relaxed">
                        Have questions about our courses, teachers, or corporate training? Our team is ready to help you navigate your journey.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                   
                    <div className="lg:col-span-5 space-y-6">
                        <div className="grid gap-6">
                            {contactInfo.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.link}
                                    className="group p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center gap-6"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="text-slate-400 text-xs  uppercase tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-xl  text-slate-900">{item.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
 
                        <Card className="p-8 rounded-[2rem] border-none shadow-xl bg-slate-900 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px]" />
                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <span className="">Business Hours:</span> Mon - Fri, 9am - 6pm (GMT+2)
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-primary" />
                                    <span className="">Languages:</span> English, Arabic, French
                                </div>
                                <div className="flex gap-4 pt-4 border-t border-white/10">
                                    {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                                        <button key={i} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all">
                                            <Icon className="w-5 h-5" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>
 
                    <div className="lg:col-span-7">
                        <Card className="p-8 md:p-12 rounded-[2.5rem] border-none shadow-md bg-white animate-in fade-in slide-in-from-right-10 duration-700">
                            <form className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <Label htmlFor="name" className=" text-sm text-slate-700 ml-1">Full Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary hvr-outline-in"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="email" className=" text-sm text-slate-700 ml-1">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="subject" className=" text-sm text-slate-700 ml-1">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="How can we help?"
                                        className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary"
                                    />
                                </div> 
                                <div className="space-y-3">
                                    <Label htmlFor="message" className=" text-sm text-slate-700 ml-1">Your Message</Label>
                                    <Textarea
                                        id="message" 
                                        maxLength={500}
                                        placeholder="Tell us more about your inquiry..."
                                        className="min-h-[220px] rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary py-4"
                                    />
                                </div>

                                <Button size="lg" className="w-full h-16 rounded-2xl text-lg  shadow-xl hover:shadow-primary/20 bg-primary group transition-all duration-300">
                                    Send Message <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
