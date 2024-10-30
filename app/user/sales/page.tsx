/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import Header1 from "@/app/components/Headers/Header1";
import SearchItem from "@/app/components/SearchItem/page";

import ToasterMessage from "@/app/components/ToasterMessage";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import { ItemProps } from "@/hooks/zustand/interface/item";
import itemsUseStore from "@/hooks/zustand/itemsUseStore";
import useStore from "@/hooks/zustand/useStore";
import { useEffect, useState } from "react";

export default function Page() {
  const {
    setOrderItems,
    // getItems,
    fetchItems,
    getOrderItems,
    items: useStoreItems,
  } = useStore((state) => state);
  const { toaster } = useSonnerToast();
  // const [items, setItems] = useState<undefined | ItemProps[]>();

  function searchItemOnClick(item: any, event: any | undefined | null) {
    toaster(<ToasterMessage> Item Added </ToasterMessage>);

    console.log(item, event);
    setOrderItems(item);
  }

  useEffect(() => {
    (async () => {
      // await getItems().then((data: ItemProps[]) => {
      //   setItems(data);
      // });
      await fetchItems();
    })();
  }, []);

  useEffect(() => {
    console.log(getOrderItems(), "gg");
  }, [getOrderItems]);

  return (
    <>
      {/* <code> */}
      {/* {JSON.stringify(getOrderItems(),null,2)} */}
      {/* </code> */}
      <section className="flex flex-col gap-4">
        <Breadcrumb crumbs={[{ name: "Sales", href: "#" }]} />
        <hr />

        <ButtonBig>
          <div className="flex flex-col text-base">
            <div>Charged</div>
            <div>RM 0</div>
          </div>
        </ButtonBig>
        {/* {items ? ( */}
        {itemsUseStore && itemsUseStore.length > 0 ? (
          <SearchItem items={useStoreItems} itemOnClick={searchItemOnClick} />
        ) : (
          <div className="my-4">
            <Header1> Items </Header1>
            <div className="text-center text-gray-400 text-xl">No Items...</div>
          </div>
        )}
      </section>
    </>
  );
}
