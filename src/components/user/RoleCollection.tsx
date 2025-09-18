import type { UserRole } from "../../types/UserRole";
import { RoleHolder } from "./RoleHolder";

export const RoleCollection = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  const possibleRoles: UserRole[] = [
    "CEO",
    "COO",
    "CTO",
    "CPO",
    "CMO",
    "CFO",
    "CIO",
    "CSO",
    "Product Manager",
    "Designer",
    "UX Designer",
    "UI Designer",
    "UX Researcher",
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Mobile Developer",
    "Data Engineer",
    "ML Engineer",
    "QA Engineer",
    "Marketer",
    "Social Media Manager",
    "Content Creator",
    "SEO Specialist",
    "Community Manager",
    "Sales",
    "Business Development",
    "Partnerships",
    "Customer Success",
    "HR",
    "Legal",
    "Operations Manager",
    "Finance",
    "Advisor",
    "Other",
  ];

  return (
    <div className="w-full flex flex-wrap gap-2">
      {possibleRoles.map((role) => {
        return <RoleHolder key={role} roleName={role} isSelector={true} forCurrentUser={forCurrentUser}></RoleHolder>;
      })}
    </div>
  );
};
