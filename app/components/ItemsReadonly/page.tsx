"use client";

// import useStore from "@/hooks/zustand/useStore";
import ItemName from "./ItemsReadonlyComponents/ItemName";
import ItemPrice from "./ItemsReadonlyComponents/ItemPrice";
import ItemRepresentative from "./ItemsReadonlyComponents/ItemRepresentative";

export default function ItemsReadonly({
  item = [],
  listProps,
  listOnClick,
}: {
  item: any[];
  listProps?: React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >;
  listOnClick?: any;
}) {
  //    const { ...dataStore } = useStore((state)=>state)

  return (
    <div className="py-4">
      <ol className="flex flex-col gap-4">
        {/* {...dataStore.groupedItemList().map((item: any, index: any) => { */}
        {item.map((item: any, index: any) => {
          return (
            <li
              {...listProps}    
              key={index}
              style={{
                padding: "1.4rem 0",
                // border: "1px solid #191A2C",
              }}
              className="flex flex-row justify-center items-center cursor-pointer w-full gap-4 border border-gray-400  hover:border-gray-600 hover:bg-gray-100 transition-colors"
              onClick={(event) => {
                listOnClick && listOnClick(item, event);
              }}
            >
              <ItemRepresentative />
              <ItemName name={item.name} />
              <ItemPrice price={item.price} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
