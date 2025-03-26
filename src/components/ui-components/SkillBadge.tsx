
import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  score: number;
  color?: string;
  className?: string;
}

const SkillBadge = ({ name, score, color = "bg-primary", className }: SkillBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex items-center gap-2 rounded-full py-1 pl-1 pr-3 bg-white shadow-sm border",
        className
      )}
    >
      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-white text-xs", color)}>
        {score}
      </div>
      <span className="text-sm font-medium truncate">{name}</span>
      <button className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default SkillBadge;
