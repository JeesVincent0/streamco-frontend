"use client";

import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  avatarUpdateSchema,
  AvatarUpdateInput,
} from "@/features/auth/validators/avatar-update-schema.validator";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import UserAvatar from "@/components/atoms/UserAvatar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface EditAvatarProps {
  currentAvatar: string;
  displayName: string;
}

const EditAvatarTrigger = ({ currentAvatar, displayName }: EditAvatarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, watch } = useForm<AvatarUpdateInput>({
    resolver: zodResolver(avatarUpdateSchema),
  });

  // Watch for file changes to create a local preview
  const selectedFiles = watch("avatar");

  useEffect(() => {
    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0];
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);

      // Cleanup memory when component unmounts or file changes
      return () => URL.revokeObjectURL(localUrl);
    }
  }, [selectedFiles]);

  const handleCancel = () => {
    setPreviewUrl(null);
    reset();
    setIsOpen(false);
  };

  const onFinalSubmit = async (data: AvatarUpdateInput) => {
    const file = data.avatar[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      toast.loading("Uploading new avatar...", { id: "upload-avatar" });

      // CALL YOUR API HERE
      // await uploadMutation(formData).unwrap();

      toast.success("Avatar updated!", { id: "upload-avatar" });
      setPreviewUrl(null);
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to upload");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (!open ? handleCancel() : setIsOpen(true))}
    >
      <DialogTrigger asChild>
        <button className="w-fit rounded bg-black/5 dark:bg-white/10 px-3 py-1 text-[10px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
          Edit avatar
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] bg-white dark:bg-[#1A1A1A] border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-neutral-900 dark:text-white">
            Update Profile Picture
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-6 py-6">
          {/* Avatar Preview Section */}
          <div className="relative h-44 w-44 rounded-full border-4 border-[#C35B00] p-1 group">
            <UserAvatar
              // Show previewUrl if exists, otherwise show the current original avatar
              avatarUrl={previewUrl || currentAvatar}
              displayName={displayName}
              className="h-full w-full"
            />

            {/* Overlay button when image is hovered */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Upload className="text-white" size={24} />
            </button>
          </div>

          <p className="text-xs text-neutral-500 text-center px-4">
            {previewUrl
              ? "Looks great! Click 'Update' to save these changes."
              : "Click the image or the button below to select a new photo."}
          </p>

          <form
            onSubmit={handleSubmit(onFinalSubmit)}
            className="w-full space-y-3"
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("avatar")}
              ref={(e) => {
                register("avatar").ref(e);
                // ts-ignore
                fileInputRef.current = e;
              }}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 dark:border-white/10"
                onClick={handleCancel}
              >
                Cancel
              </Button>

              {/* Only allow update if a new file is chosen */}
              <Button
                type="submit"
                disabled={!previewUrl}
                className="flex-1 bg-[#C35B00] hover:bg-[#a64d00] text-white disabled:opacity-50"
              >
                Update
              </Button>
            </div>

            {!previewUrl && (
              <Button
                type="button"
                variant="ghost"
                className="w-full text-[10px] uppercase tracking-wider text-neutral-400"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAvatarTrigger;
