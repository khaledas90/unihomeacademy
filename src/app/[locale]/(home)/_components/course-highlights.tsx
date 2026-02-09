import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CourseHighlights() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#fff5f2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Student Rating Card */}
          <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="relative h-[400px] bg-gradient-to-br from-primary/10 to-primary/5">
              {/* Placeholder for student image - you can replace this with actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">S</span>
                    </div>
                  </div>
                  <p className="text-foreground/50 text-sm">
                    Students Learning Together
                  </p>
                </div>
              </div>

              {/* Rating Badge - Purple with 4.9/5 and yellow star */}
              <div className="absolute bottom-6 right-6 bg-primary rounded-2xl shadow-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-bold text-white">4.9</span>
                  <span className="text-white/80">/5</span>
                  <Star className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
                </div>
                <p className="text-xs text-white/90 font-medium">
                  Average Student Rating
                </p>
              </div>
            </div>
          </Card>

          {/* Promotional Offer Card */}
          <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-[#1f447b] to-[#1a3a6b] text-white h-full group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 h-full flex flex-col">
              <div className="flex-1 space-y-6">
                {/* Badge - Light green "Save Big" */}
                <div className="inline-block">
                  <span className="text-sm font-semibold text-[#4ade80] bg-[#4ade80]/20 px-4 py-2 rounded-full">
                    Save Big
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Learn English With Special Offer
                </h2>

                {/* Description */}
                <p className="text-lg text-white/80 leading-relaxed">
                  Get exclusive discounts on selected English courses this
                  month. Upgrade your skills at a lower price.
                </p>

                {/* CTA Button - Yellow/Orange button */}
                <Button
                  size="lg"
                  className="bg-[#f15a2d] hover:bg-[#e04a1d] text-white font-semibold text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn w-fit"
                >
                  Claim Discount
                  <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Image Placeholder - Instructor with laptop */}
              <div className="relative mt-8 h-[200px] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-bold">M</span>
                    </div>
                    <p className="text-white/50 text-xs">Instructor Image</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
