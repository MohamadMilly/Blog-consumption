import { useState, useCallback, useEffect } from "react";

export function useUserByUsername(username) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const getUserData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/users/name/${username}`);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed fetching user data");
      }
      setUser(result.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);
  return { user, error, isLoading };
}
