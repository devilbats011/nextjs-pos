'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import useStore from "@/hooks/zustand/useStore";
import React from "react";


const ItemRemove: React.FC<any> = ({ ...rest }) => {
  
  const {incrementOrderItemQuantity, decrementOrderItemQuantity } = useStore((state) => state);
  
  console.log(rest.item);
  
  if(rest.disableAddRemoveButton) {
    return null;
  }

  return (
    <div style={{ display: "inline-block", margin: "0 .4rem" }}
    className="border border-gray-300 px-2 rounded-md"
    >
      <button style={{ cursor: "pointer",bottom: "6px" }} className="relative"
        onClick={() => {decrementOrderItemQuantity(rest.item.id)}}
      >_</button>
    </div>
  );
};
export default ItemRemove;
