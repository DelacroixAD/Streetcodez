
import React from "react";
import { LockIcon, ShieldCheck, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

type SecurityLevel = "encrypted" | "protected" | "public";

interface SecurityBadgeProps {
  level: SecurityLevel;
  className?: string;
}

const SecurityBadge: React.FC<SecurityBadgeProps> = ({ level, className }) => {
  const getIconAndColor = () => {
    switch (level) {
      case "encrypted":
        return {
          icon: <LockIcon className="h-3 w-3 mr-1" />,
          bgColor: "bg-green-100 dark:bg-green-900",
          textColor: "text-green-800 dark:text-green-200",
          label: "End-to-End Encrypted"
        };
      case "protected":
        return {
          icon: <ShieldCheck className="h-3 w-3 mr-1" />,
          bgColor: "bg-blue-100 dark:bg-blue-900",
          textColor: "text-blue-800 dark:text-blue-200",
          label: "Access Protected"
        };
      case "public":
        return {
          icon: <Eye className="h-3 w-3 mr-1" />,
          bgColor: "bg-yellow-100 dark:bg-yellow-900",
          textColor: "text-yellow-800 dark:text-yellow-200",
          label: "Shared"
        };
      default:
        return {
          icon: <LockIcon className="h-3 w-3 mr-1" />,
          bgColor: "bg-gray-100 dark:bg-gray-800",
          textColor: "text-gray-800 dark:text-gray-200",
          label: "Unknown"
        };
    }
  };

  const { icon, bgColor, textColor, label } = getIconAndColor();

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        bgColor,
        textColor,
        className
      )}
    >
      {icon}
      {label}
    </span>
  );
};

export default SecurityBadge;
