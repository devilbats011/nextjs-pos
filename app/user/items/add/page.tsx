"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import Dropdown from "@/app/components/Dropdown/page";
import InputGroupText from "@/app/components/InputGroup/InputGroupText";
import useStore from "@/hooks/zustand/useStore";
import { useEffect, useState } from "react";

export default function Page() {
  const { ...dataStore } = useStore((state) => state);

  const [items, setItems] = useState([]);

  useEffect(() => {
    dataStore.getItems().then((data: any) => setItems(data));
  }, []);

  return (
    <>
      <Breadcrumb
        crumbs={[
          { name: "Items", href: "/user/items" },
          { name: "Items List", href: "/user/items/list" },
          { name: "Add Item", href: "#" },
        ]}
      />
      <InputGroupText>Name</InputGroupText>
      <Dropdown
        label="Category"
        items={[
          {
            label: "+ Add Category",
            value: "1",
            onClick: () => {
              console.log("opt1");
            },
          },
        ]}
      />
      <InputGroupText>Price</InputGroupText>
      <p
        className="font-bold text-base md:text-xl"
        style={{ color: "#3F2F67" }}
      >
        Representation on Item
      </p>
      ---
      <br />
      <br />
      <div className="flex flex-col gap-4">
        <pre>{JSON.stringify(items, null, 2)}</pre>
        {/* 
        <ButtonBig buttonProps={{ onClick: () => {
          dataStore.fetchItems();
        } }}> fecth EG </ButtonBig> */}

        {/* Add Item Button */}
        <ButtonBig
          buttonProps={{
            onClick: async () => {
              await dataStore.addItem({
                name: "New Item",
                quantity: 1,
                price: 15,
              });
            },
          }}
        >
          + Add Item
        </ButtonBig>

        {/* Edit Item Button */}
        <ButtonBig
          color="secondary"
          buttonProps={{
            onClick: async () => {
              await dataStore.editItem(1, {
                name: "Updated Shawarma",
              });
            },
          }}
        >
          Edit Item
        </ButtonBig>

        {/* Delete Item Button */}
        <ButtonBig
          color="warning"
          buttonProps={{
            onClick: async () => {
              await dataStore.deleteItem(2);
            },
          }}
        >
          Delete Item
        </ButtonBig>
      </div>
    </>
  );
}
