/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonBase from "./ButtonBase";
import { ButtonSmallProps, variantProps } from "./ButtonInterface";

export default function ButtonSmall({
  children,
  color = "primary",
  customStylingPrimary,
  customStylingWarning,
  customStylingSecondary,
  buttonProps,
}: ButtonSmallProps) {

  const variant: variantProps = {
    primary: {
      background: "white",
      color: "#3F2F67",
      border: "1px solid #3F2F67",
      fontWeight: "bold",
      ...customStylingPrimary,
    },
    secondary: {
      background: "white",
      color: "#3F2F67",
      border: "1px solid transparent",
      fontWeight: "bold",
      ...customStylingSecondary,
    },
    warning: {
      background: "white",
      color: "#B00020",
      border: "1px solid transparent",
      fontWeight: "bold",
      ...customStylingWarning,
    },
  };

  return (
    <ButtonBase
      color={color}
      variant={variant}
      buttonProps={{
        ...buttonProps,
        className:
          "w-max py-2 px-2.5 flex items-center justify-center text-base "+
          buttonProps?.className,
      }}
    >
      {children}
    </ButtonBase>
  );
}

// return (
//   <button
//     className="w-max py-2 px-2.5 flex items-center justify-center text-base"
//     {...buttonProps}
//     style={{ ...colorGroup, ...buttonProps?.style }}
//   >
//     {children}
//   </button>
// );
