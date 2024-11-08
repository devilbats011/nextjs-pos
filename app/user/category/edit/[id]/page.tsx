/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import useErrorHandler from "@/app/components/InputGroup/hooks/useErrorHandler";
import InputGroupText from "@/app/components/InputGroup/InputGroupText";
import DeleteModal from "@/app/components/modal/DeleteModal";
import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ToasterMessage from "@/app/components/ToasterMessage";

import { useSonnerToast } from "@/hooks/useSonnerToast";

export default function Page() {
  const { id } = useParams();

  const { ...dataStore } = useStore((state) => state);
  const { toaster } = useSonnerToast();
  const [pageState, setPageState] = useState({
    state: "Loading...",
    isHide: true,
  });

  const [data, setData] = useState({
    name: "",
  });

  useEffect(() => {
    async function initGetCategoryById() {
      const category = await dataStore.getCategoryById(
        typeof id == "string" ? id : ""
      );

      if (category) {
        setPageState({
          state: "Loaded",
          isHide: false,
        });
      } else {
        setPageState({
          state: "No Category Found",
          isHide: true,
        });
      }

      setData((_data) => {
        return {
          ..._data,
          name: category ? category.name : "",
        };
      });
    }
    initGetCategoryById();
  }, []);

  const { inputGroupError, setInputGroupError } = useErrorHandler();

  const [modelDeleteIsHide, setDeleteModelIsHide] = useState(true);

  const router = useRouter();

  return (
    <main className="flex flex-col gap-4">
      <Breadcrumb
        containerProps={{ className: "my-4" }}
        crumbs={[
          { name: "Items", href: "/user/items" },
          { name: "Category", href: "/user/category" },
          { name: "Edit Category", href: "#" },
        ]}
      />

      {pageState.isHide ? (
        <div className="flex  w-full text-gray-400 text-xl justify-center items-center mt-20">
          {pageState.state}
        </div>
      ) : (
        <>
          <InputGroupText
            inputProps={{
              defaultValue: data.name,
              onChange: (e) => setData({ ...data, name: e.target.value }),
            }}
            id="name"
            errorMessage={inputGroupError}
          >
            Name
          </InputGroupText>

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

                if (typeof id == "string") {
                  dataStore.editCategoryById(id, { name: data.name });
                  toaster(<ToasterMessage> Category Updated! </ToasterMessage>);
                } else {
                  toaster(<ToasterMessage> Something Wrong.. </ToasterMessage>);
                }

                // await new Promise((resolve) => setTimeout(resolve, 500));
                // router.push("/user/category");
              },
            }}
          >
            Edit
          </ButtonBig>

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
        </>
      )}

      <DeleteModal
        useStateHide={{
          hide: modelDeleteIsHide,
          setHide: setDeleteModelIsHide,
        }}
        deleteButtonOnClick={async () => {
          (async () => {
            setDeleteModelIsHide(true);
            const isDelete = await dataStore.deleteCategoryById(typeof id == 'string' ? id : '' );
            if (!isDelete) {
              // if the category have items children then it can't be deleted
              toaster(<ToasterMessage> Something Wrong .. </ToasterMessage>);
              return;
            }
            router.push("/user/category?toast=Category Deleted");
          })();
        }}
        headerModalTitle="Delete Category"
      />
    </main>
  );
}
