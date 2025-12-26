import App from "./App";
import { ChangePasswordForm } from "./components/ChangePasswordForm";
import { CategoriesPage } from "./routes/Categories";
import { HomePage } from "./routes/Home";
import { Login } from "./routes/Login";
import { CurrentUserProfilePage } from "./routes/me/CurrentUserProfilePage";
import { SettingsPage } from "./routes/me/Settings";
import { PostPage } from "./routes/PostPage";
import { SearchPage } from "./routes/Search";
import { SignUp } from "./routes/Signup";
import { UserProfilePage } from "./routes/UserProfilePage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/me/settings",
        element: <SettingsPage />,
      },
      {
        path: "/me/settings/change-password",
        element: <ChangePasswordForm />,
      },
      {
        path: "/me/profile",
        element: <CurrentUserProfilePage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/posts/:slug",
        element: <PostPage />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },

  {
    path: "/users/:username/profile",
    element: <UserProfilePage />,
  },
];

export default routes;
