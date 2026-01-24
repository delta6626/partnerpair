import type { LucideIcon } from "lucide-react";

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full rounded-3xl flex flex-col gap-2 p-8 border border-base-100">
      <div className="bg-primary/20 text-primary rounded-xl w-fit px-4 py-2">
        <Icon size={20} />
      </div>
      <h1 className="text-lg max-w-xs">{title}</h1>
      <h1 className="text-accent max-w-xs">{description}</h1>
    </div>
  );
};
