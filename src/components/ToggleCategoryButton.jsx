import { useSearchParams } from "react-router";

export function ToggleCategoryButton({ title, onToggle }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("title")?.split(",");
  const isToggled = query ? query.includes(title) : false;
  const baseStyle =
    "flex justify-center items-center text-xs font-medium min-w-18 py-1.5 rounded transition-all duration-300 border-b-3";
  return (
    <button
      className={
        isToggled
          ? `${baseStyle} bg-pink-700/60 border-pink-400/60 text-gray-100`
          : ` ${baseStyle}  bg-pink-700/20 border-pink-400/20 text-gray-300/40`
      }
      onClick={onToggle}
    >
      {title}
    </button>
  );
}
