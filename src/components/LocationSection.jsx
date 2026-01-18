import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useUser } from "../contexts/userContext";
import { SquarePen, MapPin } from "lucide-react";
import { toast } from "react-toastify";
export function LocationSection({ initialLocation }) {
  const [location, setLocation] = useState(initialLocation);
  const [isEditing, setIsEditing] = useState(false);
  const [isSlideUpRunning, setIsSlideUpRunning] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const { refreshUser } = useUser();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(false);
      const response = await fetch(`${API_URL}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          location: location,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw {
          status: response.status,
          data: result,
          message: result.message,
        };
      }

      refreshUser();
      toast.success("Location updated successfully.");
    } catch (error) {
      if (error.data && error.status === 400) {
        error.data.errors.forEach((error) => {
          toast.error(error.msg);
        });
      }
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2
        className="flex items-center gap-x-1 mb-1
      "
      >
        <span className="flex gap-x-1 items-center">
          <MapPin size={18} />
          Location
        </span>
        <button
          className="flex justify-center items-center cursor-pointer"
          type="button"
          onClick={() => setIsEditing(true)}
        >
          <SquarePen
            size={18}
            className="hover:stroke-white/60 transition-all duration-300"
          />
        </button>
      </h2>
      {!isEditing && (
        <p className="text-sm ml-2 text-gray-300">
          {location || "No location specified"}
        </p>
      )}
      {isEditing && (
        <form
          className={
            isSlideUpRunning
              ? "animate-slideup easu-out"
              : "animate-dropdown ease-in"
          }
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="location" className="text-sm mb-2">
              New location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Enter your city"
              list="location-suggestions"
              defaultValue={initialLocation || ""}
              onChange={handleLocationChange}
              className="text-sm px-4 py-2 outline-2 outline-gray-200/20 rounded bg-pink-500/5 focus:outline-gray-200/30 transition-all duration-300 hover:bg-pink-600/6"
            />
            <datalist id="location-suggestions">
              <option value="Aleppo"></option>
              <option value="Damascus"></option>
              <option value="Homs"></option>
              <option value="Latakia"></option>
              <option value="Remote"></option>
            </datalist>
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
              onClick={() => {
                setIsSlideUpRunning(true);
                setTimeout(() => {
                  setIsEditing(false);
                  setIsSlideUpRunning(false);
                }, 300);
                setLocation(initialLocation);
              }}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
