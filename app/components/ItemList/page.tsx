/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useStore from "@/hooks/zustand/useStore";
import { useEffect } from "react";
import ItemAdd from "./ItemListComponents/ItemAddRemoveButton/ItemAdd";
import ItemRemove from "./ItemListComponents/ItemAddRemoveButton/ItemRemove";
import ItemCheckboxInput from "./ItemListComponents/ItemCheckboxInput";
import ItemDeleteButton from "./ItemListComponents/ItemDeleteButton";
import ItemName from "./ItemListComponents/ItemName";
import ItemPrice from "./ItemListComponents/ItemPrice";
import TotalItems from "./ItemListComponents/TotalItems";
import QuantityItem from "./ItemListComponents/QuantityItem";


const ItemList: React.FC = ({ ...rest }: {
  disableCheckbox?: boolean;
  disableAddRemoveButton?: boolean;
  disableDeleteButton?: boolean;
  disableTotalItems?: boolean;
}) => {
  const { ...dataStore } = useStore((state) => state);

  useEffect(() => {
    
  }, []);

  // TODO  Add policy and logic - remove and add cannot be above the total items quantity

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }} >
        {/* {JSON.stringify(dataStore.groupedItemList())} */}
        <ol style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "1rem" }} >
          {dataStore.groupedItemList().map((item: any, index: any) => {
            return (
              <li key={index}>
                <ItemCheckboxInput disableCheckbox={rest.disableCheckbox} />
                <ItemRemove disableAddRemoveButton={rest.disableAddRemoveButton} />
                <ItemName name={item.name} />
                <ItemAdd disableAddRemoveButton={rest.disableAddRemoveButton} />
                <QuantityItem item={item} disableAddRemoveButton={rest.disableAddRemoveButton}  />
                <ItemPrice price={item.price} />
                <ItemDeleteButton disableDeleteButton={rest.disableDeleteButton}  />
              </li>
            );
          })}
        </ol>

      <hr />
      <TotalItems price={dataStore.getTotalOrderItemsPrice()} disableTotalItems={rest.disableTotalItems} />
    </div>
  );
};

export default ItemList;
