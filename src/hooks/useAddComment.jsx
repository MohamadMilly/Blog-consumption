import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/authContext";
import { useUser } from "../contexts/userContext";
import { useState } from "react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

async function addComment({ content, token, postSlug }) {
  const response = await fetch(`${API_URL}/posts/${postSlug}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
    }),
  });
  if (!response.ok) {
    toast.error("Failed to add comment.");
    throw new Error("An error happened while adding the comment.");
  }
  toast.success("Comment added sucessfully.");
  return response.json();
}

export function useAddComment() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const mutation = useMutation({
    mutationFn: addComment,
    onMutate: async ({ content, postSlug }) => {
      await queryClient.cancelQueries(["comments", postSlug]);

      const previousComments =
        (await queryClient.getQueryData(["comments", postSlug])) || [];
      queryClient.setQueryData(["comments", postSlug], (old) => {
        const tempId = Date.now();
        const OptimisticComment = {
          id: tempId,
          author: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            profile: {
              avatar: user?.profile?.avatar || "/avatar_placeholder.jpg",
            },
          },
          content: content,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          status: "sending",
        };
        return { ...old, comments: [...old.comments, OptimisticComment] };
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
      queryClient.invalidateQueries(["comments", args.postSlug]);
    },
  });
  return { mutation, error: mutation.error };
}
