
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "success" | "warning" | "danger";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const Badge = ({ children, variant = "default", className }: BadgeProps) => {
  const variantStyles = {
    default: "bg-primary/10 text-primary",
    outline: "bg-transparent border-[1.5px] border-primary text-primary",
    success: "bg-green-500/10 text-green-700",
    warning: "bg-yellow-500/10 text-yellow-700",
    danger: "bg-red-500/10 text-red-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
