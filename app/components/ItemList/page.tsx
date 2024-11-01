"use client";

import useStore from "@/hooks/zustand/useStore";
import { useEffect, useState } from "react";
import ItemAdd from "./ItemListComponents/ItemAddRemoveButton/ItemAdd";
import ItemRemove from "./ItemListComponents/ItemAddRemoveButton/ItemRemove";
import ItemCheckboxInput from "./ItemListComponents/ItemCheckboxInput";
import ItemDeleteButton from "./ItemListComponents/ItemDeleteButton";
import ItemName from "./ItemListComponents/ItemName";
import ItemPrice from "./ItemListComponents/ItemPrice";
import TotalItems from "./ItemListComponents/TotalItems";
import QuantityItem from "./ItemListComponents/QuantityItem";
import { ItemProps } from "@/hooks/zustand/interface/item";

const ItemList: React.FC = ({
  ...rest
}: {
  disableCheckbox?: boolean | undefined | Boolean;
  disableAddRemoveButton?: boolean;
  disableDeleteButton?: boolean;
  disableTotalItems?: boolean;
  items?: ItemProps[];
}) => {
  const { ...dataStore } = useStore((state) => state);
  const [_items, set_items] = useState<ItemProps[]>([]);

  useEffect(() => {
    if (!rest.items) {
      set_items(dataStore.groupedItemList());
    }
    else {
      set_items(rest.items);
    }
  }, []);

  // TODO  Add policy and logic - remove and add cannot be above the total items quantity

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      className="w-full"
    >
      {/* {JSON.stringify(dataStore.groupedItemList())} */}
      <ol className="flex flex-col justify-center items-center gap-1 w-full relative overflow-auto ">
        {_items.map((item: ItemProps, index: number) => {
          return (
            <li
              key={index}
              className="w-full flex flex-row justify-between items-center p-4 border-b gap-1"
            >
              <ItemDeleteButton
                disableDeleteButton={rest.disableDeleteButton}
              />
              {/* <ItemCheckboxInput disableCheckbox={rest.disableCheckbox} /> */}
              <ItemName style={{ width: "100px" }} name={item.name} />
              <ItemRemove
                disableAddRemoveButton={rest.disableAddRemoveButton}
                item={item}
              />
              <QuantityItem
                item={item}
                disableAddRemoveButton={rest.disableAddRemoveButton}
              />

              <ItemAdd
                disableAddRemoveButton={rest.disableAddRemoveButton}
                item={item}
              />

              <ItemPrice price={item.price} />
            </li>
          );
        })}
        <TotalItems
          price={dataStore.getTotalOrderItemsPrice()}
          disableTotalItems={rest.disableTotalItems}
        />
      </ol>
    </div>
  );
};

export default ItemList;
