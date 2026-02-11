"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    label: "SESSIONS",
    icon: "mdi:play-circle",
    href: "/dashboard",
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

export default function MobileSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale || "en";

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-32 h-12">
            <Image
              src={logo}
              alt="UniHome Academy"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Home University From Home
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-4">
          <Icon icon="twemoji:flag-united-states" width={20} height={20} />
          <span className="font-medium">English</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === `/${locale}${item.href}`;
          return (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary/10 border-2 border-secondary text-secondary font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              <Icon
                icon={item.icon}
                width={24}
                height={24}
                className="text-primary"
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
