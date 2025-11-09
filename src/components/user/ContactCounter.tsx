import { useInitializeUser } from "../../hooks/useInitializeUser";
import { Loader } from "../Loader";

export const ContactCounter = () => {
  const { user, loading } = useInitializeUser();

  return (
    <div className="p-4 rounded-3xl bg-base-200 min-w-75 w-fit flex flex-col gap-2">
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
