/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Trash from "../../svg/Trash";
import useStore from "@/hooks/zustand/useStore";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import ToasterMessage from "../../ToasterMessage";

const ItemDeleteButton: React.FC<any> = ({ ...rest }) => {

  const { toaster } = useSonnerToast();
  const { deleteGroupOrderItemsById, deleteOrderItem, groupedItemList } = useStore((state) => state);
  
  const {item, set_items }  = rest;

  if(rest.disableDeleteButton) {
    return null;
  }

  return (
    <button
    className="mr-4"
    onClick={(e) => {
      e.preventDefault();
      (async()=>{
        deleteGroupOrderItemsById(item.id);
        set_items(groupedItemList());
        toaster(<ToasterMessage> Items Deleted </ToasterMessage>);
      })();
    }}
  >
    <Trash />
  </button>
  );
};
export default ItemDeleteButton;
