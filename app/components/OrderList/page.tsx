/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useStore from "@/hooks/zustand/useStore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import Validator from "@/hooks/validator/Validator";
import {
  fetchWithAuth,
  isArrayEmpty,
  isArrayNotEmpty,
  parseDate,
  parseIntOrNull,
} from "@/hooks/helper/helper";
import {
  baseUrlOrders,
  billStatus,
  billStatusColors,
} from "@/hooks/helper/constant";
import { BillRefundDetailProps } from "@/hooks/zustand/interface/backend/bill_refund_detail";
import Accordion from "../Accordion/page";
import Breadcrumb from "../Breadcrumb";
import { pathNameProps } from "@/app/Interface/interface";

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
  const [refreshOrderCount, setRefreshOrderCount] = useState(0);

  const [data, setData] = useState({
    email: "",
  });
  const [quantity, setQuantity] = useState(0);
  const [bill, setBill] = useState<BillProp>();

  const { ordersCrumbs } = useStore((state) => state);

  useEffect(() => {
    // dataStore.setIsLoading(false);
    (async () => {
      dataStore.setIsLoading(true);
      const data = (await dataStore.getOrderById(rest.id)) as
        | OrderProp
        | undefined;
      setOrder(data);
      setTimeout(() => {
        dataStore.setIsLoading(false);
      }, 400);
    })();
  }, [refreshOrderCount]);

  const { toaster } = useSonnerToast();

  function sortedBills() {
    if (!order) {
      return [];
    }
    const _sortedBills = order.bills.sort((a, b) => {
      const statusPriority = {
        paid: 1,
        mix: 2,
      };
      type Status = "paid" | "mix";
      const aPriority =
        statusPriority[a.status as Status] ||
        Object.values(statusPriority).reduce(
          (max, val) => Math.max(max, val),
          0
        ) + 1;
      const bPriority =
        statusPriority[b.status as Status] ||
        Object.values(statusPriority).reduce(
          (max, val) => Math.max(max, val),
          0
        ) + 1;
      return aPriority - bPriority;
    });
    return _sortedBills;
  }

  if (!order || order?.bills.length === 0) {
    return null;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Breadcrumb
        crumbs={[
          { name: "Orders", href: ordersCrumbs as pathNameProps },
          { name: "Order Detail", href: "#" },
        ]}
      />

      <ol className="flex overflow-auto flex-col pt-4 gap-4">
        {order &&
          sortedBills().map((_bill: BillProp, index: any) => {
            const { item, bill_refund_details } = _bill;
            return (
              <li key={index} className="flex flex-col gap-4 border-b py-4">
                <div className="flex justify-between items-center ">
                  <ItemName
                    className={"justify-start items-start px-2"}
                    name={item.name}
                    bill_refund_details={bill_refund_details}
                  />
                  <QuantityItem bill={_bill} disableAddRemoveButton={true} />
                  <ItemPrice price={item.price} bill={_bill} />
                  <ItemDeleteButton disableDeleteButton={true} />
                  {/* @ts-ignore */}
                  <BillStatus bill={_bill} />
                </div>
                <ButtonsModels
                  quantity={quantity}
                  setQuantity={setQuantity}
                  setIsHideRefund={setIsHideRefund}
                  bill={_bill}
                  useStateBill={{ setBill, bill }}
                />
              </li>
            );
          })}
      </ol>
      <TotalPrice order={order} />
      <Models
        setQuantity={setQuantity}
        quantity={quantity}
        bill={bill}
        setBill={setBill}
        setIsHideRefund={setIsHideRefund}
        isHideRefund={isHideRefund}
        setIsHideEmail={setIsHideEmail}
        isHideEmail={isHideEmail}
        toaster={toaster}
        inputGroupError={inputGroupError}
        data={data}
        setData={setData}
        setInputGroupError={setInputGroupError}
        setRefreshOrderCount={setRefreshOrderCount}
        // set_bill_refund_details={set_bill_refund_details}
        // bill_refund_details={bill_refund_details}
      />
    </div>
  );
};

export default OrderList;

function BillStatus({ bill }: { bill: Partial<{ status: billStatus }> }) {
  function textColorManager(): string {
    let classTextColor = "";
    if (!bill) return classTextColor;
    if (!bill.status || typeof bill.status != "string") {
      return classTextColor;
    }
    classTextColor = billStatusColors[bill.status];
    return " " + classTextColor;
  }

  return (
    <div className="w-full text-right">
      <span className={"uppercase px-2 font-semibold " + textColorManager()}>
        {bill.status ?? "--"}
      </span>
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
      ) : null}
    </div>
  );
}

function ButtonsModels({
  setIsHideRefund,
  bill,
  useStateBill,
  quantity,
  setQuantity,
}: {
  setIsHideRefund: any;
  bill: BillProp;
  useStateBill: any;
  quantity: any;
  setQuantity: any;
}) {
  const [isOpenRefundDetail, setIsOpenRefundDetail] = useState(false);

  const toggleAccordion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpenRefundDetail(!isOpenRefundDetail);
  };

  function buttonRefundManager() {
    if (bill.status == "" || bill.status == "mix" || bill.status == "unpaid")
      return false;

    if (
      isArrayNotEmpty(bill.bill_refund_details) &&
      bill.bill_refund_details?.reduce(
        (acc, refund) => acc + parseInt(refund.quantity),
        0
      ) == bill.item_quantity
    ) {
      return false;
    }

    return true;
  }

  return (
    <>
      <div className="flex justify-end w-full gap-4 mt-4">
        {isArrayNotEmpty(bill.bill_refund_details) && (
          <ButtonSmall
            color="primary"
            buttonProps={{
              type: "button",
              onClick: toggleAccordion,
            }}
          >
            <div className="flex flex-row gap-2">
              <div>Refund Detail</div>
              <div
                className={`relative transform transition-transform ${
                  isOpenRefundDetail ? "rotate-180" : ""
                }`}
              >
                ▼
              </div>
            </div>
          </ButtonSmall>
        )}
        {buttonRefundManager() ? (
          <ButtonSmall
            color="warning"
            customStylingWarning={{
              border: "1px solid #B00020",
              borderRadius: "2px",
            }}
            buttonProps={{
              onClick: () => {
                setQuantity(bill.item_quantity);
                useStateBill.setBill(bill);
                setIsHideRefund(false);
              },
            }}
          >
            Refund
          </ButtonSmall>
        ) : null}
      </div>

      {isArrayNotEmpty(bill.bill_refund_details) && (
        <div className="mb-6">
          <Accordion
            isOpen={isOpenRefundDetail}
            setIsOpen={setIsOpenRefundDetail}
            title="Refund Detail"
          >
            {isArrayNotEmpty(bill.bill_refund_details) &&
              bill.bill_refund_details?.map((refund, index) => {
                return (
                  <div className="w-full flex gap-4" key={index}>
                    <div className="">
                    # {index + 1}
                    </div>
                    <div className="w-max flex gap-1 flex-col">
                      <p>
                      {bill.item.name} x {refund.quantity}
                      </p>
                    <div className="text-gray-500 italic text-sm space-x-2">
                      <span>{parseDate(refund.created_at, "date")},</span>
                      <span>{parseDate(refund.created_at, "time")}</span>
                    </div>
                    </div>
                  </div>
                );
              })}
          </Accordion>
        </div>
      )}
    </>
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
  quantity,
  setQuantity,
  setBill,
  bill,
  setRefreshOrderCount,
}: // bill_refund_details,
// set_bill_refund_details,
{
  quantity: any;
  setQuantity: any;
  setIsHideRefund: any;
  isHideRefund: any;
  setIsHideEmail: any;
  isHideEmail: any;
  toaster: any;
  inputGroupError: any;
  data: any;
  setData: any;
  setBill: any;
  setInputGroupError: any;
  bill?: BillProp;
  setRefreshOrderCount: any;
  // bill_refund_details?: BillRefundDetailProps[];
  // set_bill_refund_details: any;
}) {
  const {
    inputGroupError: quantityError,
    setInputGroupError: setQuantityError,
  } = useErrorHandler();

  function _setIsHideRefund(value: boolean) {
    setIsHideRefund(value);
    setQuantityError("");
  }

  const [isLoading, setIsLoading] = useState(false);

  const { ...dataStore } = useStore((state) => state);

  function getQuantityRefunded(bill: BillProp) {
    if (isArrayEmpty(bill.bill_refund_details)) {
      return 0;
    }
    const quantity = bill.bill_refund_details?.reduce((acc, refund) => {
      if (!refund.quantity) return acc + 0;
      const _quantity = parseIntOrNull(refund.quantity) ?? 0;
      return acc + _quantity;
    }, 0);
    return quantity;
  }

  function maxQuantityManager(bill: BillProp) {
    if (!bill) {
      return 0;
    }
    // @ts-ignore
    const resultQuantity = bill.item_quantity - getQuantityRefunded(bill);
    if (resultQuantity <= 0) {
      return 0;
    }
    return resultQuantity;
  }

  return (
    <>
      <SmallModal
        useStateHide={{ setHide: _setIsHideRefund, hide: isHideRefund }}
        headerModalTitle={bill ? bill.item.name : ""}
        headerModalProps={{
          className: "mt-4 px-3",
          style: {
            textAlign: "start",
            fontSize: "18px",
            fontWeight: "500",
          },
        }}
        modalWrapper={{
          minHeight: "320px",
        }}
      >
        <div className="mt-2.5 flex flex-col gap-6 justify-center items-center w-full">
          <InputGroupText
            errorMessage={quantityError}
            inputProps={{
              onChange: (e) => setQuantity(parseInt(e.target.value)),
              placeholder: "Enter Quantity",
              type: "number",
              defaultValue: bill ? maxQuantityManager(bill) : 0,
              max: bill ? maxQuantityManager(bill) : 1,
              min: 1,
            }}
          >
            Quantity
          </InputGroupText>
        </div>
        <div className="flex flex-col gap-6 justify-start mt-2">
          <ButtonSmall
            color="warning"
            customStylingWarning={{ border: "1px solid #B00020" }}
            buttonProps={{
              disabled: isLoading,
              onClick: () => {
                if (!bill) return;
                const validateGetErrors = new Validator()
                  .input(quantity)
                  .required()
                  .number()
                  .max(bill ? maxQuantityManager(bill) : 0)
                  .min(1)
                  .validateGetErrors();

                if (
                  isArrayNotEmpty(validateGetErrors) &&
                  validateGetErrors[0].isValid === false
                ) {
                  return setQuantityError(validateGetErrors[0].message);
                }
                (async () => {
                  setIsLoading(true);
                  const billResponse = await dataStore.refundBill(
                    bill,
                    quantity
                  );

                  setIsLoading(false);
                  if (!billResponse) {
                    return toaster(
                      <ToasterMessage> Something Wrong </ToasterMessage>
                    );
                  }
                  setRefreshOrderCount((prev_value: number) => prev_value + 1);

                  // set_bill_refund_details(billResponse.bill_refund_details);
                  setBill(billResponse.bill);
                  toaster(<ToasterMessage> Refunded! </ToasterMessage>);
                  setIsHideRefund(true);
                  setQuantityError("");
                  setQuantity(0);
                })();
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
