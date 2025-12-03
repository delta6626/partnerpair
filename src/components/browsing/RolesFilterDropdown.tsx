import { ChevronDown, XIcon } from "lucide-react";
import type { UserRole } from "../../../shared/types/UserRole";
import { GenericChip } from "../ProfileViewer/GenericChip";
import { useSearchParams } from "react-router-dom";
import { SETTINGS } from "../../../shared/constants/SETTINGS";

export const RolesFilterDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const roles = searchParams.get("roles")?.split(",") ?? [];
  const validParameterRoles = roles.filter((role) => validRoles.includes(role as UserRole));

  const handleRoleAddition = (role: string) => {
    if (validParameterRoles.includes(role)) return;
    if (validParameterRoles.length >= SETTINGS.MAX_ROLE_COUNT) return;

    const trimmedRole = role.trim();
    if (!trimmedRole) return;

    const updatedRoles = [...validParameterRoles, trimmedRole];
    searchParams.set("roles", updatedRoles.join(","));
    setSearchParams(searchParams);
  };

  const handleRoleDeletion = (roleToDelete: string) => {
    const updatedRoles = validParameterRoles.filter((role) => role !== roleToDelete);
    if (updatedRoles.length > 0) {
      searchParams.set("roles", updatedRoles.join(","));
    } else {
      searchParams.delete("roles");
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Roles
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-200 mt-2 p-4">
        <div>
          {validParameterRoles.length > 0 && <h1 className="text-accent">Selected</h1>}
          {validParameterRoles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 mb-4">
              {validParameterRoles.map((role) => {
                return (
                  <GenericChip
                    key={`selected-${role}`}
                    chipText={role}
                    fallbackText=""
                    onClick={() => {
                      handleRoleDeletion(role);
                    }}
                  >
                    <XIcon size={20} className="hover:text-error focus:text-error ease-in-out duration-200" />
                  </GenericChip>
                );
              })}
            </div>
          )}
        </div>

        <div className="">
          <h1 className="text-accent">Options</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {validRoles.map((role) => {
              return (
                <GenericChip
                  key={`option-${role}`}
                  chipText={role}
                  onClick={() => {
                    handleRoleAddition(role);
                  }}
                />
              );
            })}
          </div>
        </div>
      </ul>
    </div>
  );
};
