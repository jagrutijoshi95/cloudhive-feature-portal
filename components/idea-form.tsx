"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Employee, IdeaFormData, PriorityLevel } from "@/lib/types";
import { useIdeas } from "@/lib/hooks/use-ideas";
import { Button } from "./ui/button";

// Form validation schema using zod
const formSchema = z.object({
  summary: z
    .string()
    .min(3, "Summary must be at least 3 characters")
    .max(100, "Summary cannot exceed 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  employeeId: z.string().min(1, "Please select an employee"),
  priority: z.enum(["High", "Medium", "Low"]).default("Low"),
});

// Component props
interface IdeaFormProps {
  employees: Employee[];
}

export default function IdeaForm({ employees }: IdeaFormProps) {
  const router = useRouter();
  const { useCreateIdeaMutation } = useIdeas();
  const createIdeaMutation = useCreateIdeaMutation();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IdeaFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      summary: "",
      description: "",
      employeeId: "",
      priority: "Low" as PriorityLevel,
    },
  });

  // Handle form submission
  const onSubmit = async (data: IdeaFormData) => {
    try {
      await createIdeaMutation.mutateAsync(data);
      reset();
      router.push("/");
    } catch (error) {
      console.error("Error creating idea:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Submit a New Feature Idea</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Summary field */}
        <div>
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-gray-700 mb-1">
            Summary *
          </label>
          <input
            id="summary"
            type="text"
            className={`w-full p-2 border rounded-md ${
              errors.summary ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter a concise summary of your idea"
            {...register("summary")}
          />
          {errors.summary && (
            <p className="mt-1 text-sm text-red-600">
              {errors.summary.message}
            </p>
          )}
        </div>

        {/* Description field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            rows={5}
            className={`w-full p-2 border rounded-md ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Provide a detailed explanation of your feature idea"
            {...register("description")}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Employee selection */}
        <div>
          <label
            htmlFor="employeeId"
            className="block text-sm font-medium text-gray-700 mb-1">
            Submitted By *
          </label>
          <select
            id="employeeId"
            className={`w-full p-2 border rounded-md ${
              errors.employeeId ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue=""
            {...register("employeeId")}>
            <option value="" disabled>
              Select an employee
            </option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
          {errors.employeeId && (
            <p className="mt-1 text-sm text-red-600">
              {errors.employeeId.message}
            </p>
          )}
        </div>

        {/* Priority selection */}
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("priority")}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Form actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/")}
            className="px-4 py-2">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-700">
            {isSubmitting ? "Submitting..." : "Submit Idea"}
          </Button>
        </div>
      </form>
    </div>
  );
}
