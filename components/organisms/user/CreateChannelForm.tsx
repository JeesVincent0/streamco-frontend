"use client";

import React, { useState, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon, PlusIcon } from "lucide-react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import Image from "next/image";

import {
  createChannelSchema,
  CreateChannelValues,
} from "@/features/user/validators/channel-create-form.schema";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateChannelMutation } from "@/lib/service/user-api/channelApi";
import { useRouter } from "next/navigation";
import { USER_ROUTES } from "@/constants/routers";

// ─── Helper: Crop Image Generator ──────────────────────────────────────────────
// ─── Helper: Crop Image Generator ──────────────────────────────────────────────
const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
): Promise<string> => {
  // Use window.Image to distinguish it from the Next.js Image component
  const image = new window.Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return canvas.toDataURL("image/jpeg");
};

// ─── Main Component ───────────────────────────────────────────────────────────
const CreateChannelForm = () => {
  const router = useRouter();
  const [createChannel] = useCreateChannelMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control, // Added control for useWatch
    formState: { errors, isSubmitting },
  } = useForm<CreateChannelValues>({
    resolver: zodResolver(createChannelSchema),
    defaultValues: {
      channelName: "",
      channelId: "",
      bio: "",
      profileImage: "",
      backgroundBanner: "",
    },
  });

  // Fixed React Compiler Warning by using useWatch instead of watch()
  const profileImagePreview = useWatch({ control, name: "profileImage" });
  const bannerPreview = useWatch({ control, name: "backgroundBanner" });

  // ─── Cropper State ───
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [cropType, setCropType] = useState<"profile" | "banner" | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // ─── Handlers ───
  const onFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "banner",
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result as string);
        setCropType(type);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    e.target.value = "";
  };

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleSaveCrop = async () => {
    if (imageToCrop && croppedAreaPixels && cropType) {
      const croppedImageBase64 = await getCroppedImg(
        imageToCrop,
        croppedAreaPixels,
      );

      if (cropType === "profile") {
        setValue("profileImage", croppedImageBase64, { shouldValidate: true });
      } else {
        setValue("backgroundBanner", croppedImageBase64, {
          shouldValidate: true,
        });
      }

      setCropModalOpen(false);
      setImageToCrop(null);
    }
  };

  const onSubmit = async (data: CreateChannelValues) => {
    try {
      await createChannel(data).unwrap();
      toast.success("Channel created successfully!");
      router.push(USER_ROUTES.SETTINGS.CHANNELS);
    } catch (err: unknown) {
      const error = err as { data: { message: string } };
      toast.error(error?.data?.message);
    }
  };

  const onClose = () => {
    router.back();
  };

  // ─── Styles ───
  const inputClass =
    "w-full rounded-md border p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#C35B00] bg-transparent border-black/10 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-500";
  const labelClass =
    "text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2 block";
  const uploadBoxClass =
    "relative border border-dashed border-black/20 dark:border-white/20 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors group cursor-pointer overflow-hidden";

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/5 relative overflow-hidden transition-all">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          New channel
        </h2>
        <button
          onClick={onClose}
          type="button"
          className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <XIcon className="size-5" />
        </button>
      </div>

      {/* ─── Form Body ─── */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Profile Image Upload */}
        <div>
          <label className={labelClass}>Add profile image</label>
          <div className={`${uploadBoxClass} size-24`}>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={(e) => onFileChange(e, "profile")}
            />
            {profileImagePreview ? (
              <Image
                src={profileImagePreview}
                alt="Profile Preview"
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-white transition-colors">
                <PlusIcon className="size-6" />
              </div>
            )}
          </div>
          {errors.profileImage && (
            <p className="text-xs text-red-500 mt-1">
              {errors.profileImage.message}
            </p>
          )}
        </div>

        {/* Channel Name */}
        <div>
          <label className={labelClass}>Channel name</label>
          <input
            type="text"
            placeholder="example name"
            className={inputClass}
            {...register("channelName")}
          />
          {errors.channelName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.channelName.message}
            </p>
          )}
        </div>

        {/* Channel ID */}
        <div>
          <label className={labelClass}>Channel id ( unique id )</label>
          <input
            type="text"
            placeholder="@examplename"
            className={inputClass}
            {...register("channelId")}
          />
          {errors.channelId && (
            <p className="text-xs text-red-500 mt-1">
              {errors.channelId.message}
            </p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className={labelClass}>Bio</label>
          <textarea
            placeholder="example description..."
            className={`${inputClass} min-h-24 resize-y`}
            {...register("bio")}
          />
          {errors.bio && (
            <p className="text-xs text-red-500 mt-1">{errors.bio.message}</p>
          )}
        </div>

        {/* Background Banner Upload */}
        <div>
          <label className={labelClass}>Background banner</label>
          <div className={`${uploadBoxClass} w-full h-32`}>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={(e) => onFileChange(e, "banner")}
            />
            {bannerPreview ? (
              <Image
                src={bannerPreview}
                alt="Banner Preview"
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-white transition-colors">
                <PlusIcon className="size-6" />
              </div>
            )}
          </div>
          {errors.backgroundBanner && (
            <p className="text-xs text-red-500 mt-1">
              {errors.backgroundBanner.message}
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#FF7701] hover:bg-[#e26900f3] text-white px-8 font-medium rounded"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>

      {/* ─── Cropping Modal ─── */}
      {cropModalOpen && imageToCrop && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
          <div className="flex items-center justify-between p-4 bg-black">
            <h3 className="text-white font-medium">
              Crop {cropType === "profile" ? "Profile Image" : "Banner"}
            </h3>
            <button
              onClick={() => setCropModalOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <XIcon className="size-5" />
            </button>
          </div>

          <div className="relative flex-1">
            <Cropper
              image={imageToCrop}
              crop={crop}
              zoom={zoom}
              aspect={cropType === "profile" ? 1 : 16 / 5}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>

          <div className="p-4 bg-black flex justify-between items-center gap-4">
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-1/2 accent-[#FF7701]"
            />
            <Button
              onClick={handleSaveCrop}
              className="bg-[#FF7701] hover:bg-[#e26900f3] text-white"
            >
              Apply Crop
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateChannelForm;
