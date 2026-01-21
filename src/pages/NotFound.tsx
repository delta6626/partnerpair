import { Link } from "react-router-dom";
import { Navbar } from "../components/navigation/Navbar";

export const NotFound = () => {
  return (
    <div className="w-full font-inter flex flex-col min-h-[100vh] bg-base-300 paddingContainer">
      <div className="py-4">
        <Navbar></Navbar>
      </div>

      <div className="flex flex-col items-center justify-center grow w-full">
        <h1 className="text-9xl font-black">404</h1>
        <h1 className="text-4xl font-bold mt-4">There's nothing here</h1>
        <p className="text-accent text-center mt-2">
          {" "}
          We couldn’t find the page you requested. The link may be <br /> outdated or incorrect.
        </p>
        <Link className="btn btn-primary mt-2" to={"/"}>
          Go Home
        </Link>
      </div>
    </div>
  );
};
