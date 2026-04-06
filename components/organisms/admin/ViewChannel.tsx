"use client";

import ChannelDetailsPage from "@/components/molecules/admin/ChannelDetailsPage";
import DetailedPageTemplate from "@/components/templates/admin/DetailedPageTemplate";
import { useGetChannelByIdAdminQuery } from "@/lib/service/user-api/channelApi";
import { useParams } from "next/navigation";

const ViewChannel = () => {
  const channelId = useParams().id as string;
  const { data, isLoading, error } = useGetChannelByIdAdminQuery(channelId);

  return (
    <DetailedPageTemplate>
      <ChannelDetailsPage
        data={data?.data}
        isLoading={isLoading}
        error={error}
      />
    </DetailedPageTemplate>
  );
};

export default ViewChannel;
