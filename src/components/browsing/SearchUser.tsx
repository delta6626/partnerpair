import { useFilterMenuStore } from "../../store/useFilterMenuStore";

export const SearchUser = () => {
  const { isOpen, setIsOpen } = useFilterMenuStore();

  return (
    <div className="flex gap-2">
      <button className="btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Filters" : "Open Filters"}
      </button>

      <button className="btn btn-primary">Search</button>
    </div>
  );
};
