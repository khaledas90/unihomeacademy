"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const filterTabs = [
  { label: "ALL LESSONS", value: "all" },
  { label: "TODAY LESSONS", value: "today" },
  { label: "BOOKED", value: "booked" },
  { label: "COMPLETED", value: "completed" },
  { label: "LIVE SESSION", value: "live" },
  { label: "CANCELLED", value: "cancelled" },
];

export default function SessionsPage() {
  const [activeFilter, setActiveFilter] = useState("live");

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Title */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent drop-shadow-sm">
              Ses
            </span>
            <span className="bg-gradient-to-r from-secondary via-secondary to-secondary/80 bg-clip-text text-transparent drop-shadow-sm">
              sions
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full shadow-lg shadow-primary/30" />
            <div className="h-1.5 w-20 bg-gradient-to-r from-secondary to-secondary/50 rounded-full shadow-lg shadow-secondary/30" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={cn(
                  "px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 relative overflow-hidden group",
                  isActive
                    ? "bg-gradient-to-r from-primary via-primary to-primary/90 text-white shadow-xl shadow-primary/40 scale-105"
                    : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 border-2 border-primary/30 hover:border-primary hover:bg-primary/5 hover:scale-105 hover:shadow-lg"
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 px-4">
          {/* Illustration */}
          <div className="relative mb-12 animate-fade-in">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent rounded-full blur-3xl animate-pulse" />
              
              {/* Magnifying Glass */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative animate-bounce-slow">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
                  <Icon
                    icon="mdi:magnify"
                    width={140}
                    height={140}
                    className="text-primary drop-shadow-2xl relative z-10"
                  />
                  {/* Sad Face */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="flex flex-col items-center gap-1.5 mt-2">
                      <div className="flex gap-3">
                        <div className="w-3 h-3 bg-gray-500 rounded-full animate-blink" />
                        <div className="w-3 h-3 bg-gray-500 rounded-full animate-blink" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <div className="w-10 h-1 bg-gray-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Decorative Shapes */}
              <div className="absolute top-8 left-8 animate-float">
                <div className="w-4 h-4 bg-primary/30 rounded-full blur-sm" />
              </div>
              <div className="absolute top-12 right-12 animate-float-delayed">
                <Icon
                  icon="mdi:plus"
                  width={24}
                  height={24}
                  className="text-primary/40"
                />
              </div>
              <div className="absolute bottom-16 left-16 animate-float">
                <div className="w-3 h-3 bg-secondary/30 rounded-full blur-sm" />
              </div>
              <div className="absolute bottom-12 right-8 animate-float-delayed">
                <div className="w-5 h-5 bg-secondary/20 rounded-full blur-sm" />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-10 space-y-4 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              No live sessions available.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-lg text-lg leading-relaxed">
              It seems you don't have any sessions at the moment. Please go to
              book sessions with your favorite teacher!
            </p>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="group bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary text-white px-10 py-7 text-lg font-bold shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110 rounded-xl"
            onClick={() => {
              // Navigate to teachers page
              window.location.href = "/dashboard/teachers";
            }}
          >
            <Icon 
              icon="mdi:account-supervisor" 
              className="mr-2 group-hover:scale-110 transition-transform duration-300" 
              width={22} 
              height={22} 
            />
            Book a Session
          </Button>
        </div>
      </div>
    </div>
  );
}
