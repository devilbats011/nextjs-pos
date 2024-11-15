/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import {
  formatPrice,
  isArrayEmpty,
} from "@/hooks/helper/helper";
import { BillProp, OrderProp } from "@/hooks/zustand/interface/item";

import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { ...dataStore } = useStore((state) => state);
  const router = useRouter();

  const [orders, setOrders] = useState<OrderProp[]>([]);
  const [areThereMoreData, setAreThereMoreData] = useState(true);

  const [chunksUrlParams, setChunksUrlParams] = useState<{
    chunks: number;
    number_of_item_per_chunk: number;
  }>({
    chunks: 1,
    number_of_item_per_chunk: 7,
  });

  // useEffect(() => {

  //   const chunks = parseIntOrNull(searchParams.get("chunks")) ?? 1;
  //   const number_of_item_per_chunk = parseIntOrNull(searchParams.get('number_of_item_per_chunk')) ?? 7;
  //   setChunksUrlParams((prev_value)=> {
  //     return {
  //       ...prev_value,
  //       chunks,
  //       number_of_item_per_chunk
  //     }
  //   });

  // }, [searchParams]);

  useEffect(() => {
    // if(chunksUrlParams.chunks == 0) {
    //   return;
    // }
    // dataStore.setOrdersCrumbs(
    //   "/user/orders?chunks=" +
    //     chunksUrlParams.chunks +
    //     "&number_of_item_per_chunk=" +
    //     chunksUrlParams.number_of_item_per_chunk
    // );

    (async () => {
      dataStore.setIsLoading(true);
      const orders = await dataStore.getOrdersByChunks(
        chunksUrlParams.chunks,
        chunksUrlParams.number_of_item_per_chunk
      );
      if (!orders) return;
      if (isArrayEmpty(orders)) {
        setAreThereMoreData(false);
      }
      setOrders((prevOrders) => {
        return [
          ...prevOrders,
          ...orders.filter(
            (order) =>
              !prevOrders.find((prevOrder) => prevOrder.id === order.id)
          ),
        ];
      });
      setTimeout(() => {
        dataStore.setIsLoading(false);
      }, 500);
    })();
  }, [chunksUrlParams]);

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
      {Array.isArray(orders) &&
        orders.map((order) => (
          <div className="w-full relative " key={order.id}>
            <ButtonBig
              color="secondary"
              buttonProps={{
                onClick: () => {
                  dataStore.setIsLoading(true);
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

      <ButtonBig
        buttonProps={{
          disabled: !areThereMoreData,
          onClick: () => {
            setChunksUrlParams((prev_value) => {
              return {
                ...prev_value,
                chunks: prev_value.chunks + 1,
              };
            });
          },
        }}
      >
        {areThereMoreData ? "Show More" : "No Data Left"}
      </ButtonBig>
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
    total +=
      (typeof item.price === "string" ? parseFloat(item.price) : item.price) *
      bills.item_quantity;
    return total;
  }, 0);
  return (
    <div className="font-bold text-sm md:text-lg">{formatPrice(total)} </div>
  );
}
