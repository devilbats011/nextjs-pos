/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonBase from "./ButtonBase";
import { ButtonProps, variantProps } from "./ButtonInterface";

export default function ButtonSmall({
  children,
  color = "primary",
  buttonProps,
}: ButtonProps) {

  const variant: variantProps = {
    primary: {
      background: "white",
      color: "#3F2F67",
      border: "1px solid #3F2F67",
      fontWeight: "bold",
    },
    secondary: {
      background: "white",
      color: "#3F2F67",
      border: "1px solid transparent",
      fontWeight: "bold",
    },
    warning: {
      background: "white",
      color: "#B00020",
      border: "1px solid transparent",
      fontWeight: "bold",
    },
  };

  return (
    <ButtonBase
      color={color}
      variant={variant}
      buttonProps={{
        onClick: (e) => {
          console.log(e);
        },
        ...buttonProps,
        className:
          "w-max py-2 px-2.5 flex items-center justify-center text-base",
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
