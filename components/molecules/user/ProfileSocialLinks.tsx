import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputGroup from "../common/ProfileInputGroup";
import {
  strictSocialLinksSchema,
  type SocialLinksFormValues,
} from "@/features/user/validators";
import { useUpdateSocialLinksMutation } from "@/lib/service/user-api/settingsApi";
import Loading from "../common/LoadingPage";
import { toast } from "sonner";

// Define the incoming prop type based on your DB structure
interface SocialLinkData {
  type: string;
  url: string;
}

interface ProfileSocialLinksProps {
  data?: SocialLinkData[];
}

const ProfileSocialLinks = ({ data = [] }: ProfileSocialLinksProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateSocialLinks, { isLoading }] = useUpdateSocialLinksMutation();

  // 1. Transform the DB array into the flat form object
  const defaultValues = useMemo(() => {
    const defaults: SocialLinksFormValues = {
      instagram: "",
      x: "",
      facebook: "",
      youtube: "",
    };

    if (Array.isArray(data)) {
      data.forEach((link) => {
        // Convert 'INSTAGRAM' to 'instagram' to match our form schema keys
        const key = link.type.toLowerCase() as keyof SocialLinksFormValues;
        if (key in defaults) {
          defaults[key] = link.url;
        }
      });
    }

    return defaults;
  }, [data]);

  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SocialLinksFormValues>({
    resolver: zodResolver(strictSocialLinksSchema),
    defaultValues, // Set the initial mapped values
  });

  // 3. Keep form in sync if the database data updates (e.g., after a successful save)
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (formData: SocialLinksFormValues) => {
    try {
      // .unwrap() is crucial for RTK Query so it actually throws to the catch block on failure
      await updateSocialLinks(formData).unwrap();
      toast.success("Social links updated successfully");
      setIsEditing(false);
    } catch {
      toast.error("Something went wrong, try again later");
    }
  };

  const handleCancel = () => {
    reset(defaultValues); // Reverts typing back to the saved DB values
    setIsEditing(false);
  };

  if (isLoading) return <Loading message="Updating..." />;

  return (
    <section className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A1A] p-6 shadow-sm dark:shadow-none">
      <div className="mb-6 border-b border-black/5 dark:border-white/10 pb-2">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Social links
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <InputGroup
            label="Instagram"
            placeholder="Enter social link"
            disabled={!isEditing}
            error={errors.instagram?.message}
            {...register("instagram")}
          />
          <InputGroup
            label="X"
            placeholder="Enter social link"
            disabled={!isEditing}
            error={errors.x?.message}
            {...register("x")}
          />
          <InputGroup
            label="Facebook"
            placeholder="Enter social link"
            disabled={!isEditing}
            error={errors.facebook?.message}
            {...register("facebook")}
          />
          <InputGroup
            label="YouTube"
            placeholder="Enter social link"
            disabled={!isEditing}
            error={errors.youtube?.message}
            {...register("youtube")}
          />
        </div>

        <div className="mt-8 flex justify-end gap-4 items-center">
          {isEditing && (
            <button
              type="button"
              className="rounded dark:bg-white/5 dark:hover:bg-white/7 bg-black/5 hover:bg-black/7  px-6 py-2 text-xs font-semibold  hover:bg-[#b75500] hover:cursor-pointer"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
          {isEditing && (
            <button
              type="submit"
              className="rounded bg-[#C35B00]  px-6 py-2 text-xs font-semibold  hover:bg-[#b75500] hover:cursor-pointer text-white"
            >
              Save
            </button>
          )}
          {!isEditing && (
            <button
              type="button"
              className="rounded bg-[#C35B00]  px-6 py-2 text-xs font-semibold  hover:bg-[#b75500] hover:cursor-pointer text-white"
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

export default ProfileSocialLinks;
