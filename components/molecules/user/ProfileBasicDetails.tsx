"use client";

import { useState, useEffect } from "react";
import InputGroup from "../common/ProfileInputGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { baseUserUpdateSchema } from "@/features/auth/validators/base-user-update-schema.validators";
import { toast } from "sonner";
import z from "zod";

const ProfileBasicDetails = ({
  data,
}: {
  data: {
    displayName: string;
    bio?: string;
    dob: Date | null | undefined;
    gender: string;
    email: string;
  };
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(baseUserUpdateSchema),
    defaultValues: {
      displayName: data.displayName,
      bio: data.bio,
      dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
      gender: data.gender,
    },
  });

  // If external data changes, update the form
  useEffect(() => {
    reset({
      displayName: data.displayName,
      bio: data.bio,
      dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
      gender: data.gender,
    });
  }, [data, reset]);

  const handleCancel = () => {
    reset(); // Revert to defaultValues
    setIsEditing(false);
  };

  const onSave = (formData: z.infer<typeof baseUserUpdateSchema>) => {
    console.log("Submitting to API:", formData);
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <section className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A1A] p-6 shadow-sm dark:shadow-none">
      <div className="mb-6 border-b border-black/5 dark:border-white/10 pb-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Basic details
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSave)} className="space-y-4">
        <div>
          <InputGroup
            label="Name"
            readOnly={!isEditing}
            {...register("displayName")}
          />
          {errors.displayName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.displayName.message as string}
            </p>
          )}
        </div>

        <InputGroup label="Email" value={data.email} readOnly={true} />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Bio
          </label>
          <textarea
            {...register("bio")}
            readOnly={!isEditing}
            className={`min-h-25 w-full rounded-md border p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#C35B00] 
              ${
                !isEditing
                  ? "bg-neutral-100 dark:bg-[#0F0F0F] border-neutral-200 dark:border-white/5 text-neutral-500"
                  : "bg-neutral-50 dark:bg-[#0F0F0F] border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white"
              }`}
          />
          {errors.bio && (
            <p className="text-xs text-red-500">
              {errors.bio.message as string}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <InputGroup
              label="Date of birth"
              type="date"
              readOnly={!isEditing}
              {...register("dob")}
            />
            {errors.dob && (
              <p className="text-xs text-red-500 mt-1">
                {errors.dob.message as string}
              </p>
            )}
          </div>
          <div>
            <InputGroup
              label="Gender"
              readOnly={!isEditing}
              {...register("gender")}
            />
            {errors.gender && (
              <p className="text-xs text-red-500 mt-1">
                {errors.gender.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-5">
          {isEditing ? (
            <>
              <button
                type="button"
                className="rounded bg-black/5 dark:bg-white/10 px-6 py-2 text-xs font-semibold"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded bg-[#C35B00] px-6 py-2 text-xs font-semibold text-white"
              >
                Save
              </button>
            </>
          ) : (
            <button
              type="button"
              className="rounded bg-[#C35B00] px-6 py-2 text-xs font-semibold text-white"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default ProfileBasicDetails;
