import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useUser } from "../contexts/userContext";
import { SquarePen } from "lucide-react";
export function BioSection({ initialBio }) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(initialBio);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSlideUpRunning, setIsSlideUpRunning] = useState(false);
  const { token } = useAuth();
  const { refreshUser } = useUser();
  const API_URL = import.meta.env.VITE_API_URL;
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(`${API_URL}/users/me`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio: bio }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Error updating bio.");
      }
      refreshUser();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };
  return (
    <aside className="mb-6">
      <h2 className="mb-1 flex items-center gap-x-2">
        <span>Bio</span>
        <button
          className="flex justify-center items-center cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          <SquarePen
            size={18}
            className="hover:stroke-white/60 transition-all duration-300"
          />
        </button>
      </h2>
      {!isEditing && (
        <p className="px-4 py-2 bg-pink-500/10 italic rounded text-sm text-gray-300 whitespace-pre-wrap wrap-break-word">
          {bio || "No bio"}
        </p>
      )}
      {isEditing && (
        <form
          className={
            isSlideUpRunning
              ? "animate-slideup ease-out"
              : "animate-dropdown ease-in"
          }
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="text-sm mb-2" htmlFor="bio">
              New Bio
            </label>
            <textarea
              className="text-sm px-4 py-2 outline-2 outline-gray-200/20 rounded bg-pink-500/5 min-h-30 focus:outline-gray-200/30 transition-all duration-300 hover:bg-pink-600/6"
              name="bio"
              id="bio"
              dir="auto"
              value={bio}
              placeholder="Write something about yourself..."
              onChange={handleBioChange}
              maxLength={200}
            ></textarea>
          </div>
          <div className="flex gap-x-2 mt-2 items-center">
            <button
              className="bg-pink-700/70 w-16 h-8 text-sm rounded hover:bg-pink-600/70 cursor-pointer transition-all duration-300"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Save"}
            </button>
            <button
              className="border-2 border-pink-700/70 w-16 h-8 text-sm rounded hover:bg-pink-600/70 cursor-pointer transition-all duration-300"
              type="button"
              onClick={() => {
                setIsSlideUpRunning(true);
                setTimeout(() => {
                  setIsEditing(false);
                  setIsSlideUpRunning(false);
                }, 300);
                setBio(initialBio);
              }}
            >
              Cancel
            </button>
            {error && <p>Error: {error}</p>}
          </div>
        </form>
      )}
    </aside>
  );
}
