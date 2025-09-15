"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortfolioItem {
  title?: string;
  imageUrl?: string;
  videoUrl?: string;
  description: string;
  url: string;
  tags: string[];
  year?: number;
}

interface MobilePortfolioDrawerProps {
  items: PortfolioItem[];
  initialItemIndex: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobilePortfolioDrawer({
  items,
  initialItemIndex,
  isOpen,
  onOpenChange,
}: MobilePortfolioDrawerProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialItemIndex);
  const [drawerHeight, setDrawerHeight] = useState('50vh'); // Default fallback
  const [needsScrolling, setNeedsScrolling] = useState(false);
  const [isVerticalVideo, setIsVerticalVideo] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Update selected index when initialItemIndex changes
  useEffect(() => {
    setSelectedIndex(initialItemIndex);
  }, [initialItemIndex]);

  // Function to recalculate height
  const recalculateHeight = () => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const headerHeight = 80; // Approximate header height
      const footerHeight = 80; // Approximate footer height
      const totalContentHeight = contentHeight + headerHeight + footerHeight;

      // Get screen height
      const screenHeight = window.innerHeight;

      // If content fits on screen, use natural height. Otherwise, use full screen with internal scrolling
      if (totalContentHeight <= screenHeight * 1.05) {
        // Content fits - use natural height (no internal scrolling)
        const heightVh = (totalContentHeight / screenHeight) * 100;
        setDrawerHeight(`${Math.round(heightVh)}vh`);
        setNeedsScrolling(false);
      } else {
        // Content doesn't fit - use full screen height + 10% (will have internal scrolling)
        setDrawerHeight('105vh');
        setNeedsScrolling(true);
      }
    }
  };

  // Calculate dynamic height based on content
  useEffect(() => {
    if (isOpen && contentRef.current) {
      // Temporarily set drawer to auto height to measure content properly
      setDrawerHeight('auto');

      // Use setTimeout to ensure DOM updates before measuring
      setTimeout(() => {
        recalculateHeight();

        // Add load listeners for media elements
        const mediaElements = contentRef.current?.querySelectorAll('video, img');
        mediaElements?.forEach((element) => {
          if (element.tagName === 'VIDEO') {
            const videoElement = element as HTMLVideoElement;
            // Check if video is vertical when it loads
            const checkVideoOrientation = () => {
              if (videoElement.videoHeight > videoElement.videoWidth) {
                setIsVerticalVideo(true);
              } else {
                setIsVerticalVideo(false);
              }
              recalculateHeight();
            };
            videoElement.addEventListener('loadeddata', checkVideoOrientation);
          } else if (element.tagName === 'IMG') {
            element.addEventListener('load', recalculateHeight);
          }
        });

        // Cleanup function
        return () => {
          mediaElements?.forEach((element) => {
            if (element.tagName === 'VIDEO') {
              element.removeEventListener('loadeddata', () => {});
            } else if (element.tagName === 'IMG') {
              element.removeEventListener('load', recalculateHeight);
            }
          });
        };
      }, 100); // Small delay to ensure content is rendered
    }
  }, [isOpen, selectedIndex, items]);

  const selectedItem = items[selectedIndex];

  const handleViewLive = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmViewLive = () => {
    setShowConfirmModal(false);
    window.open(selectedItem.url, "_blank", "noopener,noreferrer");
  };

  const handleCancelViewLive = () => {
    setShowConfirmModal(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  // Don't render anything if not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 flex flex-col rounded-t-2xl shadow-2xl transition-all duration-300 ease-out"
      style={{
        minHeight: 'fit-content', // Let content determine height
        maxHeight: '66.67vh' // 2/3 screen height - reasonable limit
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h1 className="text-lg font-bold truncate">
          {selectedItem.title || "Untitled Project"}
        </h1>
        <Button onClick={handleClose} variant="ghost" size="sm">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div ref={contentRef} className="p-4">
          <div className="max-w-full mx-auto space-y-4">
            {/* Project Info */}
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {selectedItem.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Media */}
            {selectedItem.videoUrl ? (
              <div className="mb-4">
                <video
                  ref={videoRef}
                  src={selectedItem.videoUrl}
                  controls
                  className={`w-full rounded-lg bg-black ${
                    isVerticalVideo ? 'object-cover max-h-64' : 'object-contain'
                  }`}
                  poster={selectedItem.imageUrl}
                />
              </div>
            ) : selectedItem.imageUrl ? (
              <div className="mb-4">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title || selectedItem.description}
                  className="w-full object-contain rounded-lg"
                />
              </div>
            ) : null}

            {/* Additional Info with Live Button */}
            <div className="flex items-end justify-between pt-2">
              {selectedItem.year && (
                <div>
                  <h3 className="text-sm font-semibold mb-1">Year</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {selectedItem.year}
                  </p>
                </div>
              )}
              <Button onClick={handleViewLive} variant="outline" size="sm" className="ml-auto">
                <ExternalLink className="h-4 w-4 mr-1" />
                Live
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Action Button - Always Visible */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-900">
        <Button onClick={handleViewLive} className="w-full">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Live
        </Button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[60] bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Open Project Demo
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              This will take you to the live project website in a new tab. You can always come back here to explore more projects!
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleCancelViewLive}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmViewLive}
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
