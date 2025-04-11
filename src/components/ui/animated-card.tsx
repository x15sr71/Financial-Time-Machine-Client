import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AnimatedCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-lg border border-accent bg-card p-6 shadow-lg",
        className
      )}
    >
      {children}
    </motion.div>
  );
};