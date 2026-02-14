"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import EnFlag from "@/assets/en-flag.svg";
import ArFlag from "@/assets/ar-flag.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";

const LanguageSwitcher = ({ isFooter }: { isFooter?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const languages = [
    {
      code: "en",
      nativeName: "English",
      flagImage: EnFlag,
    },
    {
      code: "ar",
      nativeName: "العربية",
      flagImage: ArFlag,
    },
  ];

  const currentLang = pathname.startsWith("/ar") ? "ar" : "en";
  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        title="Language"
        aria-label="Language"
        type="button"
        className={cn(
          "group relative flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800",
          isFooter && "hover:bg-white/10"
        )}
        onClick={handleToggle}
      >
        <div className="flex items-center gap-2.5">
          <Image
            src={currentLang === "ar" ? ArFlag : EnFlag}
            alt="Flag"
            width={22}
            height={22}
            className=""
          />
          <span
            className={cn(
              "text-sm font-bold transition-colors uppercase tracking-wide",
              isFooter
                ? "text-white group-hover:text-green-200"
                : "text-gray-700 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-primary"
            )}
          >
            {currentLang}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-all duration-300 opacity-60",
            isOpen && "rotate-180 opacity-100",
            isFooter ? "text-white" : "text-gray-500 dark:text-gray-400"
          )}
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
      )}

      <div
        className={cn(
          "absolute z-[9999] mt-2 w-40 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden transition-all duration-300 ease-out",
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none",
          isFooter ? "bottom-full mb-2" : "top-full"
        )}
        style={{
          left: currentLang === "ar" ? "0" : "auto",
          right: currentLang === "en" ? "0" : "auto",
        }}
      >
        <div className="p-1.5 space-y-1">
          {languages.map((lang, index) => (
            <Link
              key={lang.code}
              href={`/${lang.code}`}
              className={cn(
                "group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ease-in-out",
                currentLang === lang.code
                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              )}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);

                const pathWithoutLang = pathname.replace(/^\/(ar|en)/, "");
                const newPath = `/${lang.code}${pathWithoutLang || "/"}`;

                router.push(newPath);
              }}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <Image src={lang.flagImage} alt="Flag" width={20} height={20} className="rounded-sm" />
                <div className="font-bold text-sm">
                  {lang.nativeName}
                </div>
              </div>
              {currentLang === lang.code && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;

