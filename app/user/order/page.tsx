"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ItemList from "@/app/components/ItemList/page";

export default function Page() {
  return (
    <>
      <h1>Page Order</h1>

      <Breadcrumb
        crumbs={[
          { name: "Sales", href: "/user/sales" },
          { name: "Order", href: "#" },
        ]}
      />
      <hr />
      <a href="#"> Charge Button </a>
      <hr />
      <a href="/user/split_order"> Split Order Button </a>
      <ItemList 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore 
        disableCheckbox
        disableAddRemoveButton
      />
    </>
  );
}
