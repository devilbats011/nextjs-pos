/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ItemWrapper from "./ItemWrapper";
import { ItemProps } from "@/hooks/zustand/interface/item";

const ItemRepresentative: React.FC<any> = ({ item,...rest }: {item: ItemProps}) => {

  // @ts-ignore
  if(rest.disableRepresentative){
    return null;
  }
  
  return (
    <ItemWrapper>
      <div
        style={{
          width: "36px",
          height: "36px",
          backgroundColor: item.representation ?? "black",
          display: "inline-block",
        }}
      ></div>
    </ItemWrapper>
  );
};
export default ItemRepresentative;
