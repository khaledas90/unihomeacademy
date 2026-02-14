"use client";

import React, { useMemo } from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useWallets } from "@/store/api/useWallets";
import { WalletBalanceCard } from "./_components/WalletBalanceCard";
import { TransactionRow } from "./_components/TransactionRow";
import { Skeleton } from "@/components/ui/skeleton";

export default function WalletPage() {
  const { user } = useAuth();
  const { data: walletData, isLoading } = useWallets();

  const transactions = useMemo(() => walletData?.data?.wallets || [], [walletData]);
  const balance = user?.balance || 0;

  return (
    <div className="flex-1 bg-slate-50/50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              My Wall
            </span>
            <span className="bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
              et
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-1.5 w-12 bg-primary/20 rounded-full" />
            <div className="h-1.5 w-12 bg-secondary/20 rounded-full" />
          </div>
        </div>

        {/* Wallet Balance Section */}
        <div className="mb-12">
          {isLoading ? <Skeleton className="h-64 rounded-[2.5rem]" /> : (
            <WalletBalanceCard user={user || null} balance={balance} />
          )}
        </div>

        {/* Transactions Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <Icon icon="mdi:history" className="text-primary" />
              Transaction History
            </h2>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full">
              {transactions.length} Total Records
            </div>
          </div>

          <Card className="border-none shadow-[0_8px_30px_rgba(0,0,0,0.02)] bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                      <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                      <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Date & Time</th>
                      <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Credit</th>
                      <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Debit</th>
                      <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                      <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {isLoading ? (
                      Array(5).fill(0).map((_, i) => (
                        <tr key={i}>
                          <td colSpan={6} className="px-6 py-4"><Skeleton className="h-8 w-full rounded-lg" /></td>
                        </tr>
                      ))
                    ) : transactions.length > 0 ? (
                      transactions.map((transaction) => (
                        <TransactionRow key={transaction.id} transaction={transaction} />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-24 text-center">
                          <div className="flex flex-col items-center justify-center opacity-40">
                            <Icon
                              icon="mdi:inbox-outline"
                              width={80}
                              height={80}
                              className="text-slate-300 mb-4"
                            />
                            <p className="text-slate-500 font-black uppercase tracking-widest text-xs">
                              No transactions found
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
