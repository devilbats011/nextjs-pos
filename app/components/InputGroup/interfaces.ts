export interface errorMessageProps extends ErrorState {
    counter: number;

  }
  
  export interface ErrorState {
    counter: number; // required
    [key: string]: any; // allows any additional properties
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
  errorMessage?: errorMessageProps;
}

