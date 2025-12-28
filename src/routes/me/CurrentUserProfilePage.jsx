import { Profile } from "../../components/Profile";
import Spinner from "../../components/Spinner";
import { useUser } from "../../contexts/userContext";
import { Mail } from "lucide-react";

export function CurrentUserProfilePage() {
  const { error, isLoading, user } = useUser();
  const profile = user?.profile;
  const bio = profile?.bio;
  const location = profile?.location;
  const avatar = profile?.avatar || "/avatar_placeholder.jpg";
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }
  return <Profile user={user} bio={bio} location={location} avatar={avatar} />;
}
