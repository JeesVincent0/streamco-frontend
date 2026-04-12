"use client";

import React, { useRef, useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/atoms/UserAvatar";
import { getCroppedImg } from "@/features/utility";
import { useUpdateAvatarMutation } from "@/lib/service/user-api/settingsApi";

const EditAvatarTrigger = ({
  currentAvatar,
  displayName,
}: {
  currentAvatar: string;
  displayName: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  // RTK Query Hook
  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();

  const handleSaveChanges = async () => {
    if (!croppedImage) return;

    try {
      // 1. Convert Base64/DataURL to Blob
      const response = await fetch(croppedImage);
      const blob = await response.blob();

      // 2. Create FormData
      const formData = new FormData();
      formData.append("file", blob, "avatar.jpg"); // 'file' must match Multer key in NestJS

      // 3. Trigger RTK Query Mutation
      await updateAvatar(formData).unwrap();

      toast.success("Profile picture updated!");
      handleReset();
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    }
  };

  // Cropper States
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
    }
  };

  const onCropComplete = useCallback(
    (
      _: {
        x: number;
        y: number;
        width: number;
        height: number;
      },
      pixels: {
        x: number;
        y: number;
        width: number;
        height: number;
      },
    ) => {
      setCroppedAreaPixels(pixels);
    },
    [],
  );

  const handleApplyCrop = async () => {
    try {
      const result = await getCroppedImg(
        image!,
        croppedAreaPixels as {
          x: number;
          y: number;
          width: number;
          height: number;
        },
      );
      console.log(result);
      setCroppedImage(result);
      setImage(null);
    } catch {
      toast.error("Could not crop image");
    }
  };

  const handleReset = () => {
    setImage(null);
    setCroppedImage(null);
    setZoom(1);
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => (!v ? handleReset() : setIsOpen(true))}
    >
      <DialogTrigger asChild>
        <button className="text-[10px] font-medium px-3 py-1 bg-black/5 dark:bg-white/10 rounded-md hover:bg-white/20 transition-colors">
          Edit avatar
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-112.5 bg-white dark:bg-[#1A1A1A] border-none">
        <DialogHeader>
          <DialogTitle className="text-center">
            Edit Profile Picture
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          {image ? (
            /* CROPPING VIEW */
            <div className="w-full space-y-6">
              <div className="relative w-full h-64 bg-neutral-900 rounded-lg overflow-hidden">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-neutral-500">Zoom</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-[#C35B00]"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setImage(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-[#C35B00] text-white"
                  onClick={handleApplyCrop}
                >
                  Apply
                </Button>
              </div>
            </div>
          ) : (
            /* PREVIEW / UPLOAD VIEW */
            <div className="flex flex-col items-center gap-6 w-full">
              <div className="h-44 w-44 rounded-full border-4 border-[#C35B00] p-1">
                <UserAvatar
                  avatarUrl={croppedImage || currentAvatar}
                  displayName={displayName}
                  className="h-full w-full"
                />
              </div>

              <div className="flex gap-3 w-full">
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/*"
                  onChange={onFileChange}
                />
                <Button
                  variant="outline"
                  className="flex-1 dark:border-white/10"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {croppedImage ? "Change Photo" : "Upload New"}
                </Button>

                {croppedImage && (
                  <Button
                    className="flex-1 bg-[#C35B00] text-white"
                    disabled={isLoading}
                    onClick={handleSaveChanges}
                  >
                    {isLoading ? "Uploading..." : "Save Changes"}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAvatarTrigger;
