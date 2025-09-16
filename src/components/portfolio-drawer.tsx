"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageCarousel } from "@/components/image-carousel";
import BlurFade from "@/components/magicui/blur-fade";

interface PortfolioItem {
  title?: string;
  imageUrl?: string;
  imageUrls?: string[]; // Array of images for carousel
  videoUrl?: string;
  description: string;
  url: string;
  tags: string[];
  year?: number;
}

interface PortfolioDrawerProps {
  items: PortfolioItem[];
  initialItemIndex: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PortfolioDrawer({
  items,
  initialItemIndex,
  isOpen,
  onOpenChange,
}: PortfolioDrawerProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialItemIndex);
  const selectedItemRef = useRef<HTMLButtonElement>(null);

  // Update selected index when initialItemIndex changes
  useEffect(() => {
    setSelectedIndex(initialItemIndex);
  }, [initialItemIndex]);

  // Shift navbar when drawer opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('navbar-shift');
    } else {
      document.body.classList.remove('navbar-shift');
    }

    return () => {
      document.body.classList.remove('navbar-shift');
    };
  }, [isOpen]);

  // Auto-scroll to selected item when drawer opens or selection changes
  useEffect(() => {
    if (isOpen && selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedIndex, isOpen]);

  const selectedItem = items[selectedIndex];

  const handleViewLive = () => {
    window.open(selectedItem.url, "_blank", "noopener,noreferrer");
  };

  const handleItemSelect = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  // Don't render anything if not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 right-0 h-full w-1/2 bg-white dark:bg-gray-900 z-30 flex flex-col overflow-hidden shadow-2xl"
      style={{
        opacity: 0,
        filter: 'blur(6px)',
        transform: 'translateY(6px)',
        animation: 'drawerFadeIn 0.4s ease-out 0.04s forwards'
      }}
    >
      <style jsx>{`
        @keyframes drawerFadeIn {
          to {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(-6px);
          }
        }
      `}</style>
      {/* Content Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">
              {selectedItem.title || "Untitled Project"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {selectedItem.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button onClick={handleViewLive} size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Live
            </Button>
            <Button onClick={handleClose} variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div
        key={selectedIndex}
        className="flex-1 p-6 overflow-y-auto"
        style={{
          opacity: 0,
          filter: 'blur(6px)',
          transform: 'translateY(6px)',
          animation: 'drawerFadeIn 0.4s ease-out 0.04s forwards'
        }}
      >
        <div className="max-w-4xl mx-auto">
          {selectedItem.videoUrl ? (
            <div className="mb-6">
              <video
                src={selectedItem.videoUrl}
                controls
                className="w-full max-h-96 object-contain rounded-lg bg-black"
                poster={selectedItem.imageUrl}
              />
            </div>
          ) : selectedItem.imageUrls && selectedItem.imageUrls.length > 0 ? (
            <div className="mb-6">
              <ImageCarousel
                images={selectedItem.imageUrls}
                alt={selectedItem.title || selectedItem.description}
                className="w-full max-h-96 object-contain rounded-lg"
                autoplayInterval={5000}
                showControls={true}
              />
            </div>
          ) : selectedItem.imageUrl ? (
            <div className="mb-6">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title || selectedItem.description}
                className="w-full rounded-lg"
                style={{
                  objectFit: 'contain', // Default to contain, will be overridden if vertical
                  maxHeight: '384px' // Default max height for desktop
                }}
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement;
                  const isVertical = img.naturalHeight > img.naturalWidth;
                  if (isVertical) {
                    img.style.objectFit = 'cover';
                    img.style.maxHeight = '384px';
                  } else {
                    img.style.objectFit = 'contain';
                  }
                }}
              />
            </div>
          ) : null}

          {/* Additional content space for future expansion */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">About This Project</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedItem.description}
              </p>
            </div>

            {selectedItem.year && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Year</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedItem.year}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
