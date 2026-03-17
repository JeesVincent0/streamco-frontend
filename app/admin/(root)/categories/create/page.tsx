"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "sonner";

import InputGroup from "@/components/molecules/common/ProfileInputGroup"; // Adjust import path if needed
import Loading from "@/components/molecules/common/LoadingPage"; // Adjust import path if needed

const CreateCategoryForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    status: "ACTIVE",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;

    // Auto-generate slug
    const generatedSlug = newName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setFormData((prev) => ({
      ...prev,
      name: newName,
      slug: generatedSlug,
    }));
  };

  const handleCancel = () => {
    router.push("/admin/categories");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.name.length < 2) {
        toast.error("Category name must be at least 2 characters.");
        setIsLoading(false);
        return;
      }
      if (formData.slug.length < 2) {
        toast.error("Slug must be valid.");
        setIsLoading(false);
        return;
      }

      // TODO: Call your actual API mutation here
      // await createCategoryMutation(formData).unwrap();

      console.log("Submitted Data:", formData);
      toast.success("Category created successfully");
      router.push("/admin/categories");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create category");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading message="Creating category..." />;
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      {/* ─── Back Button ─── */}
      <Link
        href="/admin/categories"
        className="mb-4 inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeftIcon className="mr-2 size-4" /> Back to Categories
      </Link>

      {/* ─── Main Card ─── */}
      <section className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A1A] p-6 shadow-sm dark:shadow-none">
        {/* Card Header */}
        <div className="mb-6 border-b border-black/5 dark:border-white/10 pb-4">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Create Category
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Add a new niche or topic for streamers to broadcast under.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Category Name */}
          <div>
            <InputGroup
              label="Category Name *"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="e.g., Gaming, Just Chatting..."
              readOnly={false}
              required
            />
          </div>

          {/* URL Slug */}
          <div>
            <InputGroup
              label="URL Slug *"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="gaming-news"
              readOnly={false}
              required
            />
            <p className="text-xs text-neutral-500 mt-1 pl-1">
              Auto-generated. This forms the URL (e.g., /category/your-slug).
            </p>
          </div>

          {/* Description Textarea */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe this category..."
              className="min-h-24 w-full rounded-md border p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#C35B00] bg-neutral-50 dark:bg-[#0F0F0F] border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white"
            />
          </div>

          {/* Status Select */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Initial Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-md border p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#C35B00] bg-neutral-50 dark:bg-[#0F0F0F] border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white appearance-none cursor-pointer"
            >
              <option value="ACTIVE">Active (Visible immediately)</option>
              <option value="BLOCKED">Blocked (Hidden/Draft)</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-4 border-t border-black/5 dark:border-white/10 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded bg-black/5 hover:cursor-pointer dark:bg-white/10 px-6 py-2 text-xs font-semibold text-neutral-900 dark:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded bg-[#C35B00] hover:bg-[#b75500] hover:cursor-pointer px-6 py-2 text-xs font-semibold text-white transition-colors disabled:opacity-50"
            >
              Save Category
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateCategoryForm;
