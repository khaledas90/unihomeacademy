"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const courses = [
  {
    title: "Beginner English Course",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 1250,
    duration: "8 weeks",
    price: "$99",
    originalPrice: "$149",
    image: "bg-gradient-to-br from-primary/20 to-primary/5",
  },
  {
    title: "Advanced Conversation",
    instructor: "Michael Chen",
    rating: 4.9,
    students: 890,
    duration: "10 weeks",
    price: "$129",
    originalPrice: "$179",
    image: "bg-gradient-to-br from-[#1f447b]/20 to-[#1f447b]/5",
  },
  {
    title: "Business English Mastery",
    instructor: "Emma Williams",
    rating: 4.7,
    students: 2100,
    duration: "12 weeks",
    price: "$149",
    originalPrice: "$199",
    image: "bg-gradient-to-br from-[#1f447b]/20 to-[#1f447b]/5",
  },
  {
    title: "IELTS Preparation",
    instructor: "David Brown",
    rating: 4.9,
    students: 3200,
    duration: "16 weeks",
    price: "$179",
    originalPrice: "$249",
    image: "bg-gradient-to-br from-[#f15a2d]/20 to-[#f15a2d]/5",
  },
];

export default function CourseCards() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Popular <span className="text-primary">Courses</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Discover our most popular English courses designed to help you
            achieve your learning goals
          </p>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden h-full flex flex-col">
                {/* Course Image */}
                <div className={`h-48 ${course.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 mx-auto bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-primary text-2xl font-bold">
                          {course.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-[#1f447b] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {Math.round(
                      ((parseInt(course.originalPrice.slice(1)) -
                        parseInt(course.price.slice(1))) /
                        parseInt(course.originalPrice.slice(1))) *
                        100
                    )}
                    % OFF
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-foreground/60">
                    by {course.instructor}
                  </p>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Rating and Students */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#f15a2d] text-[#f15a2d]" />
                      <span className="font-medium text-foreground">
                        {course.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-foreground/60">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 pt-0">
                  {/* Price */}
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-2xl font-bold text-primary">
                      {course.price}
                    </span>
                    <span className="text-sm text-foreground/50 line-through">
                      {course.originalPrice}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="outline"
                    className="w-full group/btn hover:bg-primary hover:text-white transition-all"
                  >
                    Enroll Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
