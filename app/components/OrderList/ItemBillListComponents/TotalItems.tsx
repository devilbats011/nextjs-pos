/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatPrice } from "@/hooks/helper/helper";
import React from "react";
const TotalItems: React.FC<any> = ({ price, ...props }) => {
  if (props.disableTotalItems) {
    return null;
  }

  return (
    <div className="font-bold flex justify-end gap-4 items-center">
      <div>Total</div>

      <div>{formatPrice(price)}</div>
    </div>
  );
};
export default TotalItems;
