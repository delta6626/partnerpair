import { useFilterMenuStore } from "../../store/useFilterMenuStore";

export const SearchUser = () => {
  const { isOpen, setIsOpen } = useFilterMenuStore();

  return (
    <>
      <button className="btn min-w-30" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Filters" : "Open Filters"}
      </button>
    </>
  );
};
