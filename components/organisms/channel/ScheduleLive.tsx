import ScheduleLiveForm from "@/components/molecules/channel/ScheduleLiveForm";
import ScheduleCalendar from "@/components/molecules/channel/ScheduledSlotCalender";
import DetailedPageTemplate from "@/components/templates/admin/DetailedPageTemplate";

const ScheduleLive = () => {
  return (
    <DetailedPageTemplate>
      <div className="min-h-screen flex justify-center p-4 gap-3.5">
        <ScheduleLiveForm />
        <ScheduleCalendar />
      </div>
    </DetailedPageTemplate>
  );
};

export default ScheduleLive;
