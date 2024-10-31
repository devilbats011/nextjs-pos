"use client";

import { pathNameProps } from "@/hooks/helper/interface";
import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";

export default function LeftDivSales() {
  const { orderItems, getOrderItems } = useStore((state) => state);
  const router = useRouter();
  
  return (
    <div className="flex justify-center items-center relative" style={{top:'2px'}}>
      <p className="cursor-pointer p-2"
      onClick={() => {
        const path: pathNameProps = "/user/sales/order" ; 
        router.push(path);
      }}
      >Order {getOrderItems()?.length}</p>
    </div>
  );
}
