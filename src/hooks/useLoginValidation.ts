import { useState } from "react";

export const useLoginValidation = (email: string, password: string) => {
  const [errrorMessage, setErrorMessage] = useState<string | null>(null);
  const [formValid, setFormValid] = useState<boolean>(false);

  return { errrorMessage, setErrorMessage, formValid };
};
