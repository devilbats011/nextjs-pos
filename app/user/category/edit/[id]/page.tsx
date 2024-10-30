"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import ButtonSmall from "@/app/components/Buttons/ButtonSmall";
import useErrorHandler from "@/app/components/InputGroup/hooks/useErrorHandler";
import InputGroupText from "@/app/components/InputGroup/InputGroupText";
import DeleteModal from "@/app/components/modal/DeleteModal";
import Modal from "@/app/components/modal/Modal";
import ToasterMessage from "@/app/components/ToasterMessage";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { ...dataStore } = useStore((state) => state);
  const { toaster } = useSonnerToast(500);
  const [data, setData] = useState({
    name: "",
  });

  const { inputGroupError , setInputGroupError } = useErrorHandler();

  const [modelDeleteIsHide, setDeleteModelIsHide] = useState(true);

  const router = useRouter();

  return (
    <div>
      <Breadcrumb
        containerProps={{ className: "my-4" }}
        crumbs={[
          { name: "Items", href: "/user/items" },
          { name: "Category", href: "/user/category" },
          { name: "Edit Category", href: "#" },
        ]}
      />

      <InputGroupText
        inputProps={{
          onChange: (e) => setData({ ...data, name: e.target.value }),
        }}
        id="name"
        errorMessage={inputGroupError}
      >
        Name
      </InputGroupText>

      <div className="flex flex-col gap-4">
        <ButtonBig
          color="warning"
          buttonProps={{
            onClick: async () => {
              setDeleteModelIsHide(false);
            },
          }}
        >
          Delete
        </ButtonBig>
        <ButtonBig
          buttonProps={{
            onClick: async () => {
              let errorMessage = "";
              if (!data || Object.keys(data).length === 0) {
                errorMessage = "Name is required";
              }
              if (!data.name) {
                errorMessage = "Name is required";
              }
              if (errorMessage) return setInputGroupError(errorMessage);

              // const isAdded = await dataStore.addCategory(data);
              // if (isAdded) {
              //   toaster(<ToasterMessage> Category Added </ToasterMessage>);
              // } else {
              //   toaster(<ToasterMessage> Something Wrong.. </ToasterMessage>);
              // }
              await new Promise((resolve) => setTimeout(resolve, 500));
              router.push("/user/category");
            },
          }}
        >
          Edit Category
        </ButtonBig>
      </div>
      <DeleteModal
        useStateHide={{
          hide: modelDeleteIsHide,
          setHide: setDeleteModelIsHide,
        }}
        deleteButtonOnClick={async () => {
          setDeleteModelIsHide(true);
          router.push("/user/category?toast=Category Deleted");
        }}
        headerModalTitle="Delete Category"
      />
    </div>
  );
}
