import { GenericChip } from "./GenericChip";

export const GenericChipCollection = ({ listItems, fallbackText }: { listItems: string[]; fallbackText: string }) => {
  return (
    <div className="">
      {listItems.length != 0
        ? listItems.map((item) => {
            return <GenericChip key={item} chipText={item} />;
          })
        : ""}
    </div>
  );
};
