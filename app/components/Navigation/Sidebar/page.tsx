'use client';

import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css"; // Import the CSS Module
import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";
import Sales from "../../svg/Sales";
import Order from "../../svg/Order";
import Item from "../../svg/Item";
import LogoPos from "../../svg/LogoPos";
import { usePathname } from 'next/navigation'


interface itemSidebarProps {
  name: string;
  href: string;
  icon: React.ReactElement;
}

export default function Sidebar({ clearOrderFunc }: { clearOrderFunc?: any }) {
  const { toggleSidebar, sidebarIsOpen: isOpen } = useStore((state) => state);
  const router = useRouter();
  const pathSegments = usePathname();

  function sideBarButtonActiveManager(item: itemSidebarProps): string {
    const activeClass =
      styles.sidebarButton +
      " flex justify-center items-center gap-4 " +
      styles.sideBarButtonActive;
    const standardClass =
      styles.sidebarButton + " flex justify-center items-center gap-4 ";
    return pathSegments === item.href ? activeClass : standardClass;
  }

  function sidebarButtonIconActiveManager(
    item: itemSidebarProps
  ): React.ReactElement {
    const isButtonActive = pathSegments == item.href ? true : false;
    return React.cloneElement(item.icon, { isButtonActive });
  }

  return (
    <>
      <ul className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <li
          className="text-3xl text-white p-8 border-b-2 w-full text-center cursor-pointer mb-4"
          onClick={toggleSidebar}
          key={"0posLi"}
        >
          <div className="w-full">POS</div>
          <div className="text-sm w-full flex justify-center items-center gap-2">
            <span>Wan Afnan Hariz</span>
            <LogoPos />
          </div>
        </li>

        {[
          {
            name: "Sales",
            href: "/user/sales",
            icon: <Sales />,
          },
          {
            name: "Items",
            href: "/user/items",
            icon: <Item />,
          },
          {
            name: "Orders",
            href: "/user/orders",
            icon: <Order />,
          },
        ].map((item, index) => (
          <li
            key={index}
            className={sideBarButtonActiveManager(item)}
            style={{ border: "1px solid 0" }}
            onClick={() => {
              router.push(item.href);
              toggleSidebar();
            }}
          >
            <div className="mt-1">{sidebarButtonIconActiveManager(item)}</div>
            <div>{item.name}</div>
          </li>
        ))}
      </ul>

      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </>
  );
}
