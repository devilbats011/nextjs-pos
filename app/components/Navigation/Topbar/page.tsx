"use client";

import styles from "@/app/components/Topbar/Topbar.module.css";
import useStore from "@/hooks/zustand/useStore";
import { useEffect, useState } from "react";
import RightDivSales from "../../Topbar/RightDivSales";
import { usePathname, useSearchParams } from "next/navigation";
import LeftDivSales from "../../Topbar/LeftDivSales";
import { pathNameProps } from "@/hooks/helper/interface";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import ToasterMessage from "../../ToasterMessage";

export default function Topbar() {
  const { toggleSidebar } = useStore((state) => state);
  const pathName = usePathname() as pathNameProps;
  const searchParms = useSearchParams();
  const { toaster } = useSonnerToast();

  console.log(searchParms);

  useEffect(() => {
    if (searchParms && searchParms.get("message")) {
      toaster(<ToasterMessage> {searchParms.get("message")} </ToasterMessage>);
    }

    return () => {};
  }, [searchParms]);

  return (
    <nav className={styles.topMenu}>
      <div className="flex gap-4 justify-center items-center">
        <div className={styles.logo} onClick={toggleSidebar}>
          ☰
        </div>

        {(pathName === "/user/sales" || pathName === "/user/sales/order") && (
          <LeftDivSales />
        )}
      </div>
      <RightDivManager />
    </nav>
  );
}

function RightDivManager() {
  const pathName = usePathname() as pathNameProps;
  if (pathName === "/user/sales") {
    return <RightDivSales />;
  } else if (pathName === "/user/orders") {
    return null;
  } else if (pathName === "/user/items") {
    return null;
  }
  return null;
}

// <section
// style={{
//   border: "1px solid black",
//   padding: "16px",
// }}
// >
// <nav>
//   {/* <a href="/user/order"> ORDER {getOrderItems().length}</a> */}
//   <button
//     style={{
//       border: "1px solid red",
//       padding: "0 6px",
//       margin: "6px 0px",
//     }}
//     onClick={clearOrderFunc ? clearOrderFunc : () => null}
//   >
//     Clear Orders
//   </button>
// </nav>
// </section>
