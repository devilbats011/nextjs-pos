"use client";

import useStore from "@/hooks/zustand/useStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header1 from "../components/Headers/Header1";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Sidebar from "../components/Navigation/Sidebar/page";
import Topbar from "../components/Navigation/Topbar/page";

export default function Layout({ children }: { children: React.ReactNode }) {
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
          margin: "2rem 0px",
        }}
      >
        <Topbar
          clearOrderFunc={clearOrderFunc}
        />
        <Sidebar
        />
      </section>

      <section>{children}</section>
    </section>
  );
}
