"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import ItemList from "@/app/components/ItemList/ItemList";
import ToasterMessage from "@/app/components/ToasterMessage";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { setIsLoading } = useStore((state) => state);
  const { ...dataStore } = useStore((state) => state);
  const { toaster } = useSonnerToast();

  useEffect(() => {
    if (dataStore.isOrderItemsEmpty()) {
      router.back();
    }
  }, []);

  return (
    <>
      <Breadcrumb
        crumbs={[
          { name: "Sales", href: "/user/sales" },
          { name: "Order", href: "#" },
        ]}
      />
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem 0",
        }}
      >
        <ButtonBig
          buttonProps={{
            onClick: () => {
              dataStore.setIsLoading(true);
              router.push("/user/sales/order/charge_order");
            },
          }}
        >
          CHARGE
        </ButtonBig>
        <ButtonBig
          buttonProps={{
            onClick: () => {
              setIsLoading(true);
              async function execute() {
                const data = await dataStore.createOrder(
                  dataStore.groupedItemList()
                );
                // console.log(data, "ddd");
                if (!data) {
                  toaster(<ToasterMessage> Something Wrong </ToasterMessage>);
                  return;
                }
                toaster(<ToasterMessage> Order Created </ToasterMessage>);
                dataStore.clearOrderItems();

                router.push("/user/sales/order/split_order/"+ data.id);
              }
              execute();
            },
          }}
        >
          SPLIT ORDER
        </ButtonBig>
      </section>
      <ItemList
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        disableCheckbox
        // disableAddRemoveButton
      />
    </>
  );
}
