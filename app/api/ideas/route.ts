import { NextRequest, NextResponse } from "next/server";
import { createIdea, getIdeas } from "@/lib/actions/idea-actions";
import { IdeaFormData } from "@/lib/types";

// GET handler for ideas with pagination and search
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "2");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search") || "";

  try {
    const paginatedIdeas = await getIdeas({ page, limit, search });
    return NextResponse.json(paginatedIdeas);
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return NextResponse.json(
      { error: "Failed to fetch ideas" },
      { status: 500 }
    );
  }
}

// POST handler for creating a new idea
export async function POST(request: NextRequest) {
  try {
    const data: IdeaFormData = await request.json();

    // Validate required fields
    if (!data.summary || !data.description || !data.employeeId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newIdea = await createIdea(data);
    return NextResponse.json(newIdea, { status: 201 });
  } catch (error) {
    console.error("Error creating idea:", error);
    return NextResponse.json(
      { error: "Failed to create idea" },
      { status: 500 }
    );
  }
}
