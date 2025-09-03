"use client"
import React from "react";
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/magicui/magic-card";
import { useState, useMemo, Fragment } from "react";
import N8nDemoWebComponent from '@/components/n8n-demo-webcomponent'

interface N8nItem {
  title: string;
  description: string;
  tags: string[];
  component: 'webcomponent';
}

const n8nItems: N8nItem[] = [
  {
    title: "N8n Web Component Demo",
    description: "Interactive demo of n8n automation using web components",
    tags: ["n8n", "automation", "web-component", "demo"],
    component: "webcomponent"
  }
];

// Get unique tags from all n8n items
const allTags = Array.from(
  new Set(n8nItems.flatMap(item => item.tags).sort())
);

export function N8nGrid() {
  const { theme } = useTheme();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    if (activeTag) {
      return n8nItems.filter(item => item.tags.includes(activeTag));
    }
    return n8nItems;
  }, [activeTag]);

  const renderComponent = (component: string) => {
    switch (component) {
      case 'webcomponent':
        return <N8nDemoWebComponent />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-medium text-sm mr-1">Filter by Tag:</span>
          <button
            onClick={() => setActiveTag(null)}
            className={`text-blue-600 dark:text-blue-400 hover:underline text-sm ${
              activeTag === null ? 'underline font-bold' : ''
            }`}
          >
            all
          </button>
          {allTags.map((tag, index) => (
            <Fragment key={tag}>
              {index > 0 && <span className="text-gray-500 text-xs mx-1">•</span>}
              <button
                onClick={() => setActiveTag(tag)}
                className={`text-sm hover:underline text-blue-600 dark:text-blue-400 ${
                  activeTag === tag ? 'underline font-bold' : ''
                }`}
              >
                {tag}
              </button>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="columns-1 gap-4 w-full space-y-4">
        {filteredItems.map((item, index) => (
          <div key={`${item.title}-${index}`} className="break-inside-avoid mb-6">
            <MagicCard
              className="flex flex-col items-center justify-center shadow-xl p-3"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <div className="flex flex-col items-center w-full">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="mt-1 text-sm text-center text-muted-foreground mb-3 px-2">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2 justify-center items-center mb-3 pb-3">
                  {item.tags.map((tag, i) => (
                    <Fragment key={`${item.title}-${tag}-${i}`}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveTag(prevActiveTag => prevActiveTag === tag ? null : tag);
                        }}
                        className={`text-xs hover:underline text-blue-600 dark:text-blue-400 ${
                          activeTag === tag ? 'underline font-bold' : ''
                        }`}
                      >
                        {tag}
                      </button>
                      {i < item.tags.length - 1 && <span className="text-gray-500 text-xs">•</span>}
                    </Fragment>
                  ))}
                </div>
                <div className="w-full">
                  {renderComponent(item.component)}
                </div>
              </div>
            </MagicCard>
          </div>
        ))}
      </div>
    </div>
  );
}