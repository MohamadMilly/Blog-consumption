import { useState } from "react";
import { EyeClosed, Eye } from "lucide-react";
export function PasswordField({ label, name, id }) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const toggleVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-200">
        {label}
      </label>
      <div className="flex items-center h-fit">
        <input
          className="grow px-4 py-2 rounded-l-full bg-gray-900/40 border border-gray-700 text-gray-100 placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 outline-none transition"
          type={isPasswordShown ? "text" : "password"}
          id={id}
          name={name}
          required
        />
        <button
          type="button"
          aria-label="Toggle password visibility"
          onClick={toggleVisibility}
          className="px-3 py-2 flex items-center justify-center rounded-r-full bg-gray-500/20 hover:bg-gray-800/60 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600 transition"
        >
          {isPasswordShown ? <Eye /> : <EyeClosed />}
        </button>
      </div>
    </div>
  );
}
