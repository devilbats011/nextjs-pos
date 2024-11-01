'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import useStore from "@/hooks/zustand/useStore";
import React from "react";

const ItemAdd: React.FC<any> = ({ ...rest }) => {

  const {incrementOrderItemQuantity, decrementOrderItemQuantity } = useStore((state) => state);
  
  if(rest.disableAddRemoveButton) {
    return null;
  }

  return <div style={{ display: "inline-block", margin: "0 .4rem" }}
  className="border border-gray-300 px-2 rounded-md"
  >
  <button style={{ cursor: "pointer" }}
  className=""
  onClick={() => {incrementOrderItemQuantity(rest.item.id)}}
  >+</button>
</div>;
};
export default ItemAdd;
