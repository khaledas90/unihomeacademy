"use client";

import React, { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";

export default function DashboardHeader() {
  const { toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";
console.log(user);

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/login`);
  };

  const userInitials = user
    ? `${user.firstname?.[0] || ""}${user.lastname?.[0] || ""}`.toUpperCase()
    : "U";

  const userName = user ? `${user.firstname} ${user.lastname}` : "User";
  const userImage = user?.image || "";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden text-primary hover:bg-primary/10 rounded-xl transition-all duration-300 hover:scale-110"
          >
            <Icon icon="mdi:menu" width={24} height={24} />
          </Button>
          <div className="flex items-center gap-3"> 
            <h1 className="text-2xl font-bold text-black bg-clip-text ">
              Dashboard
            </h1>
          </div>
        </div>
 
        <div className="flex items-center gap-4">
      
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-11 w-11 rounded-full hover:ring-2 hover:ring-primary/50 transition-all"
              >
                <Avatar className="h-11 w-11 ring-2 ring-primary/20">
                  <AvatarImage
                    src={userImage}
                    alt={userName}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold text-sm">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl">
              <div className="px-3 py-3 border-b border-gray-200/50 dark:border-gray-800/50">
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {userName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {user?.email || ""}
                </p>
              </div>
              <DropdownMenuItem
                onClick={() => router.push(`/${locale}/dashboard/settings`)}
                className="cursor-pointer hover:bg-primary/10 hover:text-white transition-colors duration-200"
              >
                <Icon icon="mdi:cog" className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleLogout} 
                className="cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-white transition-colors duration-200"
              >
                <Icon icon="mdi:logout" className="mr-2 h-4 w-4" />
                <span className="font-medium">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
