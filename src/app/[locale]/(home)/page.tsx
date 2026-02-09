import React from "react";
import Hero from "./_components/hero";
import Features from "./_components/features";
import CourseHighlights from "./_components/course-highlights";
import CourseCards from "./_components/course-cards";
import Testimonials from "./_components/testimonials"; 

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <CourseHighlights />
      <CourseCards />
      <Testimonials /> 
    </>
  );
}
