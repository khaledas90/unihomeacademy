"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: string;
    icon: string;
    color: string;
    bgColor: string;
}

export function StatsCard({ title, value, change, icon, color, bgColor }: StatsCardProps) {
    return (
        <Card className={cn("border-0 shadow-sm hover:shadow-md transition-all overflow-hidden", bgColor)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {title}
                </CardTitle>
                <div className={cn("p-2 rounded-lg bg-gradient-to-br", color, "opacity-100")}>
                    <Icon icon={icon} width={20} height={20} className="text-white" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {value}
                    </div>
                    {change && (
                        <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                            {change}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
