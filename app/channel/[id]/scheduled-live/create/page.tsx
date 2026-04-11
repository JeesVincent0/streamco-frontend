"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VISIBILITY,
  ScheduleLiveFormValues,
  scheduleLiveSchema,
} from "@/features/channel/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/atoms/textarea";

const ScheduleLiveForm = () => {
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

  const onSubmit = async (data: ScheduleLiveFormValues) => {
    console.log("Submitting:", data);
    // Logic for API call
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl p-6 border rounded-lg"
    >
      <h2 className="text-2xl font-bold">Schedule a Live</h2>

      {/* Title */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Title</label>
        <Input {...register("title")} placeholder="Enter live title" />
        {errors.title && (
          <p className="text-red-500 text-xs">{errors.title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Visibility */}
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
        </div>

        {/* Category Search Placeholder */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Category</label>
          <Input {...register("categoryId")} placeholder="Search category..." />
          {errors.categoryId && (
            <p className="text-red-500 text-xs">{errors.categoryId.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
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
        {/* Date */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Date</label>
          <Input type="date" {...register("date")} />
          {errors.date && (
            <p className="text-red-500 text-xs">{errors.date.message}</p>
          )}
        </div>

        {/* Time */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Time</label>
          <Input type="time" {...register("time")} />
          {errors.time && (
            <p className="text-red-500 text-xs">{errors.time.message}</p>
          )}
        </div>

        {/* Expected Duration */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Duration (HH:MM)</label>
          <Input {...register("duration")} placeholder="01:30" />
          {errors.duration && (
            <p className="text-red-500 text-xs">{errors.duration.message}</p>
          )}
        </div>
      </div>

      {/* Thumbnail (Hidden Input triggered by a Custom Button/Crop Logic) */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Thumbnail</label>
        <Controller
          control={control}
          name="thumbnail"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file)
                    setValue("thumbnail", file, { shouldValidate: true });
                }}
              />
              <p className="text-xs text-muted-foreground italic">
                Tip: You can add crop logic here before setValue.
              </p>
            </div>
          )}
        />
        {errors.thumbnail && (
          <p className="text-red-500 text-xs">{errors.thumbnail.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Scheduling..." : "Schedule Live"}
      </Button>
    </form>
  );
};

export default ScheduleLiveForm;
