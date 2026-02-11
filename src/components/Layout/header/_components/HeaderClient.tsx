"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/assets/logo.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Teachers", href: "/teachers" },
  { name: "Why Us", href: "/why-us" },
  { name: "How to use", href: "/how-it-works" },
  { name: "Contact Us", href: "/contact" },
];

export default function HeaderClient() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent backdrop-blur-sm"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="relative flex items-center justify-center w-20 h-20 rounded-lg">
                <Image src={logo} alt="logo" width={60} height={60} />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname?.includes(item.href) && item.href !== "/"
                    ? "text-primary bg-primary/10"
                    : pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <Button
              asChild
              variant="outline"
              className="hidden sm:flex border-foreground/20 hover:bg-muted"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Link href="/register">Get Started</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    pathname?.includes(item.href) && item.href !== "/"
                      ? "text-primary bg-primary/10"
                      : pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="px-4 pb-2">
                  <LanguageSwitcher />
                </div>
                <div className="flex flex-col gap-2 px-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-foreground/20 hover:bg-muted"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    <Link href="/get-started">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
