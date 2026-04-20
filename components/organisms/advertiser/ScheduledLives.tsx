import { ADVERTISER_ROUTES } from "@/constants/routers";
import ScheduledLivesTable from "@/components/molecules/advertiser/ScheduledLiveTables";
import AdminHeaderTemplate from "@/components/templates/admin/AdminHeaderTemplate";

const ScheduledLives = () => {
  return (
    <AdminHeaderTemplate
      text="Scheduled Live"
      url={ADVERTISER_ROUTES.HOME.SCHEDULED_LIVE.ROOT}
    >
      <ScheduledLivesTable />
    </AdminHeaderTemplate>
  );
};

export default ScheduledLives;
