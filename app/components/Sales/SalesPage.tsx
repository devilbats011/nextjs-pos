/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import Header1 from "@/app/components/Headers/Header1";
import SearchItem from "@/app/components/SearchItem/page";

import ToasterMessage from "@/app/components/ToasterMessage";
import { formatPrice, isArrayNotEmpty } from "@/hooks/helper/helper";
import { pathNameProps } from "@/hooks/helper/interface";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import { CategoryProps } from "@/hooks/zustand/interface/category";
import { ItemProps } from "@/hooks/zustand/interface/item";
import itemsUseStore from "@/hooks/zustand/itemsUseStore";
import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SalesPage() {
  const {
    setOrderItems,
    fetchItems,
    getOrderItems,
    getTotalOrderItemsPrice,
    getCategory,
    orderItems,
    items: useStoreItems,
  } = useStore((state) => state);
  const { toaster } = useSonnerToast();
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  function searchItemOnClick(item: any, event: any | undefined | null) {
    toaster(<ToasterMessage> Item Added </ToasterMessage>);

    console.log(item, event);
    setOrderItems(item);
  }

  useEffect(() => {
    (async () => {
      await fetchItems();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setCategories(await getCategory());
    })();
  }, [getCategory]);

  return (

      <section className="flex flex-col gap-4">
        <Breadcrumb crumbs={[{ name: "Sales", href: "#" }]} />
        <hr />
        <ButtonBig
        
        buttonProps={{onClick: () => {
          const pathName: pathNameProps = "/user/sales/order";
          router.push(pathName);
        },
      disabled: isArrayNotEmpty(getOrderItems()) ? false : true
      }}
        >
          <div className="flex flex-col text-base">
            <div>Charged</div>
            <div> {formatPrice(getTotalOrderItemsPrice())} </div>
          </div>
        </ButtonBig>

        <div className="flex flex-col gap-4">
        {itemsUseStore && itemsUseStore.length > 0 ? (
          <SearchItem items={useStoreItems} itemOnClick={searchItemOnClick} useStateCategories={{categories, setCategories}} />
        ) : (<>
            <Header1> Items </Header1>
            <div className="text-center text-gray-400 text-xl">No Items...</div>
        </>
        )}
        </div>

      </section>
  );
}
