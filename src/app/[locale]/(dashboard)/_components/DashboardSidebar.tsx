"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    label: "SESSIONS",
    icon: "mdi:play-circle",
    href: "/dashboard",
    active: true,
  },
  {
    label: "TEACHERS",
    icon: "mdi:account-supervisor",
    href: "/dashboard/teachers",
  },
  {
    label: "QUIZZES",
    icon: "mdi:file-question",
    href: "/dashboard/quizzes",
  },
  {
    label: "WALLET",
    icon: "mdi:wallet",
    href: "/dashboard/wallet",
  },
  {
    label: "SETTINGS",
    icon: "mdi:cog",
    href: "/dashboard/settings",
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale || "en";
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/login`);
  };

  return (
    <aside className="hidden md:flex flex-col w-72 bg-gradient-to-b from-white via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950/50 border-r border-gray-200/50 dark:border-gray-800/50 sticky top-0 shadow-xl backdrop-blur-sm">
     
      <div className="h-16 flex items-center justify-center border-b border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-r from-primary/5 to-secondary/5 px-6">
        <div className="relative w-16 h-12 transition-transform duration-300 hover:scale-105">
          <Image
            src={logo}
            alt="UniHome Academy"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
  
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {menuItems.map((item) => {
          const isActive = pathname === `/${locale}${item.href}`;
          return (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className={cn(
                "group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden",
                isActive
                  ? "bg-gradient-to-r from-primary via-primary to-primary/90 text-white shadow-lg shadow-primary/30 scale-[1.02]"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10  border border-transparent hover:border-primary/20"
              )}
            >  
              <Icon
                icon={item.icon}
                width={22}
                height={22}
                className={cn(
                  "transition-transform duration-300",
                  isActive 
                    ? "text-white drop-shadow-sm" 
                    : "text-primary group-hover:scale-110"
                )}
              />
              <span className={cn(
                "font-semibold transition-all duration-300",
                isActive ? "text-white" : "group-hover:text-primary"
              )}>
                {item.label}
              </span>
              {isActive && (
                <div className="ml-auto">
                  <Icon icon="mdi:chevron-right" width={20} height={20} className="text-white/80" />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-200 dark:hover:border-red-800 border border-transparent"
        >
          <Icon
            icon="mdi:logout"
            width={22}
            height={22}
            className="text-red-600 group-hover:scale-110 transition-transform duration-300"
          />
          <span className="font-semibold">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
