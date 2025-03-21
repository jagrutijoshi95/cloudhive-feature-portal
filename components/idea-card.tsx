"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Idea } from "@/lib/types";
import { formatDate, getPriorityBadgeColor, truncateString } from "@/lib/utils";
import { useIdeas } from "@/lib/hooks/use-ideas";
import VoteButtons from "./vote-buttons";
import { Button } from "./ui/button";

interface IdeaCardProps {
  idea: Idea;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const { useDeleteIdeaMutation } = useIdeas();
  const deleteIdeaMutation = useDeleteIdeaMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle delete idea
  const handleDelete = async () => {
    if (isDeleting) return;

    const confirm = window.confirm(
      "Are you sure you want to delete this idea?"
    );
    if (!confirm) return;

    setIsDeleting(true);
    try {
      await deleteIdeaMutation.mutateAsync(idea.id);
    } catch (error) {
      console.error("Error deleting idea:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          {/* Idea title as a link to details page */}
          <Link href={`/idea/${idea.id}`} className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
              {idea.summary}
            </h3>
          </Link>

          {/* Priority badge */}
          <div
            className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadgeColor(
              idea.priority
            )}`}>
            {idea.priority}
          </div>
        </div>

        {/* Truncated description */}
        <p className="text-gray-600 mb-4">
          {truncateString(idea.description, 120)}
        </p>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          {/* Employee info */}
          <div className="flex items-center">
            <Image
              src={idea.employeeImage}
              alt={idea.employeeName}
              width={32}
              height={32}
              className="rounded-full mr-2"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {idea.employeeName}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(idea.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Voting buttons */}
            <VoteButtons
              ideaId={idea.id}
              upvotes={idea.upvotes}
              downvotes={idea.downvotes}
            />

            {/* Delete button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-gray-500 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
