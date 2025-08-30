import { IdCard } from "lucide-react";

export const ProfessionalInformationManager = () => {
  return (
    <div className="max-w-200 border-1 border-accent rounded-3xl p-4">
      <div className="flex items-center gap-2">
        <IdCard />
        <h1 className="text-lg">Professional Information</h1>
      </div>
    </div>
  );
};
