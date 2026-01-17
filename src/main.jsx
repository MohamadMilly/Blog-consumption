import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import routes from "./routes.jsx";
// contexts
import { AuthProvider } from "./contexts/authContext.jsx";
import { UserProvider } from "./contexts/userContext.jsx";
import { CommentsProvider } from "./contexts/commentContext.jsx";
import { PostsProvider } from "./contexts/postsContext.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createBrowserRouter, RouterProvider } from "react-router";

const queryClient = new QueryClient();

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <PostsProvider>
            <CommentsProvider>
              <RouterProvider router={router} />
            </CommentsProvider>
          </PostsProvider>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
