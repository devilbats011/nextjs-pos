/* eslint-disable @typescript-eslint/no-explicit-any */
import { BillProp } from "@/hooks/zustand/interface/item";
import React from "react";

const QuantityItem: React.FC<any> = ({
  disableAddRemoveButton = false,
  bill,
}: {
  disableAddRemoveButton?: boolean;
  bill: BillProp;
}) => {

  if (disableAddRemoveButton) {
    if (bill.item) {
      return (
        <div
          className="w-full"
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
        >
          {" "}
          RM {bill.item?.price} x{bill.item_quantity}{" "}
        </div>
      );
    }
    return null;
  }

  return (
    <div
      style={{
        display: "inline-block",
        margin: "0 .6rem",
        padding: "0rem 0.5rem",
        position: "relative",
        border: "1px solid black",
        textAlign: "center",
      }}
    >
      {/* {bill.item_quantity} */}

      {bill.item.quantity}

      {/* <input
        type="text"
        placeholder="0"
        defaultValue={item.quantity}
        style={{
          width: "100%",

          paddingLeft: ".4rem",
          borderRadius: "2px",
        }}
      /> */}
    </div>
  );
};
export default QuantityItem;
