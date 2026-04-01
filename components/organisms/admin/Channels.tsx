import ChannelsTable from "@/components/molecules/admin/ChannelTable";
import AdminHeaderTemplate from "@/components/templates/admin/AdminHeaderTemplate";
import { ADMIN_ROUTES } from "@/constants/routers";

const Channels = () => {
  return (
    <AdminHeaderTemplate url={ADMIN_ROUTES.CHANNELS.ROOT} text={`Channels`}>
      <ChannelsTable />
    </AdminHeaderTemplate>
  );
};

export default Channels;
