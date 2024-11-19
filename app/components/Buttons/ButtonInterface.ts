/* eslint-disable @typescript-eslint/no-explicit-any */

export interface variantProps {
  primary: React.CSSProperties;
  secondary: React.CSSProperties;
  warning: React.CSSProperties;
}

export interface ButtonProps {
  children?: React.ReactNode;
  color?: "primary" | "secondary" | "warning";
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  key?: any;
}

export interface ButtonSmallProps extends ButtonProps {
  customStylingPrimary?: React.CSSProperties;
  customStylingSecondary?: React.CSSProperties;
  customStylingWarning?: React.CSSProperties;
}

export interface ButtonBigProps extends ButtonProps  {
  icon?: React.ReactNode
}


export interface ButtonBaseProps extends ButtonProps {
  variant: variantProps;
}
