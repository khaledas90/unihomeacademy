import { Link } from "@/i18n/routing";
import { Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-[#fff5f2] border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <div className="relative flex items-center justify-center w-25 h-25 rounded-lg">
                  <Image src={logo} alt="logo" width={200} height={200} />
                </div>
              </div>
            </Link>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Experience a modern learning platform that helps you speak, write,
              and understand English with clarity and confidence.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Teachers", href: "/teachers" },
                { name: "Why Us", href: "/why-us" },
                { name: "How it Works", href: "/how-it-works" },
                { name: "Contact Us", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {["Help Center", "Privacy Policy", "Terms of Service", "FAQs"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="text-sm text-foreground/60 hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-foreground/60">
                <Mail className="w-4 h-4" />
                <span>hello@unihomeacademy.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground/60">
                <Phone className="w-4 h-4" />
                <span>+20 1222 515 066</span>
              </li>
            </ul>

          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} UniHome Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-foreground/60 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-foreground/60 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
