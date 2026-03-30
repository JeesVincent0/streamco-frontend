"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputGroup from "@/components/molecules/common/ProfileInputGroup";
import {
  CategoryFormValues,
  categorySchema,
} from "@/features/admin/validations";
import { useCreateCategoryMutation } from "@/lib/service";
import { ADMIN_ROUTES } from "@/constants/routers";
import Loading from "@/components/molecules/common/LoadingPage";

const CreateCategoryForm = () => {
  const router = useRouter();
  const [createCategory] = useCreateCategoryMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      status: "ACTIVE",
    },
  });

  const handleCancel = () => {
    router.push(ADMIN_ROUTES.CATEGORIES.ROOT);
  };

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      await createCategory(data).unwrap();
      toast.success("Category created successfully");
      router.push(ADMIN_ROUTES.CATEGORIES.ROOT);
    } catch (err: unknown) {
      const error = err as { data: { message: string } };
      toast.error(error?.data?.message);
    }
  };

  // ─── FIX: Extract the native onChange so we don't overwrite it ───
  const { onChange: formNameOnChange, ...restNameRegister } = register("name");

  if (isSubmitting) return <Loading message="Creating category..." />;

  return (
    <>
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
          <div className="mb-6 border-b border-black/5 dark:border-white/10 pb-4">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Create Category
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Add a new niche or topic for streamers to broadcast under.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Category Name */}
            <div>
              <InputGroup
                label="Category Name *"
                placeholder="e.g., Gaming, Just Chatting..."
                readOnly={false}
                {...restNameRegister} // Spread the ref, name, and onBlur here
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  // 1. Tell React Hook Form the value changed
                  formNameOnChange(e);

                  // 2. Generate and set the slug
                  const newName = e.target.value;
                  const generatedSlug = newName
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");

                  setValue("slug", generatedSlug, { shouldValidate: true });
                }}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1 pl-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* URL Slug */}
            <div>
              <InputGroup
                label="URL Slug *"
                placeholder="gaming-news"
                readOnly={false}
                {...register("slug")}
              />
              {errors.slug ? (
                <p className="text-xs text-red-500 mt-1 pl-1">
                  {errors.slug.message}
                </p>
              ) : (
                <p className="text-xs text-neutral-500 mt-1 pl-1">
                  Auto-generated. This forms the URL (e.g.,
                  /category/your-slug).
                </p>
              )}
            </div>

            {/* Description Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Description
              </label>
              <textarea
                placeholder="Briefly describe this category..."
                className="min-h-24 w-full rounded-md border p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#C35B00] bg-neutral-50 dark:bg-[#0F0F0F] border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-red-500 pl-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Status Select */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Initial Status
              </label>
              <select
                className="w-full rounded-md border p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#C35B00] bg-neutral-50 dark:bg-[#0F0F0F] border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white appearance-none cursor-pointer"
                {...register("status")}
              >
                <option value="ACTIVE">Active (Visible immediately)</option>
                <option value="BLOCKED">Blocked (Hidden/Draft)</option>
              </select>
              {errors.status && (
                <p className="text-xs text-red-500 pl-1">
                  {errors.status.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end gap-4 border-t border-black/5 dark:border-white/10 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="rounded bg-black/5 hover:cursor-pointer dark:bg-white/10 px-6 py-2 text-xs font-semibold text-neutral-900 dark:text-white transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded bg-[#C35B00] hover:bg-[#b75500] hover:cursor-pointer px-6 py-2 text-xs font-semibold text-white transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save Category"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default CreateCategoryForm;
