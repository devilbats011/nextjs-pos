/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import { formatPrice } from "@/hooks/helper/helper";
import { BillProp, OrderProp } from "@/hooks/zustand/interface/item";

import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { ...dataStore } = useStore((state) => state);
  const router = useRouter();

  const [orders, setOrders] = useState<OrderProp[]>([]);

  useEffect(() => {
    (async () => {
      const x = await dataStore.getOrders();
      setOrders(x);
    })();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        crumbs={[
          {
            name: "Orders",
            href: "#",
          },
        ]}
      />
      {orders.map((order) => (
        <div className="w-full relative " key={order.id}>
          <ButtonBig color="secondary"
          buttonProps={{
            // disabled: true,
            onClick: () => {
              router.push(`/user/orders/order_detail/${order.id}`);
            },
          }}
          >
            <div
              className="flex w-full justify-between items-center  font-normal gap-2 "
              style={{ fontSize: "14px" }}
            >
              <StatusOrderManagerElement order={order} />
              <DateManagerElement order={order} />
              <GetTotalPrice bills={order.bills} />
            </div>
          </ButtonBig>
        </div>
      ))}

      {false && <ButtonBig>Show More</ButtonBig>}
    </div>
  );
}

function StatusOrderManagerElement({ order }: { order: OrderProp }) {
  const [color, setColor] = useState("#3F2F67");
  const [statusName, setStatusName] = useState("");

  useEffect(() => {
    switch (order.status) {
      case "fully_refund":
        setColor("#3F2F67");
        setStatusName("Refund");
        break;
    }

    return () => {};
  }, [order.status]);

  return (
    <div className="font-bold text-base md:text-lg flex flex-col justify-center items-center ">
      <div>#{order.short_id}</div>
      {!statusName || (
        <div className="" style={{ color }}>
          {statusName}
        </div>
      )}
    </div>
  );
}

function DateManagerElement({ order }: { order: OrderProp }) {
  const date = new Date(order.created_at);

  // Format as "Sat 19 Oct 2024"
  const formattedDate = date.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Format as "HH:MM:SS"
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="border-l border-gray-400 border-r px-4 font-normal flex flex-col justify-center items-center">
      <div>{formattedDate}</div>
      <div> {formattedTime} </div>
    </div>
  );
}

function GetTotalPrice({ bills }: { bills: BillProp[] }): JSX.Element {
  let total: number = 0;
  bills.reduce((acc: string | number, { item, ...bills }) => {
    total +=  (typeof item.price === "string" ? parseFloat(item.price) : item.price ) * bills.item_quantity;
    return total;
  }, 0);
  return <div className="font-bold text-sm md:text-lg">{formatPrice(total)} </div>;
}
