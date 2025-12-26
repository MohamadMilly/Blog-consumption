import { useNavigate } from "react-router";
import { useAuth } from "../contexts/authContext";
import { useState } from "react";
import { UserRoundX } from "lucide-react";
export function DeleteAccountSection() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/users/me`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Error deleteing the account");
      }
      logout();
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="group flex items-center px-4 py-2 bg-gray-500/10 rounded hover:bg-gray-500/20 mb-1">
      <button
        className="group-hover:underline flex items-center gap-x-2 cursor-pointer"
        onClick={handleDelete}
        disabled={isLoading}
      >
        <UserRoundX size={18} />
        <span className="text-sm">
          {isLoading ? "Deleting..." : "Delete account"}
        </span>
      </button>

      {error && <p className="text-red-600">Error : {error}</p>}
    </div>
  );
}
