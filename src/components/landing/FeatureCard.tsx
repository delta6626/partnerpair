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
    <div className="">
      <Icon />
      {title}
      {description}
    </div>
  );
};
