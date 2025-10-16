import type { MouseEventHandler } from "react";
import { GenericChip } from "./GenericChip";

export const GenericChipCollection = ({
  listItems,
  fallbackText,
  onClick,
}: {
  listItems: string[];
  fallbackText: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className="w-full flex flex-wrap gap-2">
      {listItems.length != 0 ? (
        listItems.map((item) => {
          return <GenericChip key={item} chipText={item} onClick={onClick} />;
        })
      ) : (
        <p className="w-full text-center text-accent">{fallbackText}</p>
      )}
    </div>
  );
};
