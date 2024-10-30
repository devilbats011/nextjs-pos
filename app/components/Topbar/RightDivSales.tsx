"use client";

import { useState } from "react";
import ThreeDot from "../svg/ThreeDot";
import styles from "./Topbar.module.css";
import useStore from "@/hooks/zustand/useStore";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import ToasterMessage from "../ToasterMessage";
// import useStore from "@/hooks/zustand/useStore";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import Header1 from "../components/Headers/Header1";
import { useRouter } from "next/navigation";

export default function RightDivSales() {
  const [isOpen, setIsOpen] = useState(false);
  const { clearOrderItems } = useStore((state) => state);
  const { toaster } = useSonnerToast();
  const router = useRouter();

  async function clearOrderHandler() {
    await clearOrderItems();
    toaster(<ToasterMessage>Order Cleared</ToasterMessage>);
    router.push("/user/sales");
  }

  return (
    <div className="relative top-0">
      <div
        className="relative cursor-pointer p-2"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <ThreeDot />
      </div>
      {isOpen ? (
        <ol
          className={
            styles.smallDropdown +
            " " +
            "absolute bg-white flex flex-col gap-1 justify-center items-center border hover:bg-gray-50 transition-colors cursor-pointer"
          }
        >
          <li className="border-t border-b w-full text-center p-2"
                 onClick={() => {
                  clearOrderHandler();
                  setIsOpen(!isOpen);
                }}
          
          >
            Clear Order
          </li>
        </ol>
      ) : (
        <ol></ol>
      )}
    </div>
  );
}
