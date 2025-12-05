import { ChevronDown } from "lucide-react";
import type { UserRole } from "../../../shared/types/UserRole";
import { GenericChip } from "../ProfileViewer/GenericChip";

export const LookingForRolesFilterDropdown = () => {
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

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <button tabIndex={0} role="button" className="btn">
        Roles they seek
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-200 mt-2 p-4">
        <div className="">
          <h1 className="text-accent">Options</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {validRoles.map((role) => {
              return <GenericChip key={`option-${role}`} chipText={role} />;
            })}
          </div>
        </div>
      </ul>
    </div>
  );
};
