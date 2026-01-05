import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router";
import { PasswordField } from "../components/PasswordField";
import Spinner from "../components/Spinner";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }
      const token = result.token;
      const user = result.user;
      login(token, user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative w-full px-4 sm:px-12 py-4 my-6 max-w-190 mx-auto text-gray-200 transition-all duration-300">
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-visible">
        {" "}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[clamp(8rem,28vw,48rem)] h-[clamp(8rem,28vw,48rem)] bg-pink-600 rounded-full opacity-30 blur-3xl transform-gpu mix-blend-screen animate-orbit-slow"></div>{" "}
        <div className="absolute left-[6%] top-[55%] -translate-y-1/2 w-[clamp(6rem,20vw,36rem)] h-[clamp(6rem,20vw,36rem)] bg-pink-700 rounded-full opacity-35 blur-2xl transform-gpu mix-blend-multiply animate-orbit-medium"></div>{" "}
        <div className="absolute right-[6%] bottom-[18%] w-[clamp(10rem,26vw,44rem)] h-[clamp(10rem,26vw,44rem)] bg-white rounded-full opacity-25 blur-3xl transform-gpu mix-blend-overlay animate-orbit-slower"></div>{" "}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[clamp(4rem,14vw,28rem)] h-[clamp(4rem,14vw,28rem)] bg-pink-500 rounded-full opacity-20 blur-2xl transform-gpu mix-blend-screen animate-pulse-fast"></div>{" "}
      </div>

      <h1 className="text-3xl tracking-tight mb-4 text-center">
        Welcome back !
      </h1>

      <form
        className="relative z-10 max-w-100 mx-auto mt-6 px-6 py-8 flex flex-col gap-4 bg-gray-900/40 backdrop-blur-md min-h-120 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
        method="post"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            className="px-4 py-2 rounded-full bg-gray-800/60 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 outline-none transition"
            type="text"
            id="username"
            required
            name="username"
          />
        </div>

        <PasswordField
          id="password"
          name="password"
          label="Password"
          className="px-4 py-2 rounded-full bg-gray-800/60 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-600 outline-none transition"
        />

        <button
          className="flex justify-center items-center gap-x-2 py-2 px-6 rounded-full bg-pink-700/80 hover:bg-pink-700/90 transition text-white font-semibold mt-auto"
          type="submit"
        >
          <span>Log in</span>
          {isLoading && <Spinner size="sm" />}
        </button>
      </form>

      {error && <p className="mt-4 text-red-400 text-center">Error: {error}</p>}

      <style jsx="true">{`
        @keyframes orbit {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate3d(-6px, -12px, 0) rotate(6deg) scale(1.02);
          }
          50% {
            transform: translate3d(0, -20px, 0) rotate(0deg) scale(1.04);
          }
          75% {
            transform: translate3d(6px, -12px, 0) rotate(-6deg) scale(1.02);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }
        @keyframes orbit-slow {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate3d(-18px, -36px, 0) rotate(4deg) scale(1.06);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }
        @keyframes orbit-medium {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate3d(12px, -24px, 0) rotate(-4deg) scale(1.03);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }
        @keyframes orbit-slower {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate3d(-24px, -12px, 0) rotate(2deg) scale(1.05);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.18;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.28;
          }
          100% {
            transform: scale(1);
            opacity: 0.18;
          }
        }
        .animate-orbit-slow {
          animation: orbit-slow 18s cubic-bezier(0.22, 0.9, 0.35, 1) infinite;
          will-change: transform, opacity;
        }
        .animate-orbit-medium {
          animation: orbit-medium 12s cubic-bezier(0.22, 0.9, 0.35, 1) infinite;
          will-change: transform, opacity;
        }
        .animate-orbit-slower {
          animation: orbit-slower 22s cubic-bezier(0.22, 0.9, 0.35, 1) infinite;
          will-change: transform, opacity;
        }
        .animate-pulse-fast {
          animation: pulse 6s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @media (max-width: 640px) {
          .animate-orbit-slow,
          .animate-orbit-medium,
          .animate-orbit-slower {
            animation-duration: calc(
              var(--tw-duration, 1) * 1
            ); /* keep smooth on small screens */
          }
        }
      `}</style>
    </main>
  );
}
