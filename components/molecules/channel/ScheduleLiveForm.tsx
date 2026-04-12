"use client";

import React, { useState, useCallback } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cropper from "react-easy-crop";
import {
  VISIBILITY,
  ScheduleLiveFormValues,
  scheduleLiveSchema,
} from "@/features/channel/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/atoms/textarea";
import { CategorySelect } from "@/components/molecules/CategorySelectorComponent";
import { getCroppedImg } from "@/features/utility";

// Utility to convert Base64 Data URL to a File Object
const dataUrlToFile = async (
  dataUrl: string,
  fileName: string,
): Promise<File> => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: "image/jpeg" });
};

const ScheduleLiveForm = () => {
  const [selectedImageStr, setSelectedImageStr] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  // Cropper State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pixelCrop, setPixelCrop] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ScheduleLiveFormValues>({
    resolver: zodResolver(scheduleLiveSchema),
    defaultValues: {
      visibility: VISIBILITY.PUBLIC,
      duration: "01:00",
    },
  });

  const thumbnailFile = useWatch({
    control,
    name: "thumbnail",
  });

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImageStr(reader.result as string);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setPixelCrop(croppedAreaPixels);
    },
    [],
  );

  const handleCropComplete = async () => {
    if (!selectedImageStr) return;

    try {
      const croppedBase64 = await getCroppedImg(selectedImageStr, pixelCrop);
      const croppedFile = await dataUrlToFile(croppedBase64, "thumbnail.jpg");

      setValue("thumbnail", croppedFile, { shouldValidate: true });
      setIsCropModalOpen(false);
    } catch (e) {
      console.error("Error cropping image:", e);
    }
  };

  const onSubmit = async (data: ScheduleLiveFormValues) => {
    console.log("Form is valid! Submitting:", data);

    // Example of how to send to backend:
    // const formData = new FormData();
    // formData.append('title', data.title);
    // formData.append('thumbnail', data.thumbnail);
    // await fetch('/api/schedule', { method: 'POST', body: formData });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-xl p-6 border rounded-lg"
      >
        <h2 className="text-2xl font-bold">Schedule a Live</h2>

        <div className="space-y-1">
          <label className="text-sm font-medium">Title</label>
          <Input {...register("title")} placeholder="Enter live title" />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Visibility</label>
            <select
              {...register("visibility")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {Object.values(VISIBILITY).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            {errors.visibility && (
              <p className="text-red-500 text-xs">
                {errors.visibility.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Category</label>
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <CategorySelect
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.categoryId?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            {...register("description")}
            placeholder="Details about your stream..."
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Date</label>
            <Input type="date" {...register("date")} />
            {errors.date && (
              <p className="text-red-500 text-xs">{errors.date.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Time</label>
            <Input type="time" {...register("time")} />
            {errors.time && (
              <p className="text-red-500 text-xs">{errors.time.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Duration</label>
            <Input {...register("duration")} placeholder="01:30" />
            {errors.duration && (
              <p className="text-red-500 text-xs">{errors.duration.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Thumbnail</label>
          <div className="flex flex-col gap-2">
            <Input type="file" accept="image/*" onChange={onFileSelect} />

            {thumbnailFile && (
              <p className="text-xs text-green-600 font-medium mt-1">
                ✓ Cropped thumbnail ready (
                {Math.round(thumbnailFile.size / 1024)} KB)
              </p>
            )}
          </div>
          {errors.thumbnail && (
            <p className="text-red-500 text-xs">{errors.thumbnail.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Scheduling..." : "Schedule Live"}
        </Button>
      </form>

      {/* CROP MODAL */}
      {isCropModalOpen && selectedImageStr && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-background p-6 rounded-lg w-full max-w-2xl space-y-4 shadow-xl">
            <h3 className="text-lg font-bold">Crop Thumbnail</h3>

            <div className="relative h-[400px] w-full bg-muted border rounded overflow-hidden">
              <Cropper
                image={selectedImageStr}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Zoom</label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCropModalOpen(false);
                  setSelectedImageStr(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCropComplete}>Apply Crop</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleLiveForm;
