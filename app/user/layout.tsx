"use client";

import useStore from "@/hooks/zustand/useStore";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const {  clearOrderItems : clearOrders, getOrderItems } = useStore((state) => state);

  return (
    <section style={{ padding: "20px" }}>
      <h1>TOP MENU </h1>
      <br />
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
      <br />
      <div>--------------</div>
      <h1>SIDEBAR</h1>
      <nav>
        <ul>
          <li>
            <a href="/user/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/user">User</a>
          </li>
        </ul>
      </nav>
      <div>--------------</div>
      <br />
      <section>{children}</section>
    </section>
  );
}
