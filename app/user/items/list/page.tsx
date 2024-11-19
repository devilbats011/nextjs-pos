/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import ItemsReadonly from "@/app/components/ItemsReadonly/ItemsReadonly";
import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const dataStore = useStore((state) => state);

  const [items, setItems] = useState([])

  useEffect(() => {
    (async ()=>{
      const x = await dataStore.getItems();
      setItems(x);

    })()

  }, []);

  function pushToItemAddPage(item: any, event: any) {
    console.log(item, event);
    router.push(`/user/items/edit/${item.id}`);
  }

  return (
    <Suspense>
      <div className="flex flex-col gap-4">
        <Breadcrumb
          crumbs={[
            { name: "Items", href: "/user/items" },
            { name: "Items List", href: "#" },
          ]}
        />
        <ButtonBig
          buttonProps={{ onClick: () => router.push("/user/items/add") }}
        >
          + Add Item
        </ButtonBig>

        <ItemsReadonly items={items} listOnClick={pushToItemAddPage} />

        {false && <ButtonBig> Show More </ButtonBig>}

      </div>
    </Suspense>
  );
}
