
import { cn } from "@/lib/utils";

const Badge = ({ children, variant = "default", className }) => {
  const variantStyles = {
    default: "bg-primary/10 text-primary",
    outline: "bg-transparent border-[1.5px] border-primary text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning-foreground",
    danger: "bg-destructive/10 text-destructive",
    info: "bg-info/10 text-info-foreground",
    primary: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
    notification: "bg-rose-500 text-white min-w-4 h-4 flex items-center justify-center px-1 text-xs font-bold rounded-full"
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
