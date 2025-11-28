import { useFilterMenuStore } from "../../store/useFilterMenuStore";

export const SearchUser = () => {
  const { isOpen, setIsOpen } = useFilterMenuStore();

  return (
    <>
      <button className="btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Filters" : "Open Filters"}
      </button>
    </>
  );
};
