"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";

export const filterTabs = [
    { label: "All Lessons", value: "all", icon: "mdi:book-open-variant" },
    { label: "Today Lessons", value: "today", icon: "mdi:calendar-today" },
    { label: "Booked", value: "booked", icon: "mdi:calendar-check" },
    { label: "Completed", value: "completed", icon: "mdi:check-circle" },
    { label: "Live Session", value: "live", icon: "mdi:play-circle" },
    { label: "Cancelled", value: "cancelled", icon: "mdi:cancel" },
];

interface SessionFiltersProps {
    activeFilter: string;
    onFilterChange: (value: string) => void;
    variant?: "simple" | "elaborate";
}

export function SessionFilters({ activeFilter, onFilterChange, variant = "simple" }: SessionFiltersProps) {
    const [emblaRef] = useEmblaCarousel({
        dragFree: true,
        containScroll: "trimSnaps",
        align: "center"
    });

    if (variant === "elaborate") {
        return (
            <div className="w-full overflow-hidden mb-12" ref={emblaRef}>
                <div className="flex gap-3 px-4">
                    {filterTabs.map((tab) => {
                        const isActive = activeFilter === tab.value;
                        return (
                            <div key={tab.value} className="flex-none">
                                <button
                                    onClick={() => onFilterChange(tab.value)}
                                    className={cn(
                                        "px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 relative overflow-hidden group whitespace-nowrap",
                                        isActive
                                            ? "bg-gradient-to-r from-primary via-primary to-primary/90 text-white shadow-xl shadow-primary/40 scale-105"
                                            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 border-2 border-primary/30 hover:border-primary hover:bg-primary/5 hover:scale-105 hover:shadow-lg"
                                    )}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
                                    )}
                                    <span className="relative z-10 uppercase">{tab.label}</span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden mb-6" ref={emblaRef}>
            <div className="flex gap-3 px-4 py-1">
                {filterTabs.map((tab) => {
                    const isActive = activeFilter === tab.value;
                    return (
                        <div key={tab.value} className="flex-none">
                            <button
                                onClick={() => onFilterChange(tab.value)}
                                className={cn(
                                    "flex items-center cursor-pointer gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-300 font-bold whitespace-nowrap",
                                    isActive
                                        ? "bg-primary text-white"
                                        : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-2 border-primary/30 hover:border-primary hover:bg-primary/5"
                                )}
                            >
                                <Icon icon={tab.icon} width={18} height={18} />
                                <span>{tab.label}</span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
