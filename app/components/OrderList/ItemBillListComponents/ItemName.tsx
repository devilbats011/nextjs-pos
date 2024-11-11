/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ItemName: React.FC<any> = ({ ...rest }) => {
  return (
    <div className="w-full"> {rest.name} </div>
  );
};
export default ItemName;
