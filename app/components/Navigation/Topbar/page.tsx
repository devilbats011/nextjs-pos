import Link from "next/link";
import Header1 from "../../Headers/Header1";
import styles from "./Topbar.module.css";

import { Dispatch, SetStateAction } from "react";
import useStore from "@/hooks/zustand/useStore";

export default function Topbar({
  clearOrderFunc,
}: {
  clearOrderFunc?: any;
}) {
  const { toggleSidebar } = useStore((state) => state);
  // const { dataStore } = useStateDataTreeBranchLayout.dataTreeBranchLayout;
  return (
    <nav className={styles.topMenu}>
      <div className={styles.logo} onClick={toggleSidebar} >
        ☰
      </div>
    </nav>
  );
}

// <section
// style={{
//   border: "1px solid black",
//   padding: "16px",
// }}
// >
// <Header1> Top </Header1>
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
