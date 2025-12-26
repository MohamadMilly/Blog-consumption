import { useState, createContext, useContext, useCallback } from "react";

const AuthContext = createContext(null);

const storedToken = localStorage.getItem("token");
const storedUser = JSON.parse(localStorage.getItem("user"));

export function AuthProvider({ children }) {
  const [token, setToken] = useState(storedToken || null);
  const [user, setUser] = useState(storedUser || null);
  const login = useCallback((token, user) => {
    setToken(token);
    localStorage.setItem("token", token);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);
  /*
  const updateUser = useCallback((newUserData) => {
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  }, []);
  */
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
