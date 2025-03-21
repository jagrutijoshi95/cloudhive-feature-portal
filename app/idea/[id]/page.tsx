"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Idea } from "@/lib/types";
import { formatDate, getPriorityBadgeColor } from "@/lib/utils";
import { useIdeas } from "@/lib/hooks/use-ideas";
import VoteButtons from "@/components/vote-buttons";
import { Button } from "@/components/ui/button";

interface IdeaDetailPageProps {
  params: {
    id: string;
  };
}

export default function IdeaDetailPage({ params }: IdeaDetailPageProps) {
  const router = useRouter();
  const { useIdeaQuery, useDeleteIdeaMutation } = useIdeas();
  const { data: idea, isLoading, isError } = useIdeaQuery(params.id);
  const deleteIdeaMutation = useDeleteIdeaMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle deleting an idea
  const handleDelete = async () => {
    if (!idea || isDeleting) return;

    const confirm = window.confirm(
      "Are you sure you want to delete this idea?"
    );
    if (!confirm) return;

    setIsDeleting(true);
    try {
      await deleteIdeaMutation.mutateAsync(idea.id);
      router.push("/");
    } catch (error) {
      console.error("Error deleting idea:", error);
      setIsDeleting(false);
    }
  };

  // If idea is not found or there's an error
  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Ideas
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Idea Not Found
          </h2>
          <p className="text-gray-600">
            The idea you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/" className="block mt-4 text-blue-600 hover:underline">
            Return to all ideas
          </Link>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading || !idea) {
    return (
      <div className="space-y-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Ideas
          </Link>
        </div>

        <div className="animate-pulse space-y-4 bg-white p-6 rounded-lg shadow-md">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Ideas
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{idea.summary}</h1>

          <div className="flex items-center space-x-2">
            <div
              className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityBadgeColor(
                idea.priority
              )}`}>
              {idea.priority}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-gray-500 hover:text-red-600">
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <Image
            src={idea.employeeImage}
            alt={idea.employeeName}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          <div>
            <p className="font-medium text-gray-900">{idea.employeeName}</p>
            <p className="text-sm text-gray-500">
              {formatDate(idea.createdAt)}
            </p>
          </div>
        </div>

        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 whitespace-pre-line">
            {idea.description}
          </p>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Votes</h3>

            <VoteButtons
              ideaId={idea.id}
              upvotes={idea.upvotes}
              downvotes={idea.downvotes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
