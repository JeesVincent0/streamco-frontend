"use client";

import { CHANNEL_ROUTES } from "@/constants/routers/channels";
import AdminHeaderTemplate from "@/components/templates/admin/AdminHeaderTemplate";
import ScheduledLivesTable from "@/components/molecules/channel/ScheduledLivesTable";
import { useParams } from "next/navigation";

const ScheduledLives = () => {
  const channleId = useParams().id as string;
  return (
    <AdminHeaderTemplate
      url={CHANNEL_ROUTES.SCHEDULED_LIVE.ROOT(channleId)}
      text={`Scheduled Lives`}
    >
      <ScheduledLivesTable />
    </AdminHeaderTemplate>
  );
};

export default ScheduledLives;
