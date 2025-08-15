import type { FieldError } from "./FieldError";

export type SignupFormErrors = {
  firstName: FieldError;
  lastName: FieldError;
  email: FieldError;
  password: FieldError;
  confirmedPassword: FieldError;
};
