"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // Update search term state when input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Debounce search to avoid too many URL updates
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Update URL with search params when debounced term changes
  useEffect(() => {
    // Get the current search and page parameters
    const currentSearch = searchParams.get("search") || "";

    // Only update URL if the search term actually changed
    if (debouncedTerm !== currentSearch) {
      const params = new URLSearchParams(searchParams);

      if (debouncedTerm) {
        params.set("search", debouncedTerm);
      } else {
        params.delete("search");
      }

      // Reset to page 1 when search changes (either new search or clearing search)
      params.set("page", "1");

      router.push(`/?${params.toString()}`);
    }
  }, [debouncedTerm, router, searchParams]);

  return (
    <div className="relative max-w-md w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Search ideas..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}
