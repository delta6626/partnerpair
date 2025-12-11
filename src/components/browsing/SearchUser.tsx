import { useSearchParams } from "react-router-dom";
import { useFilterMenuStore } from "../../store/useFilterMenuStore";

export const SearchUser = () => {
  const { isOpen, setIsOpen } = useFilterMenuStore();

  const [searchParams] = useSearchParams();

  return (
    <div className="flex gap-2">
      <button className="btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Filters" : "Open Filters"}
      </button>

      <button className="btn btn-primary" disabled={searchParams.size === 0}>
        Search
      </button>
    </div>
  );
};
