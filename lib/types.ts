// Type Definitions for the CloudHive Feature Idea Portal

// Employee type definition
export interface Employee {
  id: string;
  name: string;
  profileImage: string;
}

// Priority level options
export type PriorityLevel = "High" | "Medium" | "Low";

// Idea type definition
export interface Idea {
  id: string;
  summary: string;
  description: string;
  employeeId: string;
  employeeName: string;
  employeeImage: string;
  priority: PriorityLevel;
  upvotes: number;
  downvotes: number;
  createdAt: string;
}

// Form data for submitting a new idea
export interface IdeaFormData {
  summary: string;
  description: string;
  employeeId: string;
  priority: PriorityLevel;
}

// For pagination and search
export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}

// Response type for paginated ideas
export interface PaginatedIdeas {
  ideas: Idea[];
  totalIdeas: number;
  totalPages: number;
  currentPage: number;
}

// Vote type
export type VoteType = "upvote" | "downvote";

// Vote action payload
export interface VoteActionPayload {
  ideaId: string;
  voteType: VoteType;
}
