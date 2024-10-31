"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import Header1 from "@/app/components/Headers/Header1";
import ItemList from "@/app/components/ItemList/page";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  // TODO: ADD MINUS/REMOVE item from OrderItems
  // TODO: CANTIKKAN user/sales/order interface...

  return (
    <>
      {/* <Header1>Page Order</Header1> */}
      <Breadcrumb
        crumbs={[
          { name: "Sales", href: "/user/sales" },
          { name: "Order", href: "#" },
        ]}
      />
      <section
        style={{ display: "flex", flexDirection: "column", gap: "1rem", padding:"1rem 0" }}
      >
        <ButtonBig
          buttonProps={{
            onClick: () => {
              router.push("/user/charge_order");
            },
          }}
        >
          CHARGE
        </ButtonBig>
        <ButtonBig
          buttonProps={{
            onClick: () => {
              router.push("/user/split_order");
            },
          }}
        >
          SPLIT ORDER
        </ButtonBig>
      </section>
      {/* <a href="/user/split_order">  Button </a> */}
      <ItemList
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        disableCheckbox
        disableAddRemoveButton
      />
    </>
  );
}
