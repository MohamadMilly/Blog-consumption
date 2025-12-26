import { useNavigate } from "react-router";
import { useAuth } from "../contexts/authContext";
import { LogOut } from "lucide-react";
export function LogoutSection() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="group flex items-center px-4 py-2 bg-gray-500/10 rounded hover:bg-gray-500/20">
      <button
        className="group-hover:underline flex items-center gap-x-2 cursor-pointer"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        <span className="text-sm">Logout</span>
      </button>
    </div>
  );
}
