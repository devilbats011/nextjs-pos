/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Trash from "../../svg/Trash";
import useStore from "@/hooks/zustand/useStore";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import ToasterMessage from "../../ToasterMessage";
import { useRouter } from "next/navigation";
import { isArrayNotEmpty } from "@/hooks/helper/helper";

const ItemDeleteButton: React.FC<any> = ({ ...rest }) => {
  const router = useRouter();
  const { toaster } = useSonnerToast();
  const { deleteGroupOrderItemsById, deleteOrderItem, groupedItemList } =
    useStore((state) => state);

  const { item, set_items } = rest;

  if (rest.disableDeleteButton) {
    return null;
  }

  return (
    <button
      className="mr-4"
      onClick={(e) => {
        e.preventDefault();
        (async () => {
          deleteGroupOrderItemsById(item.id);

          const _groupedItemList = groupedItemList();
          set_items(_groupedItemList);
          toaster(<ToasterMessage> Items Deleted </ToasterMessage>);
          setTimeout(() => {
            if (!isArrayNotEmpty(_groupedItemList)) {
              return router.push("/user/sales");
            }
          }, 500);
        })();
      }}
    >
      <Trash />
    </button>
  );
};
export default ItemDeleteButton;
