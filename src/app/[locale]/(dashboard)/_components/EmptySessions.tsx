"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptySessionsProps {
    filter: string;
}

export function EmptySessions({ filter }: EmptySessionsProps) {
    const isAll = filter === "all";

    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="relative mb-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="relative animate-bounce-slow">
                    <Icon
                        icon="mdi:magnify-close"
                        width={120}
                        height={120}
                        className="text-gray-300 dark:text-gray-700 drop-shadow-sm"
                    />
                </div>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    No {isAll ? "" : filter} sessions found
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    It seems you don't have any {isAll ? "" : filter} sessions at the moment.
                    Ready to start learning?
                </p>
            </div>

            <Button
                asChild
                size="lg"
                className="mt-10 group bg-slate-900 hover:bg-primary text-white px-10 h-14 font-black rounded-2xl shadow-xl shadow-slate-200 hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1"
            >
                <Link href="/teachers">
                    <Icon
                        icon="mdi:account-supervisor"
                        className="mr-2"
                        width={20}
                    />
                    Book a New Session
                </Link>
            </Button>
        </div>
    );
}
