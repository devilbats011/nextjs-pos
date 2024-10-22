"use client";

import useStore from "@/hooks/zustand/useStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Layout({
  children,
  modal,
}:
{
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const { clearOrderItems: clearOrders, getOrderItems } = useStore(
    (state) => state
  );

  return (
    <section style={{ padding: "20px" }}>



      <div>--------------</div>
      <h1>TOP MENU </h1>
      <nav>
        <a href="/user/order"> ORDER {getOrderItems().length}</a>
        <br></br>
        <button
          style={{
            border: "1px solid red",
            padding: "0 6px",
            margin: "6px 0px",
          }}
          onClick={clearOrders}
        >
          Clear Orders
        </button>
      </nav>
      <div>--------------</div>
      <br />
      <div>--------------</div>
      <h1>SIDEBAR</h1>
      <nav>
        <ul>
          <li>
            <Link href="/user/sales">sales</Link>
          </li>
          <li>
            <Link href="/user/items">Items</Link>
          </li>
          <li>
            <Link href="/user/orders">Orders</Link>
          </li>
          <li>
            <Link href="/user/examplee">eg1</Link>
          </li>
   
        </ul>
      </nav>
      <div>--------------</div>
      <br />
      <section>{children}</section>
      <section>{modal}</section>
    </section>
  );
}
