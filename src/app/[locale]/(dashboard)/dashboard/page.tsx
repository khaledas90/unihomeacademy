"use client";

import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";
import { useSessions } from "@/store/api/useSessions";
import { StatsCard } from "../_components/StatsCard";
import { SessionFilters } from "../_components/SessionFilters";
import { SessionItem } from "../_components/SessionItem";
import { EmptySessions } from "../_components/EmptySessions";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { data: sessionsData, isLoading } = useSessions();

  const sessions = useMemo(() => sessionsData?.data?.sessions || [], [sessionsData]);

  const stats = useMemo(() => {
    const total = sessions.length;
    const completed = sessions.filter(s => s.status === "Completed").length;
    const upcoming = sessions.filter(s => s.status === "Booked" || s.status === "Live").length;
    const teachersCount = new Set(sessions.map(s => s.teacher?.id).filter(Boolean)).size;

    return [
      {
        title: "Total Sessions",
        value: total,
        change: "Lifetime",
        icon: "mdi:calendar-clock",
        color: "from-primary to-primary/80",
        bgColor: "bg-primary/5",
      },
      {
        title: "Completed",
        value: completed,
        change: `${total > 0 ? Math.round((completed / total) * 100) : 0}% Rate`,
        icon: "mdi:check-circle",
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-500/5",
      },
      {
        title: "Upcoming",
        value: upcoming,
        change: upcoming > 0 ? "Next soon" : "No queue",
        icon: "mdi:clock-outline",
        color: "from-secondary to-secondary/80",
        bgColor: "bg-secondary/5",
      },
      {
        title: "My Teachers",
        value: teachersCount,
        change: "Active",
        icon: "mdi:account-supervisor",
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-500/5",
      },
    ];
  }, [sessions]);

  const filteredSessions = useMemo(() => {
    if (activeFilter === "all") return sessions;
    return sessions.filter(s => s.status.toLowerCase() === activeFilter.toLowerCase());
  }, [sessions, activeFilter]);

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* Welcome Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              Welcome Back! <Icon icon="mdi:hand-wave" className="text-primary animate-bounce-slow" />
            </h1>
            <p className="text-slate-500 dark:text-gray-400 font-medium">
              You have {stats[2].value} upcoming sessions this week.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-3xl" />
            ))
          ) : (
            stats.map((stat, index) => (
              <StatsCard key={index} {...stat} value={stat.value.toString()} />
            ))
          )}
        </div>

        {/* Sessions Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-center">
            <SessionFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>

          <div className="grid gap-4">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-3xl" />
              ))
            ) : filteredSessions.length > 0 ? (
              filteredSessions.map((session) => (
                <SessionItem key={session.id} session={session} />
              ))
            ) : (
              <Card className="border-none shadow-sm rounded-[2.5rem] bg-white dark:bg-gray-900">
                <CardContent className="p-0">
                  <EmptySessions filter={activeFilter} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
