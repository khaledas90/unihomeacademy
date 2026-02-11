"use client";

import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { useSessions } from "@/store/api/useSessions";
import { SessionFilters } from "./SessionFilters";
import { SessionItem } from "./SessionItem";
import { EmptySessions } from "./EmptySessions";
import { Skeleton } from "@/components/ui/skeleton";

export default function SessionsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { data: sessionsData, isLoading } = useSessions();

  const sessions = useMemo(() => sessionsData?.data?.sessions || [], [sessionsData]);

  const filteredSessions = useMemo(() => {
    if (activeFilter === "all") return sessions;
    return sessions.filter(s => s.status.toLowerCase() === activeFilter.toLowerCase());
  }, [sessions, activeFilter]);

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950/50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Your Ses
            </span>
            <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
              sions
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-1.5 w-16 bg-primary/20 rounded-full" />
            <div className="h-1.5 w-4 bg-primary/40 rounded-full" />
            <div className="h-1.5 w-16 bg-secondary/20 rounded-full" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12">
          <SessionFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            variant="elaborate"
          />
        </div>

        {/* Sessions Content */}
        <div className="space-y-4">
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-[2rem]" />
            ))
          ) : filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <SessionItem key={session.id} session={session} />
            ))
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800">
              <EmptySessions filter={activeFilter} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
