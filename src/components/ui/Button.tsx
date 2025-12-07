import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
  icon?: React.ReactNode; // added icon prop
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  isLoading = false,
  icon,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!isLoading && icon && <span className="h-5 w-5">{icon}</span>}
      {children}
    </button>
  );
};
