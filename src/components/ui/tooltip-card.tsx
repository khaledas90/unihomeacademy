"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const Tooltip = ({
  content,
  children,
  containerClassName,
}: {
  content: string | React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [height, setHeight] = useState(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isVisible, content]);

  const calculatePosition = (clientX: number, clientY: number) => {
    if (!contentRef.current)
      return { x: clientX + 12, y: clientY + 12 };

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get tooltip dimensions
    const tooltipWidth = 240; // min-w-[15rem] = 240px
    const tooltipHeight = contentRef.current.scrollHeight;

    let finalX = clientX + 12;
    let finalY = clientY + 12;

    // Check if tooltip goes beyond right edge
    if (finalX + tooltipWidth > viewportWidth) {
      finalX = clientX - tooltipWidth - 12;
    }

    // Check if tooltip goes beyond left edge
    if (finalX < 12) {
      finalX = 12;
    }

    // Check if tooltip goes beyond bottom edge
    if (finalY + tooltipHeight > viewportHeight) {
      finalY = clientY - tooltipHeight - 12;
    }

    // Check if tooltip goes beyond top edge
    if (finalY < 12) {
      finalY = 12;
    }

    return { x: finalX, y: finalY };
  };

  const updateMousePosition = (clientX: number, clientY: number) => {
    setMouse({ x: clientX, y: clientY });
    const newPosition = calculatePosition(clientX, clientY);
    setPosition(newPosition);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsVisible(true);
    updateMousePosition(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
    setIsVisible(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isVisible) return;
    updateMousePosition(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    updateMousePosition(touch.clientX, touch.clientY);
    setIsVisible(true);
  };

  const handleTouchEnd = () => {
    // Delay hiding to allow for tap interaction
    setTimeout(() => {
      setIsVisible(false);
      setMouse({ x: 0, y: 0 });
      setPosition({ x: 0, y: 0 });
    }, 2000);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Toggle visibility on click for mobile devices
    if (window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      if (isVisible) {
        setIsVisible(false);
        setMouse({ x: 0, y: 0 });
        setPosition({ x: 0, y: 0 });
      } else {
        updateMousePosition(e.clientX, e.clientY);
        setIsVisible(true);
      }
    }
  };

  // Update position when tooltip becomes visible or content changes
  useEffect(() => {
    if (isVisible && contentRef.current) {
      const newPosition = calculatePosition(mouse.x, mouse.y);
      setPosition(newPosition);
    }
  }, [isVisible, height, mouse.x, mouse.y]);

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", containerClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {children}
      {mounted && createPortal(
        <AnimatePresence>
          {isVisible && (
            <motion.div
              key="tooltip"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 25,
              }}
              className="pointer-events-none fixed z-[9999] min-w-[15rem] overflow-hidden rounded-md border border-transparent bg-white shadow-xl ring-1 shadow-black/10 ring-black/5 dark:bg-neutral-900 dark:shadow-white/10 dark:ring-white/5"
              style={{
                top: position.y,
                left: position.x,
              }}
            >
              <div
                ref={contentRef}
                className="p-2 text-sm text-neutral-600 md:p-4 dark:text-neutral-400"
              >
                {content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
