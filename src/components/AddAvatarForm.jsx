import { createClient } from "@supabase/supabase-js";
import { useState, useRef } from "react";
import { useAuth } from "../contexts/authContext";
import { useUser } from "../contexts/userContext";
import { PlusCircle } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

const API_URL = import.meta.env.VITE_API_URL;

export function AvatarForm({ className }) {
  const [avatar, setAvatar] = useState(null);
  const { token } = useAuth();
  const { refreshUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) return null;
    try {
      setIsLoading(true);
      const { data, error } = await supabase.storage
        .from("blog images")
        .upload(`avatars/${Date.now()}_${avatar.name}`, avatar);

      if (error) {
        throw new Error(error.message);
      }
      const { data: publicUrlData } = supabase.storage
        .from("blog images")
        .getPublicUrl(data.path);

      const response = await fetch(`${API_URL}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: publicUrlData.publicUrl,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Error uploading the avatar");
      }
      refreshUser();
    } catch (error) {
      alert(error.message);
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} method="post" className={className}>
      <input
        className="hidden"
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={false}
        disabled={isLoading}
        onChange={(e) => {
          setAvatar(e.target.files[0]);
          setTimeout(() => e.target.form.requestSubmit(), 0);
        }}
      />
      <button
        type="button"
        className="bg-blue-700 p-1 rounded-full transition-all duration-300 hover:bg-blue-600"
        onClick={handleClick}
      >
        <PlusCircle size={20} />
      </button>
    </form>
  );
}
