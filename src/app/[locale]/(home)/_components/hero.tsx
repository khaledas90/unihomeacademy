import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Monitor, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import image1 from "@/assets/image-10.jpg";
import image2 from "@/assets/image-11.jpg";
import image3 from "@/assets/image-7.jpg";
import heroImage from "@/assets/hero.png";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[#c9dcf1] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 mt-10">
            <div className="inline-flex items-center mb-2 gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-border shadow-sm">
              <Monitor className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/70">
                <span className="font-bold text-secondary">Uni</span><span className="text-primary">Home</span> - English Online Course
              </span>
            </div>

            <h1 className="text-[35px] md:text-5xl lg:text-7xl font-bold leading-tight">
              Upgrade English For{" "}
              <span className="bg-primary bg-clip-text text-transparent">
                Real Success
              </span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl">
              Experience a modern learning platform that helps you speak, write,
              and understand English with clarity and confidence.
            </p>

            <div className="  flex items-center lg:justify-start justify-center">
              <Link href={"/teachers"}>
              <Button
                size="lg"
                className="bg-primary cursor-pointer hover:bg-primary/90 text-white font-semibold text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Explore Instructors
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              </Link>
              <Link href={"/about"}>
              <Button
                size="lg"
                className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white mx-4 cursor-pointer  font-semibold text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                About Us
              </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[image1, image2, image3].map((i, index) => (
                  <div
                    key={index}
                    className="md:w-12 md:h-12 w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-sm font-semibold text-primary shadow-md"
                  >
                    <Image
                      src={i}
                      alt="logo"
                      width={60}
                      className="rounded-full object-cover"
                      height={60}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground/70">
                  <span className="font-bold text-foreground">12,000+</span> Active
                  Global Students
                </span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative">
              <div className="relative w-[85%] h-screen overflow-hidden">
                <div className="absolute inset-0" />
                <div className="absolute bottom-0 mt-20 flex items-center justify-center">
                  <Image
                    src={heroImage}
                    alt="logo"
                    quality={100}
                    className=" object-cover"
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>

              <div className="absolute top-[420px] right-16 bg-white rounded-xl shadow-lg p-3 border border-border max-w-full">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#1f447b]/10 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-[#1f447b]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-0.5">
                      Certified English Program
                    </h3>
                    <p className="text-xs text-foreground/60">
                      Globally Recognized
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 left-10 bg-white rounded-xl shadow-lg p-3 border border-border max-w-full">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-0.5">
                      Interactive Live Sessions
                    </h3>
                    <p className="text-xs text-foreground/60">Real Practice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
