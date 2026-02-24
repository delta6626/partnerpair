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
    <div className="w-full h-full rounded-3xl flex flex-col gap-2 p-8 bg-base-200">
      <div className="bg-primary/20 text-primary rounded-xl w-fit p-2">
        <Icon size={20} />
      </div>
      <h1 className="text-lg">{title}</h1>
      <h1 className="text-accent">{description}</h1>
    </div>
  );
};
