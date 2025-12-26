import { useAuth } from "../contexts/authContext";
import { NavLink, useLocation } from "react-router";
import {
  Settings,
  CircleUser,
  Shapes,
  House,
  Search,
  PlusCircle,
} from "lucide-react";

function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const currentRoute = location.pathname;
  const isAuthor = user?.role === "Author";
  const baseLinkDesktopClass =
    "flex justify-center items-center text-xs font-medium w-24 py-1.5 rounded-full transition-all duration-300 border-b-3";
  const baseLinkMobileClass =
    "flex flex-col justify-center items-center text-xs font-medium h-full transition-all duration-300 grow first:rounded-l-full last:rounded-r-full";

  const linkMobileClass = ({ isActive, isPending }) => {
    if (isPending) {
      return `${baseLinkMobileClass} bg-white/10 text-pink-700/20`;
    }
    if (isActive) {
      return `${baseLinkMobileClass} bg-white text-pink-700`;
    }
    return `${baseLinkMobileClass} text-white`;
  };
  const linkDesktopClass = ({ isActive, isPending }) => {
    if (isPending) {
      return `${baseLinkDesktopClass} text-gray-200 bg-pink-700/70 border-pink-950`;
    }
    if (isActive) {
      return `${baseLinkDesktopClass} text-gray-200 bg-pink-700/70 shadow-inner shadow-pink-400/70 border-pink-950`;
    }
    return `${baseLinkDesktopClass} text-gray-300/40 bg-pink-700/20 hover:bg-pink-700/30 shadow-inner shadow-pink-600/20 border-pink-800/50`;
  };

  return (
    <>
      <nav className="hidden left-0 right-0 w-full mx-auto mt-2 sm:mt-6 md:mt-8 mb-8 sm:w-5/6 md:w-200 px-6 py-4 md:flex justify-between bg-white/5 rounded-full backdrop-blur-sm shadow-inner shadow-white/20">
        {user && (
          <NavLink to="/me/settings" className={linkDesktopClass}>
            <span className="flex justify-center items-center gap-x-1">
              <Settings size={20} />
              Settings
            </span>
          </NavLink>
        )}
        <NavLink to="/categories" className={linkDesktopClass}>
          <span className="flex justify-center items-center gap-x-1">
            <Shapes size={20} />
            Categories
          </span>
        </NavLink>
        <NavLink to="/" className={linkDesktopClass}>
          <span className="flex justify-center items-center gap-x-1">
            <House size={20} />
            Home
          </span>
        </NavLink>
        <NavLink to="/search" className={linkDesktopClass}>
          <span className="flex justify-center items-center gap-x-1">
            <Search size={20} />
            Search
          </span>
        </NavLink>
        {isAuthor && (
          <NavLink to="/me/posts/new" className={linkDesktopClass}>
            <span className="flex justify-center items-center gap-x-1">
              <PlusCircle size={20} />
              New post
            </span>
          </NavLink>
        )}
        {user && (
          <NavLink to="/me/profile" className={linkDesktopClass}>
            <span className="flex justify-center items-center gap-x-1">
              <CircleUser size={20} />
              Profile
            </span>
          </NavLink>
        )}
        {!user && (
          <>
            <NavLink to="/auth/login" className={linkDesktopClass}>
              <span>Log in</span>
            </NavLink>
            <NavLink to="/auth/signup" className={linkDesktopClass}>
              <span>Sign up</span>
            </NavLink>
          </>
        )}
      </nav>
      <nav className="fixed bottom-4 left-1/2 z-50 w-full h-16 max-w-lg -translate-x-1/2 rounded-full bg-slate-800 flex md:hidden">
        {user && (
          <NavLink to="/me/settings" className={linkMobileClass}>
            <span className="flex justify-center items-center gap-x-1">
              <Settings size={20} />
              <span className="sr-only">Settings</span>
            </span>
          </NavLink>
        )}
        <NavLink to="/categories" className={linkMobileClass}>
          <span className="flex justify-center items-center gap-x-1">
            <Shapes size={20} />
            <span className="sr-only">Categories</span>
          </span>
        </NavLink>
        <NavLink to="/" className={linkMobileClass}>
          <span className="flex justify-center items-center gap-x-1">
            <House size={20} />
            <span className="sr-only">Home</span>
          </span>
        </NavLink>
        <NavLink to="/search" className={linkMobileClass}>
          <span className="flex justify-center items-center gap-x-1">
            <Search size={20} />
            <span className="sr-only">Search</span>
          </span>
        </NavLink>
        {isAuthor && currentRoute === "/" && (
          <div className="absolute top-0 right-6 w-12 h-12 -translate-y-20 bg-pink-400/10 rounded-full">
            <NavLink
              to="/me/posts/new"
              className={`${baseLinkMobileClass} text-pink-600`}
            >
              <span className="flex justify-center items-center gap-x-1">
                <PlusCircle size={30} />
                <span className="sr-only">New post</span>
              </span>
            </NavLink>
          </div>
        )}
        {user && (
          <NavLink to="/me/profile" className={linkMobileClass}>
            <span className="flex justify-center items-center gap-x-1">
              <CircleUser size={20} />
              <span className="sr-only">Profile</span>
            </span>
          </NavLink>
        )}
        {!user && (
          <>
            <NavLink to="/auth/login" className={linkMobileClass}>
              <span>Log in</span>
            </NavLink>
            <NavLink to="/auth/signup" className={linkMobileClass}>
              <span>Sign up</span>
            </NavLink>
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;
