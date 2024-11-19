/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useStore from "@/hooks/zustand/useStore";
import { useEffect } from "react";
import ItemRemove from "../ItemListComponents/ItemAddRemoveButton/ItemRemove";
import ItemAdd from "../ItemListComponents/ItemAddRemoveButton/ItemAdd";
import ItemCheckboxInput from "../ItemListComponents/ItemCheckboxInput";
import ItemDeleteButton from "../ItemListComponents/ItemDeleteButton";
import ItemName from "../ItemListComponents/ItemName";
import ItemPrice from "../ItemListComponents/ItemPrice";
import QuantityItem from "../ItemListComponents/QuantityItem";
import TotalItems from "../ItemListComponents/TotalItems";

const ItemListChargeOrder: React.FC = ({ ...rest }: {
  disableCheckbox?: boolean;
  disableAddRemoveButton?: boolean;
  disableDeleteButton?: boolean;
  disableTotalItems?: boolean;
}) => {
  const { ...dataStore } = useStore((state) => state);

  useEffect(() => {
  }, []);


  return (
    <>
      <hr />
        {/* {JSON.stringify(dataStore.groupedItemList())} */}
      <section style={{ display: "flex", flexDirection: "row", gap: "6px", padding: "1rem 0" }}>
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
      <TotalItems price={dataStore.getTotalOrderItemsPrice()} disableTotalItems={rest.disableTotalItems} />
      <hr />
    </>
  );
};

export default ItemListChargeOrder;
