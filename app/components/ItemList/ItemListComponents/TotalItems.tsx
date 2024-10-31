/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatPrice } from "@/hooks/helper/helper";
import React from "react";

const TotalItems: React.FC<any> = ({ ...rest }) => {
  if (rest.disableTotalItems) {
    return null;
  }

  return (
    <li  key={"1_total_price"} className="text-xl w-full flex flex-row justify-between items-center p-4 font-bold gap-1"
    // style={{minWidth: "330px"}}
    
    >
      <p className="w-full text-left">
      Total
      </p>
      <p className="italic w-full text-right" style={{ minWidth: "100px" }}> { formatPrice(rest.price)}</p>
    </li>
  );
};
export default TotalItems;
