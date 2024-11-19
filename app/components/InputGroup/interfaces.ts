/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ErrorStateBase {
  counter: number; // required
}

export interface ErrorState extends ErrorStateBase {
  [key: string]: any; // allows any additional properties
}

export interface InputGroupErrorState extends ErrorStateBase {
  message: string | null | "";
}

export interface InputGroupTextProps {
  children: string | React.ReactNode;
  id?: string;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  labelProps?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  errorProps?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  errorMessage?: InputGroupErrorState;
}
