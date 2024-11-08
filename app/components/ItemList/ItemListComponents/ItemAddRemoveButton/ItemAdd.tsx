"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import useStore from "@/hooks/zustand/useStore";
import React from "react";

const ItemAdd: React.FC<any> = ({ ...rest }) => {
  const { incrementOrderItemQuantity, groupedItemList } = useStore(
    (state) => state
  );

  if (rest.disableAddRemoveButton) {
    return null;
  }

  return (
    <button
      style={{ display: "inline-block", margin: "0 .4rem" }}
      className="border border-gray-300 px-2 rounded-md font-semibold"
      onClick={async () => {
        await incrementOrderItemQuantity(rest.item.id);
        rest.set_items(groupedItemList());
      }}
    >
      <span>+</span>
    </button>
  );
};
export default ItemAdd;
