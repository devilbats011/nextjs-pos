/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useStore from "@/hooks/zustand/useStore";
import { useEffect, useState } from "react";
import ItemAdd from "./ItemBillListComponents/ItemAddRemoveButton/ItemAdd";
import ItemRemove from "./ItemBillListComponents/ItemAddRemoveButton/ItemRemove";
import ItemCheckboxInput from "./ItemBillListComponents/ItemCheckboxInput";
import ItemDeleteButton from "./ItemBillListComponents/ItemDeleteButton";
import ItemName from "./ItemBillListComponents/ItemName";
import ItemPrice from "./ItemBillListComponents/ItemPrice";
import TotalItems from "./ItemBillListComponents/TotalItems";
import QuantityItem from "./ItemBillListComponents/QuantityItem";
import { BillProp, OrderProp } from "@/hooks/zustand/interface/order";
import ButtonSmall from "../Buttons/ButtonSmall";
import SmallModal from "../modal/SmallModal";
import InputGroupText from "../InputGroup/InputGroupText";

import ToasterMessage from "../ToasterMessage";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import useErrorHandler from "../InputGroup/hooks/useErrorHandler";

const OrderList: React.FC<any> = ({
  ...rest
}: {
  id: any;
  // disableCheckbox?: boolean;
  // disableAddRemoveButton?: boolean;
  // disableDeleteButton?: boolean;
  // disableTotalItems?: boolean;
}) => {
  const { ...dataStore } = useStore((state) => state);
  const [order, setOrder] = useState<OrderProp | undefined>();
  const [isHideRefund, setIsHideRefund] = useState(true);
  const [isHideEmail, setIsHideEmail] = useState(true);
  const { inputGroupError, setInputGroupError } = useErrorHandler();
  const [data, setData] = useState({
    email: "",
  });

  const { toaster } = useSonnerToast();

  function getTotalPriceFromBills(bills: BillProp[]) {
    const arr = bills;
    let total = 0;
    if (arr) {
      total = arr.reduce(
        (total: any, { item }: BillProp) => total + item.price * item.quantity,
        0
      );
      //decimal 2 point
      total = !total ? 0 : total;
      return total.toFixed(2);
    }
    return total.toFixed(2);
  }

  useEffect(() => {
    (async () => {
      const data = (await dataStore.fetchOrder(rest.id)) as
        | OrderProp
        | undefined;
      setOrder(data);
    })();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* {JSON.stringify(dataStore.groupedItemList())} */}
      <ol
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          paddingTop: "1rem",
        }}
      >
        {order &&
          order.bills.map(({ item, ...billProps }: BillProp, index: any) => {
            return (
              <li key={index}>
                <ItemCheckboxInput disableCheckbox={true} />
                <ItemRemove disableAddRemoveButton={true} />
                <ItemName name={item.name} />
                <ItemAdd disableAddRemoveButton={true} />
                <QuantityItem item={item} disableAddRemoveButton={true} />
                <ItemPrice price={item.price} />
                <ItemDeleteButton disableDeleteButton={true} />
              </li>
            );
          })}
      </ol>
      <hr />
      {order && <TotalItems price={getTotalPriceFromBills(order.bills)} />}

      <div className="flex justify-end w-full gap-4">
        <ButtonSmall
          color="warning"
          buttonProps={{
            onClick: () => {
              setIsHideRefund(false);
            },
          }}
        >
          Refund
        </ButtonSmall>
        <ButtonSmall
          buttonProps={{
            onClick: () => {
              setIsHideEmail(false);
            },
          }}
        >
          Send Email
        </ButtonSmall>
      </div>

      <SmallModal
        modalWrapper={{
          width: "260px",
          height: "190px",
        }}
        useStateHide={{ setHide: setIsHideRefund, hide: isHideRefund }}
        headerModalTitle={"Are you sure?"}
      >
        <div className="flex flex-col gap-6 justify-center items-center mt-8">
          {/* <h3 className="font-bold"></h3> */}
          <ButtonSmall
            color="warning"
            customStylingWarning={{ border: "1px solid #B00020" }}
            buttonProps={{
              onClick: () => {
                setIsHideRefund(true);
                toaster(<ToasterMessage> Refunded! </ToasterMessage>);
              },
            }}
          >
            Refund
          </ButtonSmall>
        </div>
      </SmallModal>

      <SmallModal
        modalWrapper={{
          width: "300px",
          height: "260px",
        }}
        useStateHide={{ setHide: setIsHideEmail, hide: isHideEmail }}
      >
        <div className="flex flex-col gap-6 justify-center items-center">
          <InputGroupText
            errorMessage={inputGroupError}
            inputProps={{
              value: data.email,
              onChange: (e) => setData({ ...data, email: e.target.value }),
              placeholder: "coco@cool.com",
            }}
            errorProps={{ style: { fontSize: "14px" }} }
          >
            Send Email
          </InputGroupText>

          <ButtonSmall
            buttonProps={{
              style: { width: "100%" },
              onClick: () => {
                function validate() {
                  let errorMessage = "";
                  if (!data || Object.keys(data).length === 0) {
                    errorMessage = "Name is required";
                  }
                  if (!data.email) {
                    errorMessage = "Name is required";
                  }
                  if (errorMessage) {
                    setInputGroupError(errorMessage);
                    return false;
                  }
                  return true;
                }
                if(!validate()) return;
                function clearDataAfterSend() {
                  setIsHideEmail(true);
                  setInputGroupError(null);
                  setData({ email: "" });
                }
                clearDataAfterSend();
                toaster(<ToasterMessage> Email Sent! </ToasterMessage>);
              },
            }}
          >
            Send Email
          </ButtonSmall>
        </div>
      </SmallModal>
    </div>
  );
};

export default OrderList;
