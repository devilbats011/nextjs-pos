/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ItemName: React.FC<any> = ({ ...rest }) => {
  return (
    <p className="w-full" style={{minWidth: "200px"}}> {rest.name} </p>
  );
};
export default ItemName;
