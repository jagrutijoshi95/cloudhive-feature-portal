import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Idea, IdeaFormData, PaginationParams, VoteType } from "../types";
import {
  createIdea,
  deleteIdea,
  getIdeas,
  getIdeaById,
  voteIdea,
} from "../actions/idea-actions";

/**
 * Custom hook for managing ideas using TanStack Query
 * Provides functionality for fetching, creating, deleting, and voting on ideas
 */
export function useIdeas() {
  const queryClient = useQueryClient();

  // Fetch ideas with pagination and search
  const useIdeasQuery = (params: PaginationParams) => {
    return useQuery({
      queryKey: ["ideas", params],
      queryFn: () => getIdeas(params),
    });
  };

  // Fetch a single idea by ID
  const useIdeaQuery = (id: string) => {
    return useQuery({
      queryKey: ["idea", id],
      queryFn: () => getIdeaById(id),
      enabled: !!id,
    });
  };

  // Create a new idea
  const useCreateIdeaMutation = () => {
    return useMutation({
      mutationFn: (idea: IdeaFormData) => createIdea(idea),
      onSuccess: () => {
        // Invalidate the ideas query to refetch the updated list
        queryClient.invalidateQueries({ queryKey: ["ideas"] });
      },
    });
  };

  // Delete an idea
  const useDeleteIdeaMutation = () => {
    return useMutation({
      mutationFn: (id: string) => deleteIdea(id),
      onSuccess: () => {
        // Invalidate the ideas query to refetch the updated list
        queryClient.invalidateQueries({ queryKey: ["ideas"] });
      },
    });
  };

  // Vote on an idea
  const useVoteIdeaMutation = () => {
    return useMutation({
      mutationFn: ({
        ideaId,
        voteType,
      }: {
        ideaId: string;
        voteType: VoteType;
      }) => voteIdea(ideaId, voteType),
      onSuccess: (updatedIdea) => {
        if (updatedIdea) {
          // Update the idea in the cache
          queryClient.setQueryData(["idea", updatedIdea.id], updatedIdea);

          // Update the idea in the ideas list cache
          queryClient.invalidateQueries({ queryKey: ["ideas"] });
        }
      },
    });
  };

  return {
    useIdeasQuery,
    useIdeaQuery,
    useCreateIdeaMutation,
    useDeleteIdeaMutation,
    useVoteIdeaMutation,
  };
}
