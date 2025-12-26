import { useParams } from "react-router";
import { useUserByUsername } from "../hooks/useUserByUsername";
import { Profile } from "../components/Profile";
import Spinner from "../components/Spinner";

export function UserProfilePage() {
  const { username } = useParams();
  const { user, error, isLoading } = useUserByUsername(username);
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }
  const profile = user?.profile;
  const bio = profile?.bio;
  const location = profile?.location;
  const avatar = profile?.avatar || "/avatar_placeholder.png";
  return <Profile user={user} bio={bio} location={location} avatar={avatar} />;
}
