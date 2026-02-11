import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "../_components/DashboardSidebar";
import DashboardHeader from "../_components/DashboardHeader";
import MobileSidebar from "../_components/MobileSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
        
        <DashboardSidebar />
         
        <MobileSidebar />

      
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
