"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import useStore from "@/hooks/zustand/useStore";

export default function Page() {
  const { getOrderItems: orderItems, deleteOrderItem, getTotalOrderItemsPrice } = useStore((state) => state);

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
      <hr />

      <ul>
        {orderItems().map((item: any, index: number | string) => (
          <li key={index}>
            {JSON.stringify(item)}
            <span style={{ margin: ".4rem" }}> </span>
            <button style={{ border: "1px solid red", padding: "4px" }} onClick={() => deleteOrderItem(item)}>
              Delete Button
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <div>Total Price: RM {getTotalOrderItemsPrice()}</div>
    </>
  );
}
