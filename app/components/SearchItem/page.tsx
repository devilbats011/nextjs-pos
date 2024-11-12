"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CategoryProps } from "@/hooks/zustand/interface/category";
import { isArrayNotEmpty, updateObjectArray } from "@/hooks/helper/helper";
import ItemRepresentative from "../ItemsReadonly/ItemsReadonlyComponents/ItemRepresentative";
import ItemName from "../ItemList/ItemListComponents/ItemName";
import ItemPrice from "../ItemList/ItemListComponents/ItemPrice";
import { ItemProps } from "@/hooks/zustand/interface/item";

interface SearchItemProps {
  items?: any[];
  containerStyle?: React.CSSProperties;
  inputSearchStyle?: React.CSSProperties;
  listItemStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  itemOnClick?: any;
  useStateCategories: {
    categories: CategoryProps[];
    setCategories: Dispatch<SetStateAction<CategoryProps[]>>;
  };
}

const SearchItem: React.FC<SearchItemProps> = ({
  items = [],
  containerStyle = undefined,
  inputSearchStyle = undefined,
  listItemStyle = undefined,
  itemStyle = undefined,
  itemOnClick = undefined,
  useStateCategories,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredItems = items.filter((item: any) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const { categories, setCategories } = useStateCategories;

  // useEffect(() => {
  //   if(!Array.isArray(categories)) {
  //     return;
  //   }
  //   if(!Array.isArray(filteredItems)) {
  //     return;
  //   }
  //   console.log(categories, "categories");
  //   setFilteredCategories(filteredItems.map((item: any) => {
  //     const _item = {...i};
  //      = categories.find((category)=> _item.id == category.id);
  //     return {
  //         ..._category,

  //     };
  //   }));
  // }, [categories, filteredItems]);

  // useEffect(() => {
  //   console.log(items, "items");
  // }, [items]);

  return (
    <div style={containerStyle} className="w-full my-4 flex flex-col gap-4">
      <input
        className="w-full border border-gray-300 p-3 focus:outline-none focus:border-indigo-500 mb-2"
        style={inputSearchStyle}
        type="text"
        placeholder="Search item on name.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ItemsReadonly
        useStateCategories={{
          categories,
          setCategories,
        }}
        listProps={{
          style: listItemStyle,
        }}
        items={filteredItems}
        listOnClick={(item: any, event: any) => itemOnClick(item, event)}
      />
    </div>
  );
};

export default SearchItem;

function ItemsReadonly({
  items = [],
  listProps,
  disablePrice,
  disableRepresentative,
  listOnClick,
  useStateCategories,
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
  useStateCategories: {
    categories: CategoryProps[];
    setCategories: Dispatch<SetStateAction<CategoryProps[]>>;
  };
}) {
  function categoryManager() {
    return (
      <div className="flex flex-col gap-10">
        {isArrayNotEmpty(useStateCategories.categories) ? (
          useStateCategories.categories.map((category: any, index: any) => {
            const filteredItems = items.filter((item: ItemProps) => {
              return item.category_id == category.id;
            });

            if (!isArrayNotEmpty(filteredItems)) {
              return null;
            }

            return (
              <div className="flex flex-col gap-2" key={index + category.name}>
                <div className="border-b text-lg">{category.name}</div>
                {itemManagerInsideCategoryManager(filteredItems)}
              </div>
            );
          })
        ) : (
          <div className="text-center p-8 font-semibold text-gray-400 text-xl">
            No Items ...
          </div>
        )}
      </div>
    );
  }

  function itemManagerInsideCategoryManager(filteredItems: ItemProps[]) {
    return (
      <ol className="flex flex-col gap-4">
        {isArrayNotEmpty(filteredItems) ? (
          filteredItems.map((item: ItemProps, index: any) => (
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
                item={item}
                disableRepresentative={disableRepresentative}
              />
              <ItemName name={item.name} />
              <ItemPrice price={item.price} disablePrice={disablePrice} />
            </li>
          ))
        ) : (
          <div className="italic font-semibold text-gray-400">No Items..</div>
        )}
      </ol>
    );
  }

  return isArrayNotEmpty(items) ? (
    <>{categoryManager()}</>
  ) : (
    <div className="text-center p-8 font-semibold text-gray-400 text-xl">
      No Items ...
    </div>
  );
}
