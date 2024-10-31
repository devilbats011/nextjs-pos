"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";

import ItemList from "@/app/components/ItemList/page";
import { useRouter } from "next/navigation";

export default function Page() {

  const r = useRouter();

  return (
    <>
      <Breadcrumb
        crumbs={[
          { name: "Sales", href: "/user/sales" },
          { name: "Order", href: "/user/sales/order" },
          { name: "Split Order", href: "#" }, // /user/split_order
        ]}
      />

      <ButtonBig buttonProps={{ onClick: () => {r.push("/user/charge_order")}, style: { margin: "1rem 0" } }} >
        Charged
      </ButtonBig>

      <ItemList
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        disableDeleteButton
        disableTotalItems
      />
    </>
  );
}
