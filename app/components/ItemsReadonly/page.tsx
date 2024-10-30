"use client";

import Header1 from "../Headers/Header1";
// import useStore from "@/hooks/zustand/useStore";
import ItemName from "./ItemsReadonlyComponents/ItemName";
import ItemPrice from "./ItemsReadonlyComponents/ItemPrice";
import ItemRepresentative from "./ItemsReadonlyComponents/ItemRepresentative";

export default function ItemsReadonly({
  items = [],
  listProps,
  disablePrice,
  disableRepresentative,
  listOnClick,
}: {
  item?: any[];
  items?: any[];
  disablePrice?: boolean;
  disableRepresentative?: boolean;
  listProps?: React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >;
  listOnClick?: any;
}) {
  function RenderNoItemsManager() {
    if (!items || items.length == 0) {
      return <li key={0} className="text-center p-8 text-gray-400 text-xl"> No Items.. </li>;
    }
    return null;
  }

  return (
    <div className="mt-4 py-4 flex flex-col gap-4">
      <Header1> Items </Header1>
      <ol className="flex flex-col gap-4">
        {RenderNoItemsManager()}
        {items.map((item: any, index: any) => {
          return (
            <li
              style={{
                ...listProps?.style,
                padding: "1.4rem 0",
              }}
              key={index + item.name}
              {...listProps}
              className="p-4 flex flex-row justify-between items-center cursor-pointer w-full gap-4 border border-gray-400  hover:border-gray-600 hover:bg-gray-100 transition-colors"
              onClick={(event) => {
                listOnClick && listOnClick(item, event);
              }}
            >
              <ItemRepresentative
                disableRepresentative={disableRepresentative}
              />
              <ItemName name={item.name} />
              <ItemPrice price={item.price} disablePrice={disablePrice} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
