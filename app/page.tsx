import Link from "next/link";
import IdeaList from "@/components/idea-list";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Feature Ideas</h1>
          <p className="text-gray-600 mt-1">
            Browse, vote, and collaborate on feature ideas for Integration Hub
          </p>
        </div>

        <Link href="/create">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white">
            + Submit New Idea
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <SearchBar />
      </div>

      <IdeaList />
    </div>
  );
}
