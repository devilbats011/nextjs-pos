'use client';

import { GroupItemProps } from "@/hooks/zustand/interface/item";
/* eslint-disable @typescript-eslint/no-explicit-any */
import useStore from "@/hooks/zustand/useStore";
import React from "react";


const ItemRemove: React.FC<any> = ({ item,set_items, disableAddRemoveButton }: { disableAddRemoveButton?: boolean,item: GroupItemProps;set_items: React.Dispatch<React.SetStateAction<GroupItemProps[]>>, rest: any}) => {
  
  const { decrementOrderItemQuantity, groupedItemList } = useStore((state) => state);
  
  if(disableAddRemoveButton) {
    return null;
  }

  async function onClickHandler() {
    if(item.quantity <= 1) {
      return;
    }
    await decrementOrderItemQuantity(item.id);
    set_items(groupedItemList());
  }

  return (
    <button style={{ display: "inline-block", margin: "0 .4rem" }}
    className="border border-gray-300 px-2 rounded-md font-semibold"
    onClick={onClickHandler}
    > 
    <span style={{ bottom: "5px"}} className="relative" >
        _
    </span>
        
    </button>
  );
};
export default ItemRemove;
