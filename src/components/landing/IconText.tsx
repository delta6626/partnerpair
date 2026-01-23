import type { LucideIcon } from "lucide-react";

export const IconText = ({ icon: Icon, text, className }: { icon: LucideIcon; text: string; className?: string }) => {
  return (
    <h1 className={`flex items-center gap-2 text-accent ${className}`}>
      <Icon className="text-primary" size={20} />
      {text}
    </h1>
  );
};
