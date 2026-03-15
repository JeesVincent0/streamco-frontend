"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { Edit } from "lucide-react";

import InputGroup from "../common/ProfileInputGroup";
import Loading from "../common/LoadingPage";
import { baseUserUpdateSchema } from "@/features/auth/validators/base-user-update-schema.validators";
import {
  useUpdateBasicProfileMutation,
  useUpdateUserEmailMutation,
} from "@/lib/service/user-api/settingsApi";
import UpdateEmailOtpVerification from "./UpdateEmailOtpVerification";
import { useRouter } from "next/navigation";
import { USER_ROUTES } from "@/constants/routers";

interface ProfileBasicDetailsProps {
  data: {
    displayName: string;
    bio?: string;
    dob: Date | null | undefined;
    gender: string;
    email: string;
  };
}

const ProfileBasicDetails = ({ data }: ProfileBasicDetailsProps) => {
  const router = useRouter();
  // UI States
  const [isEditing, setIsEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);

  // OTP States
  const [showOtp, setShowOtp] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  // Mutations
  const [updateBasicProfile, { isLoading: isUpdatingBasicProfile }] =
    useUpdateBasicProfileMutation();
  const [updateUserEmail, { isLoading: isUpdatingUserEmail }] =
    useUpdateUserEmailMutation();

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
      gender: data.gender ? data.gender : "",
      email: data.email,
    },
  });

  // Sync external data changes to the form
  useEffect(() => {
    reset({
      displayName: data.displayName,
      bio: data.bio,
      dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
      gender: data.gender || "",
      email: data.email,
    });
  }, [data, reset]);

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setIsEmailEditing(false);
  };

  const handleEmailEdit = () => {
    setIsEmailEditing(true);
  };

  const onSave = async (formData: z.infer<typeof baseUserUpdateSchema>) => {
    try {
      if (isEmailEditing) {
        const newEmail = formData.email;

        if (!newEmail) {
          return toast.error("Email cannot be empty.");
        }
        if (newEmail === data.email) {
          return toast.error(
            "New email cannot be the same as the current email.",
          );
        }

        // 1. Update basic profile first
        await updateBasicProfile({
          displayName: formData.displayName,
          bio: formData.bio,
          dob: formData.dob,
          gender: formData.gender,
        }).unwrap();

        // 2. Update email
        const res = await updateUserEmail({ email: newEmail }).unwrap();
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("purpose", res.data.purpose);
        localStorage.setItem("otpResendAt", res.data.otpResendAt.toString());

        toast.success("Profile updated. Please verify your new email.");

        // Switch to OTP View
        setPendingEmail(newEmail || "jeesvincent@gmail.com");
        setShowOtp(true);
        setIsEditing(false);
        setIsEmailEditing(false);
      } else {
        // Standard profile update (no email change)
        const submitData = { ...formData, email: undefined };
        await updateBasicProfile(submitData).unwrap();

        toast.success("Profile updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  if (isUpdatingBasicProfile || isUpdatingUserEmail) {
    return <Loading message="Updating..." />;
  }

  if (showOtp) {
    return (
      <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A1A] p-6 text-center">
        <h2 className="text-lg font-semibold mb-2">Verify Your Email</h2>
        <p className="text-sm text-neutral-500 mb-6">
          We sent a verification code to <strong>{pendingEmail}</strong>
        </p>

        {/* Render the OTP Component */}
        <UpdateEmailOtpVerification
          email={pendingEmail}
          onSuccess={() => setShowOtp(false)}
          onCancel={() => {
            setShowOtp(false);
            router.push(USER_ROUTES.SETTINGS.PROFILE);
          }}
        />
      </div>
    );
  }

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

        <div>
          <InputGroup
            label="Email"
            readOnly={!isEmailEditing}
            {...register("email")}
          >
            {isEditing && (
              <Edit
                onClick={handleEmailEdit}
                className="dark:text-white text-black hover:cursor-pointer"
                size={16}
              />
            )}
          </InputGroup>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Bio
          </label>
          <textarea
            {...register("bio")}
            readOnly={!isEditing}
            className={`min-h-25 w-full rounded-md border p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#C35B00] ${
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
