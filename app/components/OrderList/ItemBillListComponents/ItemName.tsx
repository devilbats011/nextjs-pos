/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ItemName: React.FC<any> = ({ ...rest }) => {
  return (
    <div className="w-full flex flex-col items-center pt-1">
      <div> {rest.name} </div>
      {false && (
        <div className="text-sm text-red-500"> eg: Item refunded * 1 </div>
      )}
    </div>
  );
};
export default ItemName;
