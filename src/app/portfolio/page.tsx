
"use client";

import React, { useState, useEffect } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { PortfolioDrawer } from "@/components/portfolio-drawer";
import { MobilePortfolioDrawer } from "@/components/mobile-portfolio-drawer";

const BLUR_FADE_DELAY = 0.04;

// Hook for mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}

export default function PortfolioPage() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const isMobile = useIsMobile();

  return (
    <div className={`transition-all duration-300 ${
      drawerOpen && !isMobile ? 'flex h-screen' : 'min-h-screen'
    }`}>
      {/* Grid Container */}
      <div className={`flex-shrink-0 ${
        drawerOpen && !isMobile ? 'w-1/2 overflow-y-auto' : 'w-full'
      }`}>
        <section className="max-w-6xl mx-auto py-10 sm:py-20 px-6">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h1 className="font-medium text-2xl mb-8 tracking-tighter">portfolio</h1>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <PortfolioGrid
              selectedItemIndex={selectedItemIndex}
              onItemSelect={setSelectedItemIndex}
              drawerOpen={drawerOpen}
              onDrawerChange={setDrawerOpen}
              onItemsChange={setCurrentItems}
            />
          </BlurFade>
        </section>
      </div>

      {/* Desktop Drawer (only render when open and not mobile) */}
      {drawerOpen && !isMobile && (
        <div className="w-1/2 overflow-y-auto">
          <PortfolioDrawer
            items={currentItems}
            initialItemIndex={selectedItemIndex}
            isOpen={drawerOpen}
            onOpenChange={setDrawerOpen}
          />
        </div>
      )}

      {/* Mobile Drawer (only render when open and mobile) */}
      {drawerOpen && isMobile && (
        <MobilePortfolioDrawer
          items={currentItems}
          initialItemIndex={selectedItemIndex}
          isOpen={drawerOpen}
          onOpenChange={setDrawerOpen}
        />
      )}
    </div>
  );
}
