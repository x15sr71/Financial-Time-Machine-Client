import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export const AnimatedTabs = ({
  tabs,
  selectedTab,
  onChange,
}: {
  tabs: Tab[];
  selectedTab: string;
  onChange: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex space-x-1 bg-accent rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
              selectedTab === tab.id ? "text-primary-foreground" : "hover:text-primary/80"
            )}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {selectedTab === tab.id && (
              <motion.div
                layoutId="bubble"
                className="absolute inset-0 bg-primary"
                style={{ borderRadius: 6 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 mix-blend-difference">{tab.label}</span>
          </button>
        ))}
      </div>
      <motion.div
        key={selectedTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="mt-4"
      >
        {tabs.find((tab) => tab.id === selectedTab)?.content}
      </motion.div>
    </div>
  );
};