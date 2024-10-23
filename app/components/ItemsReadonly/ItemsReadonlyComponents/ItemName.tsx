/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ItemName: React.FC<any> = ({ ...rest }) => {
  return (
    <span> {rest.name} </span>
  );
};
export default ItemName;