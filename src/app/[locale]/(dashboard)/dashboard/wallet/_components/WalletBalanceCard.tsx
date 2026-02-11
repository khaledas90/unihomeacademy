"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/types/users";

interface WalletBalanceCardProps {
    user: User | null;
    balance: number;
}

export function WalletBalanceCard({ user, balance }: WalletBalanceCardProps) {
    const points = balance;
    const lectures = Math.floor(points / 100);

    return (
        <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white dark:bg-gray-900 overflow-hidden rounded-[2.5rem]">
            <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
                    {/* Info Section */}
                    <div className="flex-1 p-8 lg:p-12">
                        <div className="flex items-start gap-6 mb-8">
                            <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center shrink-0">
                                <Icon icon="mdi:wallet" className="text-primary w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">My Points Wallet</h2>
                                <p className="text-slate-500 dark:text-gray-400 font-medium leading-relaxed max-w-xl">
                                    100 points equals 1 full lecture (60 minutes). You can use your balance to schedule sessions with any teacher across our platform at your convenience.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <Icon icon="mdi:information-outline" className="text-primary w-5 h-5" />
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Current Exchange: <span className="text-primary">100 Pts = 1 Lecture</span>
                            </p>
                        </div>
                    </div>

                    {/* Balance Section */}
                    <div className="lg:w-96 p-8 lg:p-12 bg-slate-50/50 dark:bg-gray-800/30 flex flex-col justify-center items-center text-center">
                        <div className="space-y-1 mb-6">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Total Balance</span>
                            <div className="flex items-baseline gap-2 justify-center">
                                <span className="text-6xl font-black text-primary tracking-tighter">{points}</span>
                                <span className="text-sm font-bold text-slate-400 uppercase">Points</span>
                            </div>
                        </div>

                        <div className="w-full h-px bg-slate-200 dark:bg-slate-700 my-6" />

                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-slate-200" />
                                ))}
                            </div>
                            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                                ≈ {lectures} Full Lectures
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
