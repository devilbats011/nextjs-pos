import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./Sidebar.module.css"; // Import the CSS Module
import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";
import Sales from "../../svg/Sales";
import Order from "../../svg/Order";
import Item from "../../svg/Item";

export default function Sidebar({ clearOrderFunc }: { clearOrderFunc?: any }) {
  const { toggleSidebar, sidebarIsOpen: isOpen } = useStore((state) => state);
  const router = useRouter();

  return (
    <>
      {/* Sidebar */}
      <ul className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <li
          className="text-3xl text-white p-8 border-b-2 w-full text-center cursor-pointer mb-4"
          onClick={toggleSidebar}
          key={"0posLi"}
        >
          POS
        </li>
        
        {[
          {
            name: "Sales",
            href: "/user/sales",
            icon: <Sales/> 
          },
          {
            name: "Items",
            href: "/user/items",
            icon: <Item/> 
          },
          {
            name: "Orders",
            href: "/user/orders",
            icon: <Order/> 
          },
        ].map((item, index) => (
          <li
            key={index}
            className={styles.sidebarButton + " flex justify-center items-center gap-4"} 
            style={{ border: "1px solid 0" }}
            onClick={() => {
              router.push(item.href);
              toggleSidebar();
            }}
          >
            <div className="mt-1">
              {item.icon}
            </div>
            <div>
            {item.name}

            </div>
          </li>
        ))}
        {/* <li className={styles.sidebarButton}>
          <Link href="/user/sales">sales</Link>
        </li>
        <li className={styles.sidebarButton}>
          {" "}
          <Link href="/user/items">items</Link>
        </li> */}
        {/* <ul style={{ color: "blue" }}>
              <li>
            
              </li>
              <li>
              
              </li>
              <li>
      
              </li>
            </ul> */}
      </ul>

      {/* Overlay to close sidebar by clicking outside */}
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </>
  );
}
