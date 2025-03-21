"use server";

import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import {
  Idea,
  IdeaFormData,
  PaginatedIdeas,
  PaginationParams,
  VoteType,
} from "../types";

// Path to the ideas.json file
const ideasFilePath = path.join(process.cwd(), "public", "ideas.json");
const employeesFilePath = path.join(process.cwd(), "public", "employees.json");

// Helper function to read ideas from the JSON file
async function readIdeasFile(): Promise<Idea[]> {
  try {
    const data = await fs.readFile(ideasFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return an empty array
    return [];
  }
}

// Helper function to write ideas to the JSON file
async function writeIdeasFile(ideas: Idea[]): Promise<void> {
  const dirPath = path.dirname(ideasFilePath);

  try {
    await fs.access(dirPath);
  } catch (error) {
    await fs.mkdir(dirPath, { recursive: true });
  }

  await fs.writeFile(ideasFilePath, JSON.stringify(ideas, null, 2), "utf-8");
}

// Helper function to read employees from the JSON file
async function readEmployeesFile() {
  try {
    const data = await fs.readFile(employeesFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading employees file:", error);
    return [];
  }
}

// Action to get a list of ideas with pagination and search
export async function getIdeas({
  page = 1,
  limit = 20,
  search = "",
}: PaginationParams): Promise<PaginatedIdeas> {
  const ideas = await readIdeasFile();

  // Filter ideas by search term if provided
  const filteredIdeas = search
    ? ideas.filter(
        (idea) =>
          idea.summary.toLowerCase().includes(search.toLowerCase()) ||
          idea.description.toLowerCase().includes(search.toLowerCase())
      )
    : ideas;

  // Sort ideas by upvotes in descending order
  const sortedIdeas = [...filteredIdeas].sort((a, b) => b.upvotes - a.upvotes);

  const totalIdeas = sortedIdeas.length;
  const totalPages = Math.ceil(totalIdeas / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedIdeas = sortedIdeas.slice(startIndex, endIndex);

  return {
    ideas: paginatedIdeas,
    totalIdeas,
    totalPages,
    currentPage: page,
  };
}

// Action to get a single idea by ID
export async function getIdeaById(id: string): Promise<Idea | null> {
  const ideas = await readIdeasFile();
  return ideas.find((idea) => idea.id === id) || null;
}

// Action to create a new idea
export async function createIdea(formData: IdeaFormData): Promise<Idea> {
  const ideas = await readIdeasFile();
  const employees = await readEmployeesFile();

  // Find the employee
  const employee = employees.find(
    (emp: { id: string }) => emp.id === formData.employeeId
  );

  if (!employee) {
    throw new Error("Employee not found");
  }

  const newIdea: Idea = {
    id: uuidv4(),
    summary: formData.summary,
    description: formData.description,
    employeeId: formData.employeeId,
    employeeName: employee.name,
    employeeImage: employee.profileImage,
    priority: formData.priority || "Low",
    upvotes: 0,
    downvotes: 0,
    createdAt: new Date().toISOString(),
  };

  const updatedIdeas = [newIdea, ...ideas];
  await writeIdeasFile(updatedIdeas);

  return newIdea;
}

// Action to delete an idea
export async function deleteIdea(id: string): Promise<boolean> {
  const ideas = await readIdeasFile();
  const updatedIdeas = ideas.filter((idea) => idea.id !== id);

  if (updatedIdeas.length === ideas.length) {
    return false; // Idea not found
  }

  await writeIdeasFile(updatedIdeas);
  return true;
}

// Action to vote on an idea
export async function voteIdea(
  ideaId: string,
  voteType: VoteType
): Promise<Idea | null> {
  const ideas = await readIdeasFile();
  const ideaIndex = ideas.findIndex((idea) => idea.id === ideaId);

  if (ideaIndex === -1) {
    return null; // Idea not found
  }

  const updatedIdea = { ...ideas[ideaIndex] };

  if (voteType === "upvote") {
    updatedIdea.upvotes += 1;
  } else if (voteType === "downvote") {
    updatedIdea.downvotes += 1;
  }

  ideas[ideaIndex] = updatedIdea;
  await writeIdeasFile(ideas);

  return updatedIdea;
}
