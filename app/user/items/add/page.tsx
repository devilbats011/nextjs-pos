/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import ButtonSmall from "@/app/components/Buttons/ButtonSmall";
import Dropdown from "@/app/components/Dropdown/Dropdown";
import useErrorHandler from "@/app/components/InputGroup/hooks/useErrorHandler";
import InputGroupText from "@/app/components/InputGroup/InputGroupText";
import SmallModal from "@/app/components/modal/SmallModal";
import ItemRepresentation from "@/app/components/resources/Item/ItemRepresentation/ItemRepresentation";
import ToasterMessage from "@/app/components/ToasterMessage";
import useItem from "@/hooks/item/useItem";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import { CategoryProps } from "@/hooks/zustand/interface/backend/category";
import { ItemProps } from "@/hooks/zustand/interface/item";
import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { ...dataStore } = useStore((state) => state);
  const {
    isHideModalCategory,
    setIsHideModalCategory,
    useEffectCount,
    setUseEffectCount,
    categories,
    setCategories,
    newCategory,
    setNewCategory,
    category,
    setCategory,
    item,
    setItem,
    selectedColor,
    setSelectedColor,
    radioValue,
    setRadioValue
  } = useItem();
  const { toaster } = useSonnerToast();
  const router = useRouter();

  const [isAddedLoading, setIsAddedLoading ] = useState(false);



  const {
    inputGroupError: categoryError,
    setInputGroupError: setCategoryError,
  } = useErrorHandler();

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!category) return <ToasterMessage>Missing Category</ToasterMessage>;
        if (!item) return <ToasterMessage>Missing Item</ToasterMessage>;
        (async () => {
          if (!item.name || item.name == undefined) {
            return toaster(<ToasterMessage>Missing Item Name</ToasterMessage>);
          }
          if (!item.price) {
            return toaster(<ToasterMessage>Missing Item Price</ToasterMessage>);
          }
          setIsAddedLoading(true);
          const isAdded = await dataStore.addItem({
            name: item.name,
            price: item.price,
            quantity: 1,
            category_id: category.id,
            representation_color: radioValue == 'color' ? (item.representation_color ?? 'black') : null,
            representation_image: radioValue == 'image' ? (item.representation_image ?? null) : null,
          }, radioValue);

          setIsAddedLoading(false);

          if (!isAdded) {
            return toaster(<ToasterMessage>Something Wrong</ToasterMessage>);
          }

          toaster(<ToasterMessage>Item Added</ToasterMessage>);
          setTimeout(() => {
            router.push("/user/items/list");
          }, 600);
        })();
      }}
    >
      <Breadcrumb
        crumbs={[
          { name: "Items", href: "/user/items" },
          { name: "Items List", href: "/user/items/list" },
          { name: "Add Item", href: "#" },
        ]}
      />
      <InputGroupText
        inputProps={{
          required: true,
          placeholder: "Item Name",
          onChange: (e) => setItem({ ...item, name: e.target.value }),
        }}
      >
        Name
      </InputGroupText>

      <InputGroupText
        inputProps={{
          required: true,
          type: "number",
          placeholder: "Item Price (RM)",
          onChange: (e) => setItem({ ...item, price: e.target.value }),
        }}
      >
        Price
      </InputGroupText>

      {/* CATEGORY */}
      <Dropdown
        label="Category"
        items={[
          ...categories.map((cat) => {
            return {
              label: cat.name ?? "no name",
              onClick: () => setCategory(cat),
            };
          }),
          {
            label: "+ Add Category",
            onClick: () => {
              setIsHideModalCategory(false);
            },
          },
        ]}
      />
      <div className="py-4">
        <ItemRepresentation 
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          useStateRadioValue={{radioValue, setRadioValue}}
          useStateItem={{item,setItem}}
        />
      </div>

      

      <div className="flex flex-col gap-4">
        <ButtonBig
          buttonProps={{
            disabled: isAddedLoading,
            type: "submit",
          }}
        >
          + Add Item

        </ButtonBig>
      </div>
        <SmallModal
          useStateHide={{
            setHide: setIsHideModalCategory,
            hide: isHideModalCategory,
          }}
        >
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!newCategory)
                return <ToasterMessage>Missing Category</ToasterMessage>;
              if (!newCategory.name)
                return setCategoryError("Category name is required");
              (async () => {
                const isAdded = await dataStore.addCategory(newCategory);
                if (!isAdded) {
                  return toaster(
                    <ToasterMessage>Something Wrong</ToasterMessage>
                  );
                }
                setUseEffectCount(useEffectCount + 1);
                toaster(<ToasterMessage>Category Added</ToasterMessage>);
                setIsHideModalCategory(true);
              })();
            }}
          >
            <InputGroupText
              errorMessage={categoryError}
              inputProps={{
                required: true,
                placeholder: "Category Name",
                onChange: (e) => {
                  setNewCategory({ name: e.target.value } as any);
                },
              }}
            >
              Name
            </InputGroupText>
            <ButtonBig
              buttonProps={{
        
                style: { padding: ".5rem 0", fontSize: "1rem" },
              }}
            >
              + Add category
            </ButtonBig>
          </form>
        </SmallModal>
    </form>
  );
}
