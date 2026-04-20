"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cropper, { Area } from "react-easy-crop";
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
import { useScheduleLiveMutation } from "@/lib/service/user-api/liveApi";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { CHANNEL_ROUTES } from "@/constants/routers/channels";
import { ErrorCode } from "@/constants/enums";
import GlobalErrorDialog from "@/components/organisms/GlobalActionDialog";

const ScheduleLiveForm = () => {
  const [selectedImageStr, setSelectedImageStr] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

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
      thumbnail: "",
    },
  });

  const thumbnailBase64 = useWatch({
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
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setPixelCrop(croppedAreaPixels);
    },
    [],
  );

  const handleCropComplete = async () => {
    if (!selectedImageStr) return;

    try {
      const croppedBase64 = await getCroppedImg(selectedImageStr, pixelCrop);

      setValue("thumbnail", croppedBase64, { shouldValidate: true });

      setIsCropModalOpen(false);
      setSelectedImageStr(null);
    } catch (e) {
      console.error("Error cropping image:", e);
      toast.error("Could not crop image");
    }
  };

  const [scheduleLive] = useScheduleLiveMutation();
  const router = useRouter();
  const channelId = useParams().id as string;
  const [globalErrorCode, setGlobalErrorCode] = useState<ErrorCode | null>(
    null,
  );

  const onSubmit = async (data: ScheduleLiveFormValues) => {
    try {
      const localDateTime = new Date(`${data.date}T${data.time}`);
      const scheduledAt = localDateTime.toISOString();
      const payload = {
        ...data,
        scheduledAt,
      };

      await scheduleLive({ data: payload, channelId }).unwrap();
      toast.success("Live Scheduled successfully");
      router.push(CHANNEL_ROUTES.SCHEDULED_LIVE.ROOT(channelId));
    } catch (err) {
      const error = err as {
        data: {
          message?: string;
          error?: { code: ErrorCode; message: string };
        };
      };
      if (error.data?.error?.code) {
        toast.error(error.data.error.message);
        setGlobalErrorCode(error.data.error.code);
        return;
      }
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  if (globalErrorCode) return <GlobalErrorDialog errorCode={globalErrorCode} />;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-xl mx-auto p-6 border rounded-lg"
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
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2"
            >
              {Object.values(VISIBILITY).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
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
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input type="date" {...register("date")} />
          <Input type="time" {...register("time")} />
          <Input {...register("duration")} placeholder="01:30" />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Thumbnail</label>
          <div className="flex flex-col gap-2">
            <Input type="file" accept="image/*" onChange={onFileSelect} />

            {/* Reserved space to prevent layout jump */}
            {/* <div className="min-h-30"> */}
            {thumbnailBase64 && typeof thumbnailBase64 === "string" && (
              <div className="mt-2">
                <p className="text-xs text-green-600 mb-2">
                  ✓ Cropped thumbnail ready
                </p>
                <Image
                  src={thumbnailBase64}
                  alt="Thumbnail Preview"
                  width={320}
                  height={180}
                  className="h-24 w-auto object-cover rounded border"
                />
              </div>
            )}
            {/* </div> */}
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
          {isSubmitting ? "Scheduling..." : "Schedule Live"}
        </Button>
      </form>

      {/* CROP MODAL */}
      {isCropModalOpen && selectedImageStr && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-background p-6 rounded-lg w-full max-w-2xl space-y-4">
            <h3 className="text-lg font-bold">Crop Thumbnail</h3>

            <div className="relative h-100 w-full bg-muted rounded">
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

            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(Number(e.target.value))}
            />

            <div className="flex justify-end gap-2">
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
