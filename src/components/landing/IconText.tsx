import type { LucideIcon } from "lucide-react";

export const IconText = ({ icon: Icon, text, topTag }: { icon: LucideIcon; text: string; topTag?: boolean }) => {
  const topTagClassName = "bg-primary/20 w-fit px-4 py-2 rounded-3xl text-primary text-sm";

  return (
    <h1 className={`flex items-center gap-2 text-accent ${topTag ? topTagClassName : ""}`}>
      <Icon className="text-primary" size={20} />
      {text}
    </h1>
  );
};
