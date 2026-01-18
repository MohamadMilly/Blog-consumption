import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

async function deleteComment({ commentId, postSlug, token }) {
  const response = await fetch(
    `${API_URL}/posts/${postSlug}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (response.status === 204) return {};
  if (!response.ok) {
    throw new Error("An error happened deleting the comment.");
  }
  return response.json();
}

export function useDeleteComment() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ commentId, postSlug }) => {
      return deleteComment({ commentId, postSlug, token });
    },

    onMutate: async ({ commentId, postSlug }) => {
      await queryClient.cancelQueries({
        queryKey: ["comments", postSlug],
      });
      const previousComments =
        (await queryClient.getQueryData(["comments", postSlug])) || [];

      queryClient.setQueryData(["comments", postSlug], (old) => {
        return {
          ...old,
          comments: old.comments.filter((comment) => {
            return comment.id !== commentId;
          }),
        };
      });

      return { previousComments };
    },
    onError: (_err, args, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", args.postSlug],
          context.previousComments,
        );
      }
    },
    onSettled: (data, error, args, context) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", args.postSlug],
      });
    },
    mutationKey: ["deleteComment"],
  });

  return { error: mutation.error, mutation };
}
