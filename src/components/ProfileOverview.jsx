import { useUser } from "../contexts/userContext";
import { Link } from "react-router";
import { MoveRight } from "lucide-react";
import Spinner from "./Spinner";
export function ProfileOverview() {
  const { user, isLoading, error } = useUser();
  const userProfile = user?.profile;
  const avatar = userProfile?.avatar || "/avatar_placeholder.png";
  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  if (isLoading || !user) {
    return <Spinner />;
  }
  return (
    <section className="flex flex-wrap max-w-190 gap-x-4 px-4 py-2 bg-gray-500/10 justify-center items-center backdrop-blur-2xl rounded">
      <div className="w-25 h-25 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={avatar}
          alt="user's avatar"
        />
      </div>

      <div className="grow p-1">
        <p className="text-lg font-medium">
          {user.firstname + " " + user.lastname}
        </p>
        <p className="text-sm text-pink-500">{user.role}</p>
        <Link
          className="text-sm flex gap-x-2 mt-3 items-center text-pink-600 hover:underline hover:text-pink-500"
          to="/me/profile"
        >
          Go to full profile
          <MoveRight size={18} />
        </Link>
      </div>
    </section>
  );
}
