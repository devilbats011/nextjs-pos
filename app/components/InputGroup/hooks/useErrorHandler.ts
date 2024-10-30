import { useState } from "react";
import { ErrorState, InputGroupErrorState } from "../interfaces";

export default function useErrorHandler(initErrors: { [key: string]: any } = {}) {
  const [errors, setUseErrors] = useState<ErrorState>({
    ...initErrors,
    counter: 0,
  });

  const [inputGroupError, setUseInputGroupError] = useState<InputGroupErrorState>({
    message: '',
    counter: 0,
  });

  function setInputGroupError(message: InputGroupErrorState["message"]) {
    setUseInputGroupError({
      ...inputGroupError,
      message,
      counter: inputGroupError.counter + 1,
    });
  }

  function setErrors(_errors: ErrorState) {
    setUseErrors({
      ..._errors,
      counter: errors.counter + 1,
    });
  }
  return { errors, setErrors, inputGroupError, setInputGroupError };
}
