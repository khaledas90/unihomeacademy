"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function TeachersPage() {
  const [teachers] = useState([]); // Will be populated from API

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            <span className="text-primary">Teach</span>
            <span className="text-secondary">ers</span>
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-16 bg-primary rounded-full" />
            <div className="h-1 w-16 bg-secondary rounded-full" />
          </div>
        </div>

        {/* Content */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            {teachers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Icon
                  icon="mdi:account-supervisor-outline"
                  width={80}
                  height={80}
                  className="text-gray-400 dark:text-gray-600 mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No teachers found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                  There are no teachers available at the moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Teachers cards will be here */}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
