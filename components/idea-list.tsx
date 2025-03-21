"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Idea } from "@/lib/types";
import { useIdeas } from "@/lib/hooks/use-ideas";
import IdeaCard from "./idea-card";

export default function IdeaList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get parameters from URL
  const search = searchParams.get("search") || "";
  const pageFromUrl = searchParams.get("page");

  // Keep local state for the current page
  const [currentPage, setCurrentPage] = useState(
    pageFromUrl ? parseInt(pageFromUrl) : 1
  );
  const limit = 20; // Ideas per page
  console.log("currentPage", currentPage);

  // Update currentPage when URL changes
  useEffect(() => {
    const page = pageFromUrl ? parseInt(pageFromUrl) : 1;
    setCurrentPage(page);
  }, [pageFromUrl]);

  // Use custom hook to fetch ideas
  const { useIdeasQuery } = useIdeas();
  const { data, isLoading, isError } = useIdeasQuery({
    page: currentPage,
    limit,
    search,
  });

  // Handle page change - update both URL and local state
  const handlePageChange = (newPage: number) => {
    console.log("newPage", newPage);
    setCurrentPage(newPage); // Update local state immediately

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`${pathname}?${params.toString()}`); // Use replace to avoid adding to history
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-100 animate-pulse h-32 rounded-lg"
          />
        ))}
      </div>
    );
  }

  // Render error state
  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading ideas. Please try again.</p>
      </div>
    );
  }

  // Render empty state
  if (data?.ideas.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No ideas found
        </h3>
        {search ? (
          <p className="text-gray-500">
            No ideas match your search for "{search}".
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.delete("search");
                router.push(`${pathname}?${params.toString()}`);
              }}
              className="text-blue-500 ml-1 hover:underline">
              Clear search
            </button>
          </p>
        ) : (
          <p className="text-gray-500">Be the first to submit an idea!</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Ideas list */}
      <div className="space-y-4">
        {data?.ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex justify-center py-4">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>

            {[...Array(data.totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              // Only show a few page numbers around the current page
              if (
                pageNumber === 1 ||
                pageNumber === data.totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-1 rounded ${
                      pageNumber === currentPage
                        ? "bg-blue-500 text-white"
                        : "border border-gray-300 bg-white text-gray-700"
                    }`}>
                    {pageNumber}
                  </button>
                );
              }

              // Show ellipsis for skipped pages
              if (
                (pageNumber === 2 && currentPage > 3) ||
                (pageNumber === data.totalPages - 1 &&
                  currentPage < data.totalPages - 2)
              ) {
                return <span key={pageNumber}>...</span>;
              }

              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data.totalPages}
              className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
