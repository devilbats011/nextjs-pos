"use client";

import useStore from "@/hooks/zustand/useStore";

export default function LeftDivSales() {
  const { orderItems } = useStore((state) => state);
  return (
    <div className="flex justify-center items-center relative" style={{top:'2px'}}>
      <p>Order {orderItems?.length}</p>
    </div>
  );
}
