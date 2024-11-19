/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import ButtonSmall from "@/app/components/Buttons/ButtonSmall";
import Dropdown from "@/app/components/Dropdown/Dropdown";
import useErrorHandler from "@/app/components/InputGroup/hooks/useErrorHandler";
import InputGroupText from "@/app/components/InputGroup/InputGroupText";
import DeleteModal from "@/app/components/modal/DeleteModal";
import SmallModal from "@/app/components/modal/SmallModal";
import ItemRepresentation from "@/app/components/resources/Item/ItemRepresentation/ItemRepresentation";
import ToasterMessage from "@/app/components/ToasterMessage";
import { getObjectFromArrayById } from "@/hooks/helper/helper";
import useItem from "@/hooks/item/useItem";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import { CategoryProps } from "@/hooks/zustand/interface/backend/category";
import { ItemProps } from "@/hooks/zustand/interface/item";
import useStore from "@/hooks/zustand/useStore";
import { useParams, useRouter } from "next/navigation";
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

  const {
    inputGroupError: categoryError,
    setInputGroupError: setCategoryError,
  } = useErrorHandler();

  const [modelDeleteIsHide, setDeleteModelIsHide] = useState(true);
  const [isEditLoading, setIsEditLoading ] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      dataStore.setIsLoading(true);
      if (typeof id != "string") return;
      const _item = await dataStore.getItemById(id);
      setItem(_item);
      setCategory(categories.find((cat) => cat.id == _item?.category_id));
      dataStore.setIsLoading(false);
    })();
  }, [categories]);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        crumbs={[
          { name: "Items", href: "/user/items" },
          { name: "Items List", href: "/user/items/list" },
          { name: "Edit Item", href: "#" },
        ]}
      />
      <form
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!category)
            return <ToasterMessage>Missing Category</ToasterMessage>;
          if (!item) return <ToasterMessage>Missing Item</ToasterMessage>;

          (async () => {
            if (!item.id) return <ToasterMessage>Missing Item</ToasterMessage>;
            if (!item.name || item.name == undefined) {
              return toaster(
                <ToasterMessage>Missing Item Name</ToasterMessage>
              );
            }
            if (!item.price) {
              return toaster(
                <ToasterMessage>Missing Item Price</ToasterMessage>
              );
            }
            // console.log(item,'?',radioValue);
            // return;
            setIsEditLoading(true);

            const isEdited = await dataStore.editItem(item.id, {
              name: item.name,
              price: item.price,
              quantity: 1,
              category_id: category.id,
              representation_color: radioValue == 'color' ? (item.representation_color ?? 'black') : null,
              representation_image: radioValue == 'image' ? (item.representation_image ?? null) : null,
            }, radioValue);

            setIsEditLoading(false);
            if (!isEdited) {
              return toaster(<ToasterMessage>Something Wrong</ToasterMessage>);
            }

            toaster(<ToasterMessage>Item Edited</ToasterMessage>);
            setTimeout(() => {
              router.push("/user/items/list");
            }, 600);
          })();
        }}
      >
        <InputGroupText
          inputProps={{
            required: true,
            placeholder: "Item Name",
            defaultValue: item ? item.name ?? "" : "",
            onChange: (e) => setItem({ ...item, name: e.target.value }),
          }}
        >
          Name
        </InputGroupText>

        <InputGroupText
          inputProps={{
            required: true,
            defaultValue: item ? item.price ?? "" : "",
            type: "number",
            placeholder: "Item Price (RM)",
            onChange: (e) => setItem({ ...item, price: e.target.value }),
          }}
        >
          Price
        </InputGroupText>

        {/* CATEGORY */}
        {category && item && (
          <Dropdown
            label="Category"
            defaultValue={category ? category.name : undefined}
            items={[
              {
                label: "+ Add Category",
                onClick: () => {
                  setIsHideModalCategory(false);
                },
              },
              ...categories.map((cat) => {
                return {
                  id: cat.id,
                  label: cat.name ?? "no name",
                  onClick: () => setCategory(cat),
                };
              }),
            ]}
          />
        )}
        <ItemRepresentation
          defaultColor={item?.representation_color}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          useStateRadioValue={{radioValue, setRadioValue}}
          useStateItem={{item,setItem}}
        />
        <ButtonBig
          buttonProps={{
            disabled: isEditLoading,
            type: "submit",
          }}
        >
          Edit Item
        </ButtonBig>
      </form>

      <ButtonBig
        color="warning"
        buttonProps={{
          type: "button",
          onClick: (e) => {
            e.preventDefault();
            setDeleteModelIsHide(false);
          },
        }}
      >
        Delete Item
      </ButtonBig>

      <DeleteModal
        useStateHide={{
          hide: modelDeleteIsHide,
          setHide: setDeleteModelIsHide,
        }}

        deleteButtonOnClick={async () => {
          (async () => {
            setDeleteModelIsHide(true);
            const isDelete = await dataStore.deleteItemById(
              typeof id == "string" ? id : ""
            );
            if (!isDelete) {
              toaster(<ToasterMessage> Something Wrong .. </ToasterMessage>);
              return;
            }
            toaster(<ToasterMessage> Item Deleted! </ToasterMessage>);
            setTimeout(() => {
              router.push("/user/items/list");
            }, 600);
          })();
        }}
        headerModalTitle="Delete Item"
      />

      <SmallModal
      modalWrapper={{
        height: '250px',
      }}
        useStateHide={{
          setHide: setIsHideModalCategory,
          hide: isHideModalCategory,
        }}
      >
        <form
          className="space-y-3"
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
            + Add Category
          </ButtonBig>
        </form>
      </SmallModal>
    </div>
  );
}
