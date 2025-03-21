import { NextRequest, NextResponse } from "next/server";
import { voteIdea } from "@/lib/actions/idea-actions";
import { VoteType } from "@/lib/types";

// PATCH handler for voting on an idea
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const voteType = data.voteType as VoteType;

    // Validate vote type
    if (voteType !== "upvote" && voteType !== "downvote") {
      return NextResponse.json(
        { error: 'Invalid vote type. Must be "upvote" or "downvote"' },
        { status: 400 }
      );
    }

    const updatedIdea = await voteIdea(params.id, voteType);

    if (!updatedIdea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json(updatedIdea);
  } catch (error) {
    console.error("Error voting on idea:", error);
    return NextResponse.json(
      { error: "Failed to vote on idea" },
      { status: 500 }
    );
  }
}
