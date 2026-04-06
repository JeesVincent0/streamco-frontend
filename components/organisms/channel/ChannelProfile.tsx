"use client";

import { useParams } from "next/navigation";
import { useGetChannelDetailsQuery } from "@/lib/service/user-api/channelApi";
import ChannelDetailsPage from "@/components/molecules/admin/ChannelDetailsPage";

const ChannelProfile = () => {
  const channelId = useParams().id as string;
  const { data, isLoading, error } = useGetChannelDetailsQuery(channelId);

  return (
    <ChannelDetailsPage
      data={data?.data}
      isLoading={isLoading}
      error={error}
      isAdmin={false}
    />
  );
};

export default ChannelProfile;
