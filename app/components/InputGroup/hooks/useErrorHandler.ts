import { useState } from "react";
import { ErrorState } from "../interfaces";

export default function useErrorHandler(initErrors: { [key: string]: any }) {
  const [errors, setUseErrors] = useState<ErrorState>({
    ...initErrors,
    counter: 0,
  });

  function setErrors(_errors: ErrorState) {
    setUseErrors({
      ..._errors,
      counter: errors.counter + 1,
    });
  }

  return { errors, setErrors };
}
