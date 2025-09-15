"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageCarouselProps {
  images: string[];
  alt?: string;
  className?: string;
  autoplayInterval?: number; // in milliseconds
  showControls?: boolean;
}

export function ImageCarousel({
  images,
  alt = "Portfolio image",
  className = "",
  autoplayInterval = 3000,
  showControls = true,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);



  // Autoplay effect
  useEffect(() => {
    if (isHovered || images.length <= 1) return;

    const interval = setInterval(nextImage, autoplayInterval);
    return () => clearInterval(interval);
  }, [nextImage, autoplayInterval, isHovered, images.length]);

  // Only show carousel if there are multiple images
  if (images.length <= 1) {
    return (
      <img
        src={images[0]}
        alt={alt}
        className={`${className} object-contain`}
      />
    );
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <img
        src={images[currentIndex]}
        alt={`${alt} ${currentIndex + 1}`}
        className="w-full h-auto object-contain rounded-md"
      />

      {/* Navigation Controls */}
      {showControls && (
        <>
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-0"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => goToImage(index)}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
