/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import Header1 from "@/app/components/Headers/Header1";
import SearchItem from "@/app/components/SearchItem";
import ToasterMessage from "@/app/components/ToasterMessage";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import useStore from "@/hooks/zustand/useStore";

export default function Page() {
  const { setOrderItems, items  } = useStore((state) => state);
  const { toaster } = useSonnerToast();
  function searchItemOnClick(item: any, event: any | undefined | null) {
    console.log(event, item);
    toaster(<ToasterMessage> Item Added </ToasterMessage>);
    setOrderItems(item);
  }

  return (
    <>
      <section style={{ border: "1px solid blue", padding: "16px" }}>
        <Breadcrumb crumbs={[{ name: "Sales", href: "#" }]} />
        <Header1>Page Sales</Header1>

        <SearchItem
          items={items}
          itemOnClick={searchItemOnClick}
          containerStyle={{ padding: "10px 0" }}
          inputSearchStyle={{ border: "1px solid blue", padding: "6px" }}
          listItemStyle={{ padding: "10px 0" }}
        />
      </section>
    </>
  );
}
