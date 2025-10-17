import type { MouseEventHandler, ReactNode } from "react";

export const GenericChip = ({
  chipText,
  onClick,
  children,
}: {
  chipText: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
}) => {
  return (
    <div
      className="btn inline-flex items-center px-4 py-3 rounded-full border-1 border-accent select-none font-medium text-sm gap-2"
      onClick={onClick}
    >
      {chipText}
      {children}
    </div>
  );
};
