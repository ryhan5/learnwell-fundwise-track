
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
  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 8) return "bg-success text-success-foreground";
    if (score >= 6) return "bg-primary text-primary-foreground";
    if (score >= 4) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex items-center gap-2 rounded-full py-1 pl-1 pr-3 bg-card shadow-sm border",
        className
      )}
    >
      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-white text-xs", color || getScoreColor())}>
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
