"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const quizzes = [
  {
    id: 1,
    title: "Quiz 1: wfhjkfjh",
    date: "10/24/2024",
  },
];

export default function QuizzesPage() {
  const [activeTab, setActiveTab] = useState<"questions" | "results">("questions");

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            <span className="text-primary">Quiz</span>
            <span className="text-secondary">zes</span>
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-16 bg-primary rounded-full" />
            <div className="h-1 w-16 bg-secondary rounded-full" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("questions")}
            className={cn(
              "px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300",
              activeTab === "questions"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-2 border-primary hover:bg-primary/5"
            )}
          >
            QUESTIONS
          </button>
          <button
            onClick={() => setActiveTab("results")}
            className={cn(
              "px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300",
              activeTab === "results"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-2 border-primary hover:bg-primary/5"
            )}
          >
            RESULTS
          </button>
        </div>

        {/* Content */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            {activeTab === "questions" ? (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Quizzes :
                </h2>
                {quizzes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Icon
                      icon="mdi:file-question-outline"
                      width={80}
                      height={80}
                      className="text-gray-400 dark:text-gray-600 mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No quizzes found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                      There are no quizzes available at the moment.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {quizzes.map((quiz) => (
                      <div
                        key={quiz.id}
                        className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {quiz.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Date: {quiz.date}
                          </p>
                        </div>
                        <Icon
                          icon="mdi:comment-outline"
                          width={24}
                          height={24}
                          className="text-gray-400 hover:text-primary cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <Icon
                  icon="mdi:chart-line"
                  width={80}
                  height={80}
                  className="text-gray-400 dark:text-gray-600 mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                  Complete quizzes to see your results here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
