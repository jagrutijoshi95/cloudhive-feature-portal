"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useIdeas } from "@/lib/hooks/use-ideas";
import { Button } from "./ui/button";

interface VoteButtonsProps {
  ideaId: string;
  upvotes: number;
  downvotes: number;
}

export default function VoteButtons({
  ideaId,
  upvotes,
  downvotes,
}: VoteButtonsProps) {
  const { useVoteIdeaMutation } = useIdeas();
  const voteIdeaMutation = useVoteIdeaMutation();

  // State for optimistic updates
  const [optimisticUpvotes, setOptimisticUpvotes] = useState(upvotes);
  const [optimisticDownvotes, setOptimisticDownvotes] = useState(downvotes);
  const [isVoting, setIsVoting] = useState(false);

  // Handle upvote
  const handleUpvote = async () => {
    if (isVoting) return;

    setIsVoting(true);
    // Optimistic update
    setOptimisticUpvotes((prev) => prev + 1);

    try {
      await voteIdeaMutation.mutateAsync({
        ideaId,
        voteType: "upvote",
      });
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticUpvotes(upvotes);
      console.error("Error upvoting idea:", error);
    } finally {
      setIsVoting(false);
    }
  };

  // Handle downvote
  const handleDownvote = async () => {
    if (isVoting) return;

    setIsVoting(true);
    // Optimistic update
    setOptimisticDownvotes((prev) => prev + 1);

    try {
      await voteIdeaMutation.mutateAsync({
        ideaId,
        voteType: "downvote",
      });
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticDownvotes(downvotes);
      console.error("Error downvoting idea:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Upvote button */}
      <div className="flex flex-col items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUpvote}
          disabled={isVoting}
          className="p-0 h-auto">
          <ChevronUp className="w-5 h-5 text-green-500 hover:text-green-700" />
        </Button>
        <span className="text-sm font-medium">{optimisticUpvotes}</span>
      </div>

      {/* Downvote button */}
      <div className="flex flex-col items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownvote}
          disabled={isVoting}
          className="p-0 h-auto">
          <ChevronDown className="w-5 h-5 text-red-500 hover:text-red-700" />
        </Button>
        <span className="text-sm font-medium">{optimisticDownvotes}</span>
      </div>
    </div>
  );
}
