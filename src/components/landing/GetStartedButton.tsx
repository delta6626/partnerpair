import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const GetStartedButton = ({
  route,
  text,
  variant,
  className,
}: {
  route: string;
  text?: string;
  variant?: string;
  className?: string;
}) => {
  return (
    <Link className={`btn ${variant ? variant : ""} ${className ? className : ""}`} to={route}>
      {text ? text : "Get started"}
      <ArrowRight size={20} />
    </Link>
  );
};
