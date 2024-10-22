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
}) => {
  const { ...dataStore } = useStore((state) => state);

  useEffect(() => {
    
  }, []);

  return (
    <>
      <hr />
        {/* {JSON.stringify(dataStore.groupedItemList())} */}
      <section style={{ display: "flex", flexDirection: "row", gap: "6px" }}>
        <ol>
          {dataStore.groupedItemList().map((item: any, index: any) => {
            return (
              <li key={index}>
                <ItemCheckboxInput disableCheckbox={rest.disableCheckbox} />
                <ItemRemove disableAddRemoveButton={rest.disableAddRemoveButton} />
                <ItemName name={item.name} />
                <ItemAdd disableAddRemoveButton={rest.disableAddRemoveButton} />
                <QuantityItem quantity={item.quantity} disableAddRemoveButton={rest.disableAddRemoveButton}  />
                <ItemPrice price={item.price} />
                <ItemDeleteButton disableDeleteButton={rest.disableDeleteButton}  />
              </li>
            );
          })}
        </ol>
      </section>
      <TotalItems price={dataStore.getTotalOrderItemsPrice()} />
      <hr />
    </>
  );
};

export default ItemList;
