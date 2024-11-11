/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useStore from "@/hooks/zustand/useStore";
import { useEffect, useState } from "react";
import ItemDeleteButton from "./ItemBillListComponents/ItemDeleteButton";
import ItemName from "./ItemBillListComponents/ItemName";
import ItemPrice from "./ItemBillListComponents/ItemPrice";
import TotalItems from "./ItemBillListComponents/TotalItems";
import QuantityItem from "./ItemBillListComponents/QuantityItem";
import { BillProp, OrderProp } from "@/hooks/zustand/interface/item";
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
  disableCheckbox?: boolean;
  disableAddRemoveButton?: boolean;
  disableDeleteButton?: boolean;
  disableTotalItems?: boolean;
}) => {
  const { ...dataStore } = useStore((state) => state);
  const [order, setOrder] = useState<OrderProp | undefined>();
  const [isHideRefund, setIsHideRefund] = useState(true);
  const [isHideEmail, setIsHideEmail] = useState(true);
  const { inputGroupError, setInputGroupError } = useErrorHandler();
  const [data, setData] = useState({
    email: "",
  });
  const [bill, setBill] = useState<BillProp>();

  const { toaster } = useSonnerToast();

  useEffect(() => {
    (async () => {
      const data = (await dataStore.getOrderById(rest.id)) as
        | OrderProp
        | undefined;
      setOrder(data);
    })();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <ol className="flex overflow-auto flex-col pt-4 gap-4">
        {order &&
          order.bills.map((_bill: BillProp, index: any) => {
            const { item } = _bill;
            return (
              <li key={index} className="flex flex-col gap-4 border-b py-4">
                <div className="flex justify-between items-center ">
                  <ItemName name={item.name} />
                  <QuantityItem bill={_bill} disableAddRemoveButton={true} />
                  <ItemPrice price={item.price} bill={_bill} />
                  <ItemDeleteButton disableDeleteButton={true} />
                  <BillStatus bill={_bill} />
                </div>
                <ButtonsModels setIsHideRefund={setIsHideRefund} bill={_bill} useStateBill={{ setBill , bill}} />
              </li>
            );
          })}
      </ol>
      <TotalPrice order={order} />
      <Models
        bill={bill}
        setIsHideRefund={setIsHideRefund}
        isHideRefund={isHideRefund}
        setIsHideEmail={setIsHideEmail}
        isHideEmail={isHideEmail}
        toaster={toaster}
        inputGroupError={inputGroupError}
        data={data}
        setData={setData}
        setInputGroupError={setInputGroupError}
      />
    </div>
  );
};

export default OrderList;

function BillStatus({ bill }: any) {
  return (
    <div className="w-full text-right">
      {/* status: */}
      <span className="uppercase px-2">{bill.status ?? "--"}</span>
    </div>
  );
}

function TotalPrice({ order }: { order: OrderProp | undefined }) {
  function getTotalPriceFromBills(bills: BillProp[]) {
    const arr = bills;
    let total = 0;
    if (arr) {
      total = arr.reduce(
        (total: any, { item, item_quantity }: BillProp) =>
          total + (parseFloat(item.price as string) ?? 0) * item_quantity,
        0
      );
      //decimal 2 point
      total = !total ? 0 : total;
      return total.toFixed(2);
    }
    return total.toFixed(2);
  }
  return (
    <div className="my-4 text-lg">
      {order ? (
        <TotalItems price={getTotalPriceFromBills(order.bills)} />
      ) : (
        "Total 0.00"
      )}
    </div>
  );
}

function ButtonsModels({ setIsHideRefund, bill, useStateBill }: any) {
  return (
    <div className="flex justify-end w-full gap-4 mt-4 mb-6">
      <ButtonSmall
        color="warning"
        customStylingWarning={{
          border: "1px solid #B00020",
          borderRadius: "2px",
        }}
        buttonProps={{
          onClick: () => {
            useStateBill.setBill(bill);
            setIsHideRefund(false);
          },
        }}
      >
        Refund
      </ButtonSmall>
      {/* <ButtonSmall
      buttonProps={{
      onClick: () => {
        setIsHideEmail(false);
      },
    }}
      >
      Send Email
    </ButtonSmall> */}
    </div>
  );
}

function Models({
  setIsHideRefund,
  isHideRefund,
  setIsHideEmail,
  isHideEmail,
  toaster,
  inputGroupError,
  data,
  setData,
  setInputGroupError,
  bill
}: {
  setIsHideRefund: any;
  isHideRefund: any;
  setIsHideEmail: any;
  isHideEmail: any;
  toaster: any;
  inputGroupError: any;
  data: any;
  setData: any;
  setInputGroupError: any;
  bill? : BillProp
}) {

  return (
    <>
      <SmallModal
        useStateHide={{ setHide: setIsHideRefund, hide: isHideRefund }}
        headerModalTitle={bill ? bill.item.name : ''}
        headerModalProps={{
          className: 'mt-4 px-3',
          style: {
            textAlign: 'start',
            fontSize: '18px',
            fontWeight: '500',
          }

        }}
        modalWrapper={{
          minHeight: "310px",
        }}
      >
        <div className="mt-2.5 flex flex-col gap-6 justify-center items-center w-full">
          <InputGroupText
            inputProps={{
              placeholder: "Enter Quantity",
              type: "number",
              defaultValue: bill ? bill.item_quantity : 0,
              max: bill ? bill.item_quantity : 1,
              min: 0,
            }}
          >
            Quantity
          </InputGroupText>
        </div>
        <div className="flex flex-col gap-6 justify-start ">
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
            errorProps={{ style: { fontSize: "14px" } }}
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
                if (!validate()) return;
                function clearDataAfterSend() {
                  setIsHideEmail(true);
                  setInputGroupError("");
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
    </>
  );
}
