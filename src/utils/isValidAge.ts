export const isValidAge = (
  dateOfBirth: string,
  minimumAge: number,
  maximumAge: number,
  allowEmpty: boolean
): boolean => {
  if (dateOfBirth === "") return allowEmpty;

  const birthDate = new Date(dateOfBirth);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Check if the birthday hasn't occurred yet this year
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  const dayDiff = currentDate.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age >= minimumAge && age <= maximumAge;
};
