"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import Dropdown from "@/app/components/Dropdown/page";
import InputGroupText from "@/app/components/InputGroup/InputGroupText";
import Modal from "@/app/components/modal/Modal";
import ItemRepresentaion from "@/app/components/resources/Item/ItemRepresentaion/page";
import useStore from "@/hooks/zustand/useStore";
import { useEffect, useState } from "react";

export default function Page() {
  const { ...dataStore } = useStore((state) => state);

  // const [items, setItems] = useState([]);

  const [isHideModalCategory, setIsHideModalCategory] = useState(true);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // dataStore.getItems().then((data: any) => setItems(data));
    dataStore.getCategory().then((data: any) => {
      console.log(data);
      setCategories(
        data.map((category: any) => {
          return { label: category.name, onClick: ()=> console.log(category.id,'cc-id') };
        })
      )
    }
    );

  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        crumbs={[
          { name: "Items", href: "/user/items" },
          { name: "Items List", href: "/user/items/list" },
          { name: "Edit Item", href: "#" },
        ]}
      />
      <InputGroupText>Name</InputGroupText>
      <Dropdown
        label="Category"
        items={[
          ...categories,
          {
    
            label: "+ Add Category",
            onClick: () => {
              setIsHideModalCategory(false);
            },
          },
        ]}
      />
      <InputGroupText>Price</InputGroupText>
      <ItemRepresentaion />

      <div className="flex flex-col gap-4">
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
      <Modal
        useStateHide={{
          setHide: setIsHideModalCategory,
          hide: isHideModalCategory,
        }}
        headerModalTitle="Add Category"
        modalWrapper={{
          width: "300px",
          height: "200px",
        }}
      >
     <InputGroupText>Category</InputGroupText>
      </Modal>
    </div>
  );
}
