
export interface variantProps {
  primary: React.CSSProperties;
  secondary: React.CSSProperties;
  warning: React.CSSProperties;
}

export interface ButtonProps {
  children?: React.ReactNode;
  color?: "primary" | "secondary" | "warning";
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface ButtonBigProps extends ButtonProps  {
  icon?: React.ReactNode
}


export interface ButtonBaseProps extends ButtonProps {
  variant: variantProps;
}
