"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Session } from "@/types/users";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface SessionItemProps {
    session: Session;
}

export function SessionItem({ session }: SessionItemProps) {
    const { session_table, teacher, status } = session;
    const date = session_table?.date ? format(new Date(session_table.date), "EEE, MMM dd, yyyy") : "N/A";
    const time = session_table?.time || "N/A";

    const statusColors: Record<string, string> = {
        "Completed": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        "Live": "bg-primary/10 text-primary dark:bg-primary/20",
        "Booked": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        "Cancelled": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };

    return (
        <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group bg-white dark:bg-gray-900">
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center">
                    {/* Teacher Image */}
                    <div className="relative w-full md:w-32 aspect-[4/3] md:aspect-square bg-slate-100 shrink-0">
                        <Image
                            src={teacher?.image || "/placeholder-avatar.png"}
                            alt={teacher?.firstname || "Teacher"}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="flex-1 p-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                        {/* Session Info */}
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                                <Badge className={cn("rounded-full border-none px-3 font-bold", statusColors[status] || "bg-gray-100 text-gray-700")}>
                                    {status}
                                </Badge>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    ID: #{session.id}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                {teacher?.firstname} {teacher?.lastname}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                <div className="flex items-center gap-1.5">
                                    <Icon icon="mdi:calendar-blank" className="text-gray-400" />
                                    {date}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Icon icon="mdi:clock-outline" className="text-gray-400" />
                                    {time}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 md:border-l md:pl-6 border-gray-100 dark:border-gray-800">
                            {status === "Completed" ? (
                                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-sm transition-all border border-gray-200">
                                    <Icon icon="mdi:message-draw" />
                                    Add Review
                                </button>
                            ) : status === "Live" ? (
                                <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm transition-all hover:bg-primary/90 shadow-lg shadow-primary/20">
                                    <Icon icon="mdi:video-outline" className="w-5 h-5" />
                                    Join Session
                                </button>
                            ) : (
                                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm transition-all border border-gray-200 shadow-sm">
                                    View Details
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
