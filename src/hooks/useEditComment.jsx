import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

async function editComment({ token, postSlug, content, commentId }) {
  const response = await fetch(
    `${API_URL}/posts/${postSlug}/comments/${commentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
      }),
    },
  );
  if (!response.ok) {
    throw new Error("An error happend while editing post.");
  }
  return response.json();
}

export function useEditComment() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ content, postSlug, commentId }) =>
      editComment({ content, postSlug, token, commentId }),
    onMutate: async ({ content, commentId, postSlug }) => {
      await queryClient.cancelQueries(["comments", postSlug]);
      const previousComments =
        (await queryClient.getQueryData(["comments", postSlug])) || [];
      queryClient.setQueryData(["comments", postSlug], (old) => {
        return {
          ...old,
          comments: old.comments.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, content };
            } else {
              return comment;
            }
          }),
        };
      });
      return { previousComments };
    },
    onError: (_err, args, context) => {
      queryClient.setQueryData(
        ["comments", args.postSlug],
        context.previousComments,
      );
    },
    onSettled: (data, _err, args, context) => {
      queryClient.invalidateQueries(["comments", args.postSlug]);
    },
  });
  return { mutation, error: mutation.error };
}
