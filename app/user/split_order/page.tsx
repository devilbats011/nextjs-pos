"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import useStore from "@/hooks/zustand/useStore";

export default function Page() {
  const { ...rest } = useStore((state) => state);

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
    </>
  );
}
