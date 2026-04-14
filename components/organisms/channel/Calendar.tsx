"use client";

import ScheduleCalendar from "@/components/molecules/channel/ScheduledSlotCalender";
import AdminHeaderTemplate from "@/components/templates/admin/AdminHeaderTemplate";
import DetailedPageTemplate from "@/components/templates/admin/DetailedPageTemplate";
import { CHANNEL_ROUTES } from "@/constants/routers/channels";
import { useParams } from "next/navigation";

const Calendar = () => {
  const channleId = useParams().id as string;
  return (
    <AdminHeaderTemplate
      url={CHANNEL_ROUTES.SCHEDULED_LIVE.ROOT(channleId)}
      text={`Scheduled Lives`}
    >
      <DetailedPageTemplate>
        <ScheduleCalendar channelId={channleId} />
      </DetailedPageTemplate>
    </AdminHeaderTemplate>
  );
};

export default Calendar;
