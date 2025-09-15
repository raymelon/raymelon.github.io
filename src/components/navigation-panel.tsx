"use client";

import React, { useState, useEffect, useRef } from "react";

interface PortfolioItem {
  title?: string;
  imageUrl?: string;
  videoUrl?: string;
  description: string;
  url: string;
  tags: string[];
  year?: number;
}

interface NavigationPanelProps {
  items: PortfolioItem[];
  selectedIndex: number;
  onItemSelect: (index: number) => void;
}

export function NavigationPanel({
  items,
  selectedIndex,
  onItemSelect,
}: NavigationPanelProps) {
  const selectedItemRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to selected item when selection changes
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedIndex]);

  return (
    <div className="w-1/3 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col h-screen sticky top-0">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Portfolio Items</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {items.length} projects
        </p>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-2">
        {items.map((item, index) => (
          <button
            key={`${item.url}-${index}`}
            ref={index === selectedIndex ? selectedItemRef : null}
            onClick={() => onItemSelect(index)}
            className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
              index === selectedIndex
                ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Thumbnail */}
              <div className="w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100 dark:bg-gray-700">
                {item.videoUrl ? (
                  <video
                    src={item.videoUrl}
                    className="w-full h-full object-cover"
                    muted
                  />
                ) : item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title || item.description}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                    No Preview
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">
                  {item.title || "Untitled"}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                      +{item.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
