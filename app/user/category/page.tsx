"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import ItemsReadonly from "@/app/components/ItemsReadonly/page";
import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { ...dataStore } = useStore((state) => state);
  const router = useRouter();

  const [category, setCategory] = useState([]);

  useEffect(() => {
    dataStore.getCategory().then((data: any) => setCategory(data));
  }, []);

  return (
    <>
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

        <ItemsReadonly items={category} disablePrice disableRepresentative />
        {/* <ButtonBig
          color="secondary"
          buttonProps={{
            onClick: async () => {
              router.refresh();
            },
          }}
        >
          refresh
        </ButtonBig> */}
      </div>
    </>
  );
}
