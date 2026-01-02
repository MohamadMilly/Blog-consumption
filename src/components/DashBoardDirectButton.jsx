import { useAuth } from "../contexts/authContext";
import { PlusCircle } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;
const EDITING_APP_URL = import.meta.env.VITE_EDITING_APP_URL;

export function DashBoardDirectButton() {
  const { token } = useAuth();
  const handleRedirect = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/code/exchange`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed generating temporary token");
      }
      const tempToken = result.tempToken;
      window.location.href = `${EDITING_APP_URL}/?tempToken=${tempToken}`;
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <div className="absolute top-0 right-6 w-12 h-12 -translate-y-20 bg-pink-400/10 rounded-full md:right-0 md:top-1.5 md:bottom-1.5 md:translate-x-16 md:translate-y-0">
        <button
          onClick={handleRedirect}
          className="flex flex-col m-auto justify-center items-center text-xs font-medium h-full transition-all duration-300 grow first:rounded-l-full last:rounded-r-full text-pink-600"
        >
          <span className="flex justify-center items-center gap-x-1">
            <PlusCircle size={30} />
            <span className="sr-only">New post</span>
          </span>
        </button>
      </div>
    </>
  );
}
