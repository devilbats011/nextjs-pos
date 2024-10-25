/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ItemWrapper from "./ItemWrapper";

const ItemRepresentative: React.FC<any> = ({ ...rest }) => {

  if(rest.disableRepresentative){
    return null;
  }
  
  return (
    <ItemWrapper>
      <div
        style={{
          width: "36px",
          height: "36px",
          backgroundColor: "#7A288A",
          display: "inline-block",
        }}
      ></div>
    </ItemWrapper>
  );
};
export default ItemRepresentative;
