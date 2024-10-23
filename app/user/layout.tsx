"use client";

import useStore from "@/hooks/zustand/useStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header1 from "../components/Headers/Header1";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const router = useRouter();

  const { clearOrderItems, getOrderItems } = useStore((state) => state);

  async function clearOrderFunc() {
    await clearOrderItems();
    toast(
      <div>
        <span style={{ margin: "0 .1rem" }}> </span> 🔑{" "}
        <span style={{ margin: "0 .2rem" }}> </span> Order Cleared
      </div>,
      {
        position: "top-center",
        duration: 1000,
      }
    );
    router.push("/user/sales");
  }

  return (
    <section style={{ padding: "20px" }}>
      <section
        style={{
          display: "flex",
          gap: "10px",
          margin: "1rem 0px",
        }}
      >
        <section
          style={{
            border: "1px solid black",
            padding: "16px",
          }}
        >
          <Header1> TOP MENU </Header1>
          <nav>
            <a href="/user/order"> ORDER {getOrderItems().length}</a>
            <br></br>
            <button
              style={{
                border: "1px solid red",
                padding: "0 6px",
                margin: "6px 0px",
              }}
              onClick={clearOrderFunc}
            >
              Clear Orders
            </button>
          </nav>
        </section>

        <section
          style={{
            border: "1px solid black",
            padding: "16px",
          }}
        >
          <Header1> SIDEBAR </Header1>
          <nav>
            <ul style={{ color: "blue" }}>
              <li>
                <Link href="/user/sales">sales</Link>
              </li>
              <li>
                <Link href="/user/items">items</Link>
              </li>
              <li>
                <Link href="/user/orders">orders</Link>
              </li>
            </ul>
          </nav>
        </section>
      </section>

      <hr />
      <br />

      <section>{children}</section>
      <section>{modal}</section>
    </section>
  );
}
