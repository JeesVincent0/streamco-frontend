import ScheduleLiveForm from "@/components/molecules/channel/ScheduleLiveForm";
import DetailedPageTemplate from "@/components/templates/admin/DetailedPageTemplate";

const ScheduleLive = () => {
  return (
    <DetailedPageTemplate>
      <div className="min-h-screen flex  justify-center p-4">
        <ScheduleLiveForm />
      </div>
    </DetailedPageTemplate>
  );
};

export default ScheduleLive;
