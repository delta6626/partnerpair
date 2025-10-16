import type { MouseEventHandler } from "react";

export const GenericChip = ({
  chipText,
  onClick,
}: {
  chipText: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className="btn inline-flex items-center px-4 py-3 rounded-full border-1 border-accent select-none font-medium text-sm gap-2">
      {chipText}
    </div>
  );
};
