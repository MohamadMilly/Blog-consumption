import { useState } from "react";
import { useAuth } from "../contexts/authContext";

export function useChangePassword() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL;

  const changePassword = async (oldPassword, newPassword, confirmPassword) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(`${API_URL}/users/me/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        console.log(response);
        throw new Error(result.message || "Changing passoword failed.");
      }
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return { changePassword, error, isLoading };
}
