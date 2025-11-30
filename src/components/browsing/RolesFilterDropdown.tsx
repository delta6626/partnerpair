import { ChevronDown } from "lucide-react";
import type { UserRole } from "../../../shared/types/UserRole";
import { GenericChip } from "../ProfileViewer/GenericChip";
import { useSearchParams } from "react-router-dom";

export const RolesFilterDropdown = () => {
  const { searchParams, setSearchParams } = useSearchParams();

  const validRoles: UserRole[] = [
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

  const handleRoleAddition = (role: string) => {};

  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Roles
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2 p-4">
        <div className=""></div>
        <div className="w-200 flex flex-wrap gap-2">
          {validRoles.map((role) => {
            return (
              <GenericChip
                key={`available-${role}`}
                chipText={role}
                onClick={() => {
                  handleRoleAddition(role);
                }}
              />
            );
          })}
        </div>
      </ul>
    </div>
  );
};
