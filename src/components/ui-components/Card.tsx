
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  highlighted?: boolean;
}

const Card = ({ children, className, onClick, highlighted = false }: CardProps) => {
  return (
    <motion.div
      whileHover={onClick ? { y: -5, transition: { duration: 0.2 } } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-card relative rounded-xl shadow-sm border overflow-hidden transition-all duration-200",
        highlighted && "ring-2 ring-primary",
        onClick && "cursor-pointer hover-scale",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
