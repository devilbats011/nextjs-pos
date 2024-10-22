"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import SearchItem from "@/app/components/SearchItem";
import useStore from "@/hooks/zustand/useStore";
import { useEffect } from "react";

export default function Page() {
  const { setOrderItems, items  } = useStore((state) => state);

  //   useEffect(() => {
  //     console.log(items, "ii");
  //     console.log(orderItems, "ii2");
  //   }, [orderItems, ""]);

  function searchItemOnClick(item: any, event: any | undefined | null) {
    console.log(event, item);
    setOrderItems(item);
  }

  return (
    <>
      <section style={{ border: "1px solid blue", padding: "16px" }}>
        <Breadcrumb crumbs={[{ name: "Sales", href: "#" }]} />
        <h1>Page Sales</h1>

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
