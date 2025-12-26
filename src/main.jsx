import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import routes from "./routes.jsx";
// contexts
import { AuthProvider } from "./contexts/authContext.jsx";
import { UserProvider } from "./contexts/userContext.jsx";
import { CommentsProvider } from "./contexts/commentContext.jsx";
import { PostsProvider } from "./contexts/postsContext.jsx";

import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <PostsProvider>
          <CommentsProvider>
            <RouterProvider router={router} />
          </CommentsProvider>
        </PostsProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
