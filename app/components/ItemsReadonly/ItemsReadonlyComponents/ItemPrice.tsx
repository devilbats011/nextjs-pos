/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ItemWrapper from "./ItemWrapper";

const ItemPrice: React.FC<any> = ({ ...rest }) => {

  if(rest.disablePrice){
    return null;
  }
  
  return (
    <ItemWrapper>
      <span className="font-bold"> RM {rest.price} </span>
    </ItemWrapper>
  );
};
export default ItemPrice;
