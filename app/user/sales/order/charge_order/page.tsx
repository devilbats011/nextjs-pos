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
import Validator from "@/hooks/validator/Validator";
import { ItemProps } from "@/hooks/zustand/interface/item";
import useStore from "@/hooks/zustand/useStore";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const { ...dataStore } = useStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const { inputGroupError, setInputGroupError } = useErrorHandler();

  // console.log(dataStore.getOrderItems(), "!");

  const [inputText, setInputText] = useState<string>();

  async function backendCreateOrderFullyPaid(OrderItems: ItemProps[]) {
    const formData = new FormData();

    setIsLoading(true);
    formData.append(
      "order",
      JSON.stringify({ status: "fully_paid", orderItems: [...OrderItems] })
    ); // sent to http api\order POST (backend) the backend will validate then create order|bill|item inside postgres db;
    formData.append("user_id", "16931212221212121212"); // send userr Id...in the future there will be login acc or use sanctum auth
    fetch(baseUrlOrders, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        const data = res.json();
        console.log(data);
        return Response.json(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="">
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/user/sales/order" },
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
        <div className="flex flex-col gap-4 px-4">
          <InputGroupText
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
          </InputGroupText>

          <ButtonBig
            buttonProps={{
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
                (async ()=> {
                  const data = await dataStore.createOrder(dataStore.groupedItemList(),'paid');
                  console.log(data,'CiiiO');
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
