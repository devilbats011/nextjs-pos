"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatPrice } from "@/hooks/helper/helper";
import React from "react";

const QuantityItem: React.FC<any> = ({ item, ...rest }) => {
  if (rest.disableAddRemoveButton) {


    return (


      <div
        style={{
          display: "block",
          width: "100%",
          padding: "0rem 0.5rem",
          position: "relative",
          textAlign: "center",
          minWidth: "200px",
        }}
        className=" font-light italic"
      >
        {formatPrice(item?.itemPrice)}

          <span className="text-sm " style={{padding: "0 4px"}}>x</span>
          <span className="text-lg">
          {item.quantity}
          </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "block",
        width: "60px",
        // minWidth: "60px",
        padding: "0rem 0.5rem",
        position: "relative",
        textAlign: "center",
      }}
      className=" font-light italic"
    >
      {item.quantity}
      {/* TODO: NEED TO FIX QUANTITY */}

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
