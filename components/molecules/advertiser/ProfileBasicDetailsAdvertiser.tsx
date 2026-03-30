"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { Edit } from "lucide-react";

import InputGroup from "../common/ProfileInputGroup";
import Loading from "../common/LoadingPage";
import {
  useUpdateBasicProfileMutation,
  useUpdateUserEmailMutation,
} from "@/lib/service/user-api/settingsApi";
import UpdateEmailOtpVerification from "../user/UpdateEmailOtpVerification";
import { useRouter } from "next/navigation";
import { ADVERTISER_ROUTES } from "@/constants/routers";
import { advertiserUpdateSchema } from "@/features/auth/validators/base-advertiser-update-schema.validator";

interface ProfileBasicDetailsProps {
  data: {
    displayName: string;
    email: string;
    companyName: string;
  };
}

const ProfileBasicDetailsAdvertiser = ({ data }: ProfileBasicDetailsProps) => {
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
    resolver: zodResolver(advertiserUpdateSchema),
    defaultValues: {
      displayName: data.displayName,
      email: data.email || "",
      companyName: data.companyName || "",
    },
  });

  // Sync external data changes to the form
  useEffect(() => {
    reset({
      displayName: data.displayName,
      email: data.email,
      companyName: data.companyName,
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

  const onSave = async (formData: z.infer<typeof advertiserUpdateSchema>) => {
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
          companyName: formData.companyName,
        }).unwrap();

        // 2. Update email
        const res = await updateUserEmail({ email: newEmail }).unwrap();
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("purpose", res.data.purpose);
        localStorage.setItem("otpResendAt", res.data.otpResendAt.toString());

        toast.success("Profile updated. Please verify your new email.");

        // Switch to OTP View
        setPendingEmail(newEmail);
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
    } catch (err) {
      const error = err as { data: { message: string } };
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
            router.push(ADVERTISER_ROUTES.SETTINGS.PROFILE);
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

        <div>
          <InputGroup
            label="Company Name"
            readOnly={!isEditing}
            {...register("companyName")}
          />

          {errors.companyName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.companyName?.message}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-5">
          {isEditing ? (
            <>
              <button
                type="button"
                className="rounded bg-black/5 hover:cursor-pointer dark:bg-white/10 px-6 py-2 text-xs font-semibold"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded bg-[#C35B00] hover:bg-[#b75500] hover:cursor-pointer px-6 py-2 text-xs font-semibold text-white"
              >
                Save
              </button>
            </>
          ) : (
            <button
              type="button"
              className="rounded bg-[#C35B00] hover:bg-[#b75500] hover:cursor-pointer px-6 py-2 text-xs font-semibold text-white"
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

export default ProfileBasicDetailsAdvertiser;
