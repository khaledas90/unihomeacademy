"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Iphone } from "@/components/ui/iphone";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTestimonials } from "@/store/api/useTestimonials";
import { Skeleton } from "@/components/ui/skeleton";

gsap.registerPlugin(useGSAP);

interface Testimonial {
  id: number;
  image: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
}

// Memoized Item for performance
const TestimonialItem = memo(({ t, onOpen }: { t: Testimonial, onOpen: (id: number) => void }) => {
  return (
    <div
      className="w-full max-w-[280px] transition-transform duration-500 hover:scale-[1.02] cursor-pointer relative group/item rounded-[3rem] will-change-transform"
      onClick={() => onOpen(t.id)}
    >
      <Iphone src={t.image} className="w-full" />
      <div className="absolute inset-x-0 bottom-10 flex justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
          <Maximize2 className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
});

TestimonialItem.displayName = "TestimonialItem";

export default function Testimonials() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { data: testimonialsData, isLoading } = useTestimonials();
  const allTestimonials = testimonialsData?.data?.testimonials || [];

  // Filter out invalid testimonials (where description or title is null, common for some API responses)
  const testimonials = allTestimonials.filter(t => t.image);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      skipSnaps: false,
      dragFree: true,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false, playOnInit: true })]
  );

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const onOpen = contextSafe((id: number) => {
    setSelectedId(id);
  });

  const onClose = contextSafe(() => {
    if (!phoneRef.current || !overlayRef.current) {
      setSelectedId(null);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setSelectedId(null),
    });

    tl.to(phoneRef.current, {
      scale: 0.8,
      rotationY: 45,
      y: 100,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    }).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.3,
      },
      "-=0.2"
    );
  });

  useEffect(() => {
    if (selectedId && phoneRef.current && overlayRef.current) {
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(phoneRef.current, {
        scale: 0.4,
        rotationY: -45,
        y: 200,
        opacity: 0
      });

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(phoneRef.current, {
        scale: 0.85,
        rotationY: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.75)",
        force3D: true,
      });
    }
  }, [selectedId]);

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;

    if (selectedId) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
  }, [selectedId, emblaApi]);

  const selectedTestimonial = testimonials.find((t) => t.id === selectedId);

  const LoadingSkeleton = () => (
    <div className="flex gap-8 overflow-hidden">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4 flex justify-center">
          <Skeleton className="w-[280px] aspect-[433/882] rounded-[3rem]" />
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#fff5f2] overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-primary">Students Say</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Join thousands of successful learners who have transformed their
            English skills with UniHome
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto group">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4 md:-ml-8">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="flex-[0_0_100%] min-w-0 pl-4 md:pl-8 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  >
                    <div className="flex justify-center py-4">
                      <TestimonialItem t={t} onOpen={onOpen} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={scrollPrev}
              variant="outline"
              size="icon"
              className="rounded-full cursor-pointer bg-white shadow-lg border-primary/10 hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={scrollNext}
              variant="outline"
              size="icon"
              className="rounded-full cursor-pointer bg-white shadow-lg border-primary/10 hover:bg-primary hover:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">

            <div
              ref={overlayRef}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
              onClick={onClose}
            />

            <div ref={modalRef} className="relative w-full max-w-[390px] z-10 perspective-1000 pointer-events-none">
              <div
                ref={phoneRef}
                className="w-full will-change-transform"
              >
                {selectedTestimonial && (
                  <Iphone src={selectedTestimonial.image} className="w-full" />
                )}
              </div>

              <button
                onClick={onClose}
                className="absolute cursor-pointer -top-12 right-0 md:-right-16 text-white hover:text-primary transition-colors p-2 pointer-events-auto"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
