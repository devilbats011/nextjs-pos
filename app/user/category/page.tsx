/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import Header1 from "@/app/components/Headers/Header1";
import ItemsReadonly from "@/app/components/ItemsReadonly/ItemsReadonly";
import ToasterMessage from "@/app/components/ToasterMessage";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import useStore from "@/hooks/zustand/useStore";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const { ...dataStore } = useStore((state) => state);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toaster } = useSonnerToast();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    dataStore.getCategory().then((data) => setCategory(data));
    const toast = searchParams.get("toast");
    if (toast) {
      toaster(<ToasterMessage> {toast} </ToasterMessage>);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [""]);

  return (
    <Suspense>
    <div className="flex flex-col gap-4">
      <Breadcrumb
        containerProps={{ className: "my-4" }}
        crumbs={[
          { name: "Items", href: "/user/items" },
          { name: "Category", href: "/user/category" },
        ]}
      />

      <div className="flex flex-col gap-4">
        <ButtonBig
          buttonProps={{
            onClick: async () => {
              router.push("/user/category/add");
            },
          }}
        >
          + Add Category
        </ButtonBig>

        <Header1> Category </Header1>
        <ItemsReadonly
          items={category}
          disablePrice
          disableRepresentative
          listOnClick={async (
            item: { id: string },
            event: React.MouseEvent<HTMLLIElement, MouseEvent>
          ) => {
            event.preventDefault();
            return router.push(`/user/category/edit/${item.id}`);
          }}
        />
      </div>
    </div>
    </Suspense>
  );
}
