/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ButtonBase from "./ButtonBase";
import { ButtonBigProps, variantProps } from "./ButtonInterface";
import style from "./button.module.css";

export default function ButtonBig({
  children,
  color = "primary",
  icon,
  buttonProps,
  key,
}: ButtonBigProps) {
  const variant: variantProps = {
    primary: {
      color: "white",
      fontWeight: "bold",
    },
    secondary: {
      background: "white",
      color: "#3F2F67",
      border: "1px solid #3F2F67",
      fontWeight: "bold",
    },
    warning: {
      color: "white",
      fontWeight: "bold",
    },
  };

  const standardClass = " w-full flex items-center justify-center text-xl p-4";
  const [className, setClassName] = useState(standardClass);
  useEffect(() => {

    switch (color) {
      case "primary":
        setClassName(standardClass + " " + style.bigButtonPrimary);
        break;
      case "secondary":
        break;
      case "warning":
        setClassName(standardClass + " " + style.bigButtonWarning);
        break;
      default:
        setClassName(standardClass + " " + style.bigButtonPrimary);
        break;
    }
  }, [color]);

  if (color === "warning") {
    variant.primary = variant.warning;
  }

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
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {icon}
          {children}
        </div>
      ) : (
        children
      )}
    </ButtonBase>
  );
}
