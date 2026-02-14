"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Wallet } from "@/types/users";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TransactionRowProps {
    transaction: Wallet;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
    const isCredit = transaction.type === "credit";
    const date = transaction.date ? format(new Date(transaction.date), "MMM dd, yyyy HH:mm") : "N/A";

    return (
        <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors group">
            <td className="px-6 py-4">
                <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors">#{transaction.id}</span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <Icon icon="mdi:calendar-clock" className="text-slate-300 w-4 h-4" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{date}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={cn("text-sm font-black", isCredit ? "text-green-600" : "text-slate-300")}>
                    {isCredit ? `+${transaction.amount}` : "-"}
                </span>
            </td>
            <td className="px-6 py-4">
                <span className={cn("text-sm font-black", !isCredit ? "text-red-500" : "text-slate-300")}>
                    {!isCredit ? `-${transaction.amount}` : "-"}
                </span>
            </td>
            <td className="px-6 py-4 max-w-xs">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate italic">
                    {transaction.description || "System Transaction"}
                </p>
            </td>
            <td className="px-6 py-4">
                <div className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    transaction.status === 1 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                )}>
                    <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", transaction.status === 1 ? "bg-green-500" : "bg-orange-500")} />
                    {transaction.status === 1 ? "Success" : "Pending"}
                </div>
            </td>
        </tr>
    );
}
