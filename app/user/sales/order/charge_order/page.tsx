"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
// import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import useErrorHandler from "@/app/components/InputGroup/hooks/useErrorHandler";
import InputGroupText from "@/app/components/InputGroup/InputGroupText";
import ItemList from "@/app/components/ItemList/page";
import ToasterMessage from "@/app/components/ToasterMessage";
import { baseUrlOrders } from "@/hooks/helper/constant";
import { isArrayNotEmpty } from "@/hooks/helper/helper";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import Validator from "@/hooks/validator/Validator";
import { ItemProps } from "@/hooks/zustand/interface/item";
import useStore from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const { ...dataStore } = useStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const { inputGroupError, setInputGroupError } = useErrorHandler();
  const router = useRouter();

  const [inputText, setInputText] = useState<string>();
  const { toaster } = useSonnerToast();

  useEffect(() => {
    dataStore.setIsLoading(false);
  }, []);

  return (
    <div className="">
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/user/sales" },
          {
            name: "Order",
            href: "/user/sales/order",
          },
          { name: "Charge Order", href: "#" },
        ]}
      />
      <section
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        className="mt-4"
      >
        <input />
        <ItemList
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          disableCheckbox
          disableAddRemoveButton
          disableDeleteButton
        />
        <div className="flex flex-col gap-4">
          {/* <InputGroupText
            id="charge_order"
            errorMessage={inputGroupError}
            inputProps={{
              id: "charge_order",
              placeholder: "Email optional",
              onChange: (event) => {
                setInputText(event.target?.value);
              },
            }}
          >
            Send Email
          </InputGroupText> */}

          <ButtonBig
            buttonProps={{
              disabled: isLoading,
              onClick: () => {
                if (typeof inputText === "string" && !inputText) {
                  const validateGetErrors = new Validator()
                    .input(inputText)
                    .email()
                    .validateGetErrors();
                  if (
                    isArrayNotEmpty(validateGetErrors) &&
                    validateGetErrors[0].isValid === false
                  ) {
                    setInputGroupError(validateGetErrors[0].message);
                    return;
                  }
                }
                (async () => {
                  setIsLoading(true);
                  const data = await dataStore.createOrder(
                    dataStore.groupedItemList(),
                    "paid"
                  );
                  if (data) {
                    setTimeout(() => {
                      router.push("/user/sales");
                    }, 500);
                    dataStore.clearOrderItems();
                    toaster(
                      <ToasterMessage> Order Fully Paid </ToasterMessage>
                    );
                    return;
                  }
                  setIsLoading(false);
                  toaster(<ToasterMessage> Something Wrong </ToasterMessage>);
                })();
              },
            }}
          >
            New Sale
          </ButtonBig>
        </div>
      </section>
    </div>
  );
}
