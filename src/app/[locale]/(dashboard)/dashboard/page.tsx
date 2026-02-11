"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const statsCards = [
  {
    title: "Total Sessions",
    value: "24",
    change: "+12%",
    icon: "mdi:calendar-clock",
    color: "from-primary to-primary/80",
    bgColor: "bg-primary/10",
  },
  {
    title: "Completed",
    value: "18",
    change: "+8%",
    icon: "mdi:check-circle",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Upcoming",
    value: "6",
    change: "+3",
    icon: "mdi:clock-outline",
    color: "from-secondary to-secondary/80",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Teachers",
    value: "5",
    change: "Active",
    icon: "mdi:account-supervisor",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
  },
];

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-6 md:py-8">
        
        <div className="mb-8 flex items-center gap-3">
        
          <div>
            <h1 className="text-2xl flex items-center gap-2 md:text-3xl font-semibold text-gray-900 dark:text-white mb-1">
              Welcome Back !   <Icon icon="mdi:hand-wave" width={32} height={32} className="text-primary" />
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Here's what's happening with your sessions today
            </p>
          </div>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card
              key={index}
              className={cn(
                "border-0 shadow-sm hover:shadow-md transition-all overflow-hidden",
                stat.bgColor
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <div className={cn("p-2 rounded-lg bg-gradient-to-br", stat.color, "opacity-20")}>
                  <Icon icon={stat.icon} width={20} height={20} className={cn("text-white")} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "All Lessons", value: "all", icon: "mdi:book-open-variant" },
              { label: "Today Lessons", value: "today", icon: "mdi:calendar-today" },
              { label: "Booked", value: "booked", icon: "mdi:calendar-check" },
              { label: "Completed", value: "completed", icon: "mdi:check-circle" },
              { label: "Live Session", value: "live", icon: "mdi:play-circle" },
              { label: "Cancelled", value: "cancelled", icon: "mdi:cancel" },
            ].map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={cn(
                    "flex items-center cursor-pointer  gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300",
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-2 border-primary/30 hover:border-primary hover:bg-primary/5"
                  )}
                >
                  <Icon icon={tab.icon} width={18} height={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
 
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8"> 
            <div className="flex flex-col items-center justify-center py-16">
              <Icon
                icon="mdi:inbox-outline"
                width={80}
                height={80}
                className="text-gray-400 dark:text-gray-600 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No sessions found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                There are no {activeFilter === "all" ? "" : activeFilter} sessions available at the moment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
