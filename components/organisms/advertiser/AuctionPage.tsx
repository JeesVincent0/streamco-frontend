import AuctoinBidListTable from "@/components/molecules/advertiser/AuctionBidListTable";
import ChannelOverView from "@/components/molecules/advertiser/ChannelOverView";
import AdminHeaderTemplate from "@/components/templates/admin/AdminHeaderTemplate";
import DetailedPageTemplate from "@/components/templates/admin/DetailedPageTemplate";
import { ADVERTISER_ROUTES } from "@/constants/routers";

const AuctionPage = () => {
  return (
    <AdminHeaderTemplate
      text="Scheduled Live - Auction"
      url={ADVERTISER_ROUTES.HOME.SCHEDULED_LIVE.ROOT}
    >
      <DetailedPageTemplate>
        <ChannelOverView />
        <AuctoinBidListTable />
      </DetailedPageTemplate>
    </AdminHeaderTemplate>
  );
};

export default AuctionPage;
