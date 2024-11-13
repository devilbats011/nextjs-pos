"use client";

import { isArrayNotEmpty } from "@/hooks/helper/helper";
import { pathNameProps } from "@/app/Interface/interface";
import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";

export default function LeftDivSales() {
  const { getOrderItems, } = useStore((state) => state);
  const router = useRouter();

  return (
    <div
      className="flex justify-center items-center relative"
      style={{ top: "2px" }}
    >
      <p
        className="cursor-pointer p-2"
        onClick={(e) => {
          e.preventDefault();
          if (!isArrayNotEmpty(getOrderItems())) return;
          const path: pathNameProps = "/user/sales/order";
          router.push(path);
        }}
      >
        Order {getOrderItems()?.length}
      </p>
    </div>
  );
}
