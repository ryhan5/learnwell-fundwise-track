
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Card = ({ 
  children, 
  className, 
  onClick, 
  highlighted = false, 
  variant = "default",
  role = "default" 
}) => {
  const variantStyles = {
    default: "bg-card",
    gradient: "bg-gradient-to-br from-background via-card to-background backdrop-blur-[2px]",
    outline: "bg-background border-2",
    glass: "backdrop-blur-sm bg-background/80 border border-muted/30",
    dashboard: "bg-gradient-to-br from-background to-card shadow-md"
  };

  const roleStyles = {
    stat: "border-l-4 border-l-primary",
    action: "border-l-4 border-l-accent hover:border-l-6 transition-all",
    info: "border-l-4 border-l-info",
    default: ""
  };

  return (
    <motion.div
      whileHover={onClick ? { y: -5, transition: { duration: 0.2 } } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative rounded-xl shadow-sm border overflow-hidden transition-all duration-200",
        variantStyles[variant],
        roleStyles[role],
        highlighted && "ring-2 ring-primary",
        onClick && "cursor-pointer hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
