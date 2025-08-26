export interface UserEducation {
  institution: string;
  degree: "Associate" | "Bachelor" | "Master" | "Doctorate" | "Professional" | "Diploma" | "Certificate" | "Other";
  degreeName: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number | null;
}
