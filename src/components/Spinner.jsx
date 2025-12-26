import React from "react";
import { Loader } from "lucide-react";

export default function Spinner({
  size = "md",
  className = "",
  label = "Loading",
}) {
  const sizeMap = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };
  const svgSize = sizeMap[size] ?? sizeMap.md;

  return (
    <span
      role="status"
      aria-label={label}
      className={`flex items-center justify-center ${className} `}
    >
      <Loader className={`animate-spin ${svgSize} text-pink-600`} />
    </span>
  );
}
