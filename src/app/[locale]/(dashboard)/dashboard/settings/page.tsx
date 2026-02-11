"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"account" | "password">("account");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const userInitials = user
    ? `${user.firstname?.[0] || ""}${user.lastname?.[0] || ""}`.toUpperCase()
    : "U";

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            <span className="text-primary">Sett</span>
            <span className="text-secondary">ings</span>
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-16 bg-primary rounded-full" />
            <div className="h-1 w-16 bg-secondary rounded-full" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("account")}
            className={cn(
              "px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300",
              activeTab === "account"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-2 border-primary hover:bg-primary/5"
            )}
          >
            ACCOUNT
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={cn(
              "px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300",
              activeTab === "password"
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-2 border-primary hover:bg-primary/5"
            )}
          >
            PASSWORD
          </button>
        </div>

        {/* Content */}
        <Card className="border border-primary/20 shadow-sm max-w-3xl mx-auto">
          <CardContent className="p-8">
            {activeTab === "account" ? (
              <div className="space-y-6">
                {/* Profile Picture Section */}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Change your profile picture
                  </h3>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-32 w-32 ring-4 ring-primary/20">
                      <AvatarImage
                        src={user?.image || ""}
                        alt={user?.firstname || "User"}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-3xl font-bold">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      <Icon icon="mdi:upload" className="mr-2" width={18} height={18} />
                      Upload
                    </Button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstname">First Name</Label>
                    <Input
                      id="firstname"
                      defaultValue={user?.firstname || ""}
                      className="h-11 bg-white dark:bg-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input
                      id="lastname"
                      defaultValue={user?.lastname || ""}
                      className="h-11 bg-white dark:bg-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input
                      id="whatsapp"
                      defaultValue={user?.whats || ""}
                      className="h-11 bg-white dark:bg-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <div className="flex gap-6 mt-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          defaultChecked={user?.gender === "female"}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Female</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          defaultChecked={user?.gender === "male"}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Male</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue={user?.country || ""}>
                      <SelectTrigger className="h-11 bg-white dark:bg-gray-900">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eg">Egypt</SelectItem>
                        <SelectItem value="sa">Saudi Arabia</SelectItem>
                        <SelectItem value="ae">UAE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue={user?.timezone || ""}>
                      <SelectTrigger className="h-11 bg-white dark:bg-gray-900">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GMT+2">GMT+2 (Cairo)</SelectItem>
                        <SelectItem value="GMT+3">GMT+3 (Riyadh)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-white px-8">
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Password Illustration */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-48 h-48 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                    <Icon
                      icon="mdi:lock-reset"
                      width={80}
                      height={80}
                      className="text-primary"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword.current ? "text" : "password"}
                        className="h-11 bg-white dark:bg-gray-900 pr-10"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => ({ ...prev, current: !prev.current }))
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        <Icon
                          icon={showPassword.current ? "mdi:eye-off" : "mdi:eye"}
                          width={20}
                          height={20}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showPassword.new ? "text" : "password"}
                        className="h-11 bg-white dark:bg-gray-900 pr-10"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => ({ ...prev, new: !prev.new }))
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        <Icon
                          icon={showPassword.new ? "mdi:eye-off" : "mdi:eye"}
                          width={20}
                          height={20}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showPassword.confirm ? "text" : "password"}
                        className="h-11 bg-white dark:bg-gray-900 pr-10"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        <Icon
                          icon={showPassword.confirm ? "mdi:eye-off" : "mdi:eye"}
                          width={20}
                          height={20}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white px-8">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
