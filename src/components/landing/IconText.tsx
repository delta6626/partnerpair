import type { LucideIcon } from "lucide-react";

export const IconText = ({ icon: Icon, text }: { icon: LucideIcon; text: string }) => {
  return (
    <h1 className="flex items-center gap-2 text-accent">
      <Icon className="text-primary" size={20} />
      {text}
    </h1>
  );
};
