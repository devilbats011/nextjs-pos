"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import ItemsReadonly from "@/app/components/ItemsReadonly/page";
import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const dataStore = useStore((state) => state);

  function pushToItemAddPage(item: any, event: any) {
    console.log(item, event);
    router.push(`/user/item_add/${item.id}`);
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <Breadcrumb
          crumbs={[
            { name: "Items", href: "/user/items" },
            { name: "Items List", href: "#" },
          ]}
        />
        <ButtonBig
          buttonProps={{ onClick: () => router.push("/user/item_add") }}
        >
          + Add Item
        </ButtonBig>

        <ItemsReadonly items={dataStore.items} listOnClick={pushToItemAddPage} />

        {false && <ButtonBig> Show More </ButtonBig>}

      </div>
    </>
  );
}
