import { ChevronDown, XIcon } from "lucide-react";
import type { UserRole } from "../../../shared/types/UserRole";
import { GenericChip } from "../ProfileViewer/GenericChip";
import { useSearchParams } from "react-router-dom";
import { SETTINGS } from "../../../shared/constants/SETTINGS";
import { BROWSE } from "../../../shared/constants/BROWSE";

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

  const roles = searchParams.get(BROWSE.PARAM_ROLES)?.split(",") ?? [];
  const validParameterRoles = roles.filter((role) => validRoles.includes(role as UserRole));

  const handleRoleAddition = (role: string) => {
    if (validParameterRoles.includes(role)) return;
    if (validParameterRoles.length >= SETTINGS.MAX_ROLE_COUNT) return;

    const trimmedRole = role.trim();
    if (!trimmedRole) return;

    const updatedRoles = [...validParameterRoles, trimmedRole];
    searchParams.set(BROWSE.PARAM_ROLES, updatedRoles.join(","));
    setSearchParams(searchParams);
  };

  const handleRoleDeletion = (roleToDelete: string) => {
    const updatedRoles = validParameterRoles.filter((role) => role !== roleToDelete);
    if (updatedRoles.length > 0) {
      searchParams.set(BROWSE.PARAM_ROLES, updatedRoles.join(","));
    } else {
      searchParams.delete(BROWSE.PARAM_ROLES);
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="dropdown dropdown-start lg:dropdown-end xl:dropdown-center">
      <button tabIndex={0} role="button" className="btn w-full flex justify-between">
        Roles
        <ChevronDown size={20} />
      </button>

      <ul
        tabIndex={0}
        className="flex flex-row dropdown-content menu bg-base-200 rounded-box z-1 w-full scrollbar-thin overflow-y-scroll max-h-60 md:scrollbar-none md:w-140 md:max-h-fit lg:w-200 mt-2 p-4 border border-base-100"
      >
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
