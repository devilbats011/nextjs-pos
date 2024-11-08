/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { ButtonBaseProps } from "./ButtonInterface";

//* Button Base Composition
//! Very tigh coupled with ButtonBig / ButtonSmall!
export default function ButtonBase({
  children,
  variant,
  color = "primary",
  buttonProps,
  key,
}: ButtonBaseProps) {
  const [colorGroup, setColorGroup] = useState(variant.primary);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    switch (color) {
      case "primary":
        setColorGroup(variant.primary);
        break;
      case "secondary":
        setColorGroup(variant.secondary);
        break;
      case "warning":
        setColorGroup(variant.warning);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return (
    <button
      {...buttonProps}
      key={key}
      style={{ ...colorGroup, ...buttonProps?.style }}
      onClick={async (event) => {
        {
          if (buttonProps?.onClick) {
            event.preventDefault();
            setLoading(true);
            await buttonProps?.onClick(event);
            setLoading(false);
          }
        }
      }}

      disabled={loading || buttonProps?.disabled}
    >
      {!loading ? children : "Loading..."}
    </button>
  );
}
