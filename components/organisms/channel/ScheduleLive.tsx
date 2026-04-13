"use client";

import ScheduleLiveForm from "@/components/molecules/channel/ScheduleLiveForm";
import ScheduleCalendar from "@/components/molecules/channel/ScheduledSlotCalender";
import AdminHeaderTemplate from "@/components/templates/admin/AdminHeaderTemplate";
import DetailedPageTemplate from "@/components/templates/admin/DetailedPageTemplate";
import { CHANNEL_ROUTES } from "@/constants/routers/channels";
import { useParams } from "next/navigation";

const ScheduleLive = () => {
  const channelId = useParams().id as string;
  return (
    <AdminHeaderTemplate
      text="Scheduled Lives"
      url={CHANNEL_ROUTES.SCHEDULED_LIVE.ROOT(channelId)}
    >
      <DetailedPageTemplate>
        <div className="min-h-screen flex flex-col lg:flex-row justify-center p-4 gap-3.5">
          <ScheduleLiveForm />
          <ScheduleCalendar />
        </div>
      </DetailedPageTemplate>
    </AdminHeaderTemplate>
  );
};

export default ScheduleLive;
