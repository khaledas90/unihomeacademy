import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Users } from "lucide-react";
import Image from "next/image";
import studentImage from "@/assets/students-learning-together.jpg";
import instructorImage from "@/assets/instructor-image.jpg";

export default function CourseHighlights() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#fff5f2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Student Rating Card */}
          <Card className="border-0 shadow-lg overflow-hidden bg-white h-full group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 h-full flex flex-col">
              <div className="flex-1 space-y-6">
                {/* Badge - Light purple "Top Rated" */}
                <div className="inline-block">
                  <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Join 10,000+ Students
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#1f447b]">
                  Transform Your Future with Expert Learning
                </h2>

                {/* Description */}
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Discover courses designed by industry experts to help you reach
                  your professional goals faster and more effectively.
                </p>

                {/* CTA Button - Primary Outline */}
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white font-semibold text-base px-8 py-6 rounded-xl transition-all duration-300 group/btn w-fit"
                >
                  Explore All Courses
                  <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Image Section - Now at Bottom to match right card */}
              <div className="relative mt-8 h-[200px] rounded-xl overflow-hidden">
                <Image
                  src={studentImage}
                  alt="Students Learning Together"
                  fill
                  className="object-cover object-[center_20%] group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Rating Badge moved inside the image area */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-primary/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">4.9</span>
                    <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                  </div>
                  <p className="text-[10px] text-foreground/60 font-medium">
                    Overall Rating
                  </p>
                </div>
              </div>
            </CardContent>
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
                <Image
                  src={instructorImage}
                  alt="Instructor Image"
                  fill
                  className="object-cover object-[center_20%] group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
