/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonBase from "./ButtonBase";
import { ButtonBigProps, ButtonProps, variantProps } from "./ButtonInterface";

export default function ButtonBig({
  children,
  color = "primary",
  icon,
  buttonProps,
  key,
}: ButtonBigProps) {
  const variant: variantProps = {
    primary: {
      background: "#3F2F67",
      color: "white",
      border: "1px solid #3F2F67",
      fontWeight: "bold",
    },

    secondary: {
      background: "white",
      color: "#3F2F67",
      border: "1px solid #3F2F67",
      fontWeight: "bold",
    },
    warning: {
      background: "#B00020",
      color: "white",
      border: "1px solid #B00020",
      fontWeight: "bold",
    },
  };

  const classNameStandard =
    "w-full flex items-center justify-center text-xl p-4";
  const className = classNameStandard;

  return (
    <ButtonBase
      color={color}
      variant={variant}
      buttonProps={{
        ...buttonProps,
        className,
      }}
      key={key}
    >
      {icon ? (
        <div style={{ display: "flex", alignItems: "center", gap: '2rem' }}>
          {icon}
          {children}
        </div>
      ) : (
        children
      )}
    </ButtonBase>
  );
}
