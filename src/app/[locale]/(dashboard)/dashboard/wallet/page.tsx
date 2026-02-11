"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function WalletPage() {
  const { user } = useAuth();
  const balance = user?.balance || 0;
  const points = balance;
  const lectures = Math.floor(points / 100);

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            <span className="text-primary">Wall</span>
            <span className="text-secondary">et</span>
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-16 bg-primary rounded-full" />
            <div className="h-1 w-16 bg-secondary rounded-full" />
          </div>
        </div>

        {/* Wallet Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            {/* Wallet Info Section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <Icon
                      icon="mdi:wallet"
                      width={40}
                      height={40}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      My Wallet
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                      The point balance shown in the wallet represents the number of points
                      available to you, not the course price. Lectures are calculated based
                      on points, where 100 points = 1 lecture (60 minutes). For example: your
                      current balance ({points} points) = {lectures} lectures. You can use
                      these lectures according to the schedule and time that suits you.
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-semibold text-primary">
                      Hi {user?.firstname || "User"}
                    </span>
                    <Icon icon="mdi:hand-wave" width={20} height={20} className="text-yellow-500" />
                  </div>
                  <div className="text-4xl font-bold text-green-600 mb-1">
                    point {points}
                  </div>
                  <p className="text-sm text-primary font-medium">
                    Your Wallet Balance.
                  </p>
                </div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-900">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        DATE
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        CREDIT
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        DEBIT
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        COMMENTS
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Icon
                            icon="mdi:inbox-outline"
                            width={60}
                            height={60}
                            className="text-gray-400 dark:text-gray-600 mb-3"
                          />
                          <p className="text-gray-500 dark:text-gray-400">
                            No transactions found
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
