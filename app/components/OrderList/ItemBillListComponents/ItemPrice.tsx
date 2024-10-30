/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ItemPrice: React.FC<any> = ({ ...rest }) => {
  return (
    <span> RM {rest.price} </span>
  );
};
export default ItemPrice;
