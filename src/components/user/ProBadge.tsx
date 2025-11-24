import { CircleStar } from "lucide-react";

export const ProBadge = () => {
  return (
    <div className="px-2 flex items-center gap-1 rounded-lg bg-primary/20">
      <CircleStar className="text-primary" size={15} />
      <p className="text-primary">Pro</p>
    </div>
  );
};
