import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = "Loading..." }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <Loader2 className="size-6 animate-spin text-primary" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

export default Loading;
