"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import N8nDemoWebComponent from '@/components/n8n-demo-webcomponent';

interface N8nItem {
  title: string;
  description: string;
  tags: string[];
  component: 'webcomponent';
  workflowUrl: string;
}

interface N8nFullscreenModalProps {
  item: N8nItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function N8nFullscreenModal({ item, isOpen, onClose }: N8nFullscreenModalProps) {
  if (!isOpen || !item) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-75 z-50 transition-opacity duration-300 ease-out"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 bg-white dark:bg-gray-900 z-50 transition-opacity duration-[800ms] ease-out"
        style={{
          opacity: 0,
          filter: 'blur(6px)',
          transform: 'translateY(6px)',
          animation: 'drawerFadeIn 0.8s ease-out 0.04s forwards'
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

        {/* Floating Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-60 bg-black bg-opacity-50 hover:bg-opacity-75 text-white border-0"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Full-Screen Content */}
        <div className="h-full w-full overflow-hidden">
          <N8nDemoWebComponent workflowUrl={item.workflowUrl} />
        </div>
      </div>
    </>
  );
}
