/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ItemWrapper from "./ItemWrapper";

const ItemName: React.FC<any> = ({ ...rest }) => {
  return (
    <ItemWrapper>
      <span className="font-bold"> {rest.name} </span>
    </ItemWrapper>
  );
};
export default ItemName;
