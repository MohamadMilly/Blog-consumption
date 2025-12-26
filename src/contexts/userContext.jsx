import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./authContext";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL;

  const getUserData = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      setUser(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed fetching user data");
      }
      setUser(result.currentUser);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <UserContext.Provider
      value={{ user, isLoading, error, refreshUser: getUserData }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
