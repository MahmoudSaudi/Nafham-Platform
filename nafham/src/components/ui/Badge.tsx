interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "default";
  className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const baseStyles = "px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap inline-flex items-center justify-center";
  
  const variants = {
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    default: "bg-gray-100 text-gray-800"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
