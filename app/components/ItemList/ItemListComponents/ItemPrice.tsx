/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatPrice } from "@/hooks/helper/helper";
import React from "react";

const ItemPrice: React.FC<any> = ({ ...rest }) => {
  return (
    <p className="w-full text-right italic" style={{ minWidth: "100px" }}> {formatPrice(rest.price)} </p>
  );
};
export default ItemPrice;
