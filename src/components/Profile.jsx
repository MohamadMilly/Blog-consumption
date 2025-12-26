import { useAuth } from "../contexts/authContext";
import { BioSection } from "./BioSection";
import { LocationSection } from "./LocationSection";
import { Mail, MapPin } from "lucide-react";
import { Post } from "./PostCard";
import { CommentsPanel } from "./CommentsPanel";
export function Profile({ user, bio, location, avatar }) {
  const { user: currentUser } = useAuth();
  const isCurrentUserProfile = currentUser?.id === user.id || false;
  const userRecentPosts = user?.posts;
  return (
    <main className="w-full px-4 sm:px-12 py-4 my-6 sm:my-12 max-w-190 mx-auto text-gray-200 transition-all duration-300">
      <section className="flex justify-center items-center border-b-2 px-2 pb-4 border-pink-600/50">
        <div className="flex flex-col items-center w-52 aspect-square bg-gray-500/10 rounded-full shadow-inner shadow-white/20 hover:drop-shadow-pink-600/30 hover:drop-shadow-2xl transition-all duration-500 will-change-auto backdrop-blur-2xl">
          <div>
            <img
              className="w-32 h-32 object-cover"
              src={avatar}
              alt="user's avatar"
            />
          </div>
          <h1 className="text-lg font-medium">
            {user.firstname + " " + user.lastname}
          </h1>
          <p className="text-sm text-pink-500">{user.role}</p>
        </div>
      </section>
      <section className="my-6">
        <aside className="mb-6">
          <h2 className="mb-1">Username</h2>
          <p className="text-sm ml-2 text-gray-300">@{user.username}</p>
        </aside>
        <aside className="mb-6">
          <h2 className="mb-1 flex gap-x-1 items-center">
            <Mail size={18} />
            <span>Email</span>
          </h2>
          <p className="text-sm ml-2 text-gray-300">
            {user.email || "No Email for this user"}
          </p>
        </aside>

        {isCurrentUserProfile ? (
          <BioSection initialBio={bio} />
        ) : (
          <aside className="mb-6">
            <h2 className="mb-1 flex items-center gap-x-2">Bio</h2>
            <p className="px-4 py-2 bg-pink-500/10 italic rounded text-sm text-gray-300 whitespace-pre-wrap wrap-break-word">
              {bio || "No bio"}
            </p>
          </aside>
        )}
        {isCurrentUserProfile ? (
          <LocationSection initialLocation={location} />
        ) : (
          <aside className="mb-6">
            <h2
              className="flex items-center gap-x-1 mb-1
      "
            >
              <span className="flex gap-x-1 items-center">
                <MapPin size={18} />
                Location
              </span>
            </h2>
            <p className="text-sm ml-2 text-gray-300">
              {location || "No location specified"}
            </p>
          </aside>
        )}
      </section>

      {userRecentPosts?.length > 0 && (
        <>
          <h2 className="mb-1">Recent Posts</h2>
          <section className="my-6">
            {userRecentPosts.map((post) => {
              return (
                <Post
                  title={post.title}
                  content={post.content}
                  author={user}
                  createdAt={post.createdAt}
                  updatedAt={post.updatedAt}
                  slug={post.slug}
                  featuredImageURL={post.featuredImageURL}
                  categories={post.categories}
                  key={post.id}
                />
              );
            })}{" "}
          </section>
        </>
      )}
      <CommentsPanel />
    </main>
  );
}
