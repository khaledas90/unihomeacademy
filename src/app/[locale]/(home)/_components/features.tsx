import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react";

const features = [
  {
    icon: "mdi:book-open-variant",
    title: "Quick Progress",
    description: "Fast Learning Method",
    color: "text-[#f15a2d]",
    bgColor: "bg-[#f15a2d]/10",
  },
  {
    icon: "mdi:book-open-variant",
    title: "Peer Learning",
    description: "Supportive Study Community",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: "mdi:book-open-variant",
    title: "Instant Correction",
    description: "Smart Feedback System",
    color: "text-[#1f447b]",
    bgColor: "bg-[#1f447b]/10",
  },
  {
    icon: "mdi:book-open-variant",
    title: "Guided Routine",
    description: "Consistent Weekly Plan",
    color: "text-[#f15a2d]",
    bgColor: "bg-[#f15a2d]/10",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full group hover:-translate-y-1"
            >
              <CardContent className="p-6 flex gap-4 items-center justify-center">
                <div
                  className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon
                    icon={feature.icon}
                    className={`w-7 h-7 ${feature.color}`}
                  />
                </div>
              <div className="">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/60">
                  {feature.description}
                </p>
              </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
