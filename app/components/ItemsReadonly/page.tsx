"use client";

// import useStore from "@/hooks/zustand/useStore";
import ItemName from "./ItemsReadonlyComponents/ItemName";
import ItemPrice from "./ItemsReadonlyComponents/ItemPrice";
import ItemRepresentative from "./ItemsReadonlyComponents/ItemRepresentative";

export default function ItemsReadonly({
  item = [], //TODO MUST remove this later .. after remove - check if there any page error using this component..
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
  return (
    <div className="py-4">
      <ol className="flex flex-col gap-4">
        {items.map((item: any, index: any) => {
          return (
            <li
              {...listProps}
              key={index + item.name}
              // key={Math.floor(Math.random() * 1000) + 1}
              style={{
                padding: "1.4rem 0",
                // color: '#3F2F67',
              }}
              className="flex flex-row justify-between items-center cursor-pointer w-full gap-4 border border-gray-400  hover:border-gray-600 hover:bg-gray-100 transition-colors"
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
