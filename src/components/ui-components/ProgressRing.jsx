
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ProgressRing = ({
  value,
  maxValue = 100,
  size = 120,
  strokeWidth = 8,
  className,
  color = "stroke-primary",
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const valuePercentage = Math.min(Math.max(value / maxValue, 0), 1);
  const strokeDashoffset = circumference - valuePercentage * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-muted"
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className={color === "stroke-gradient-primary" ? "stroke-primary" : color}
          fill="transparent"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
            transformOrigin: "center",
            transform: "rotate(-90deg)",
          }}
        />
        {color === "stroke-gradient-primary" && (
          <defs>
            <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        )}
      </svg>
      {children && <div className="absolute">{children}</div>}
    </div>
  );
};

export default ProgressRing;
