"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ItemList from "@/app/components/ItemList/page";

export default function Page() {

  return (
    <>
      <h1>Page Split Order</h1>
      <Breadcrumb
        crumbs={[
          { name: "Sales", href: "/user/sales" },
          { name: "Order", href: "/user/order" },
          { name: "Split Order", href: "#" }, // /user/split_order
        ]}
      />
      <button style={{ border: "1px solid red", padding: "4px", margin: '12px 0' }}>
        Charged
      </button>
      <ItemList
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        disableDeleteButton
      />
    </>
  );
}
