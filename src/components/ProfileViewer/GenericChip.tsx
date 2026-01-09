import type { MouseEventHandler, ReactNode } from "react";

export const GenericChip = ({
  chipText,
  onClick,
  children,
  fallbackText,
}: {
  chipText: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
  fallbackText?: string;
}) => {
  return (
    <>
      {chipText ? (
        <div
          className="btn inline-flex items-center px-4 py-3 rounded-full border border-base-100 select-none font-medium text-sm gap-2"
          onClick={onClick}
        >
          {chipText}
          {children}
        </div>
      ) : (
        <p className="text-center text-accent">{fallbackText}</p>
      )}
    </>
  );
};
