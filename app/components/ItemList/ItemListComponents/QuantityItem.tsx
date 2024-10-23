/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const QuantityItem: React.FC<any> = ({ item,...rest }) => {
  if(rest.disableAddRemoveButton) {
    return <span style={{marginLeft: "1rem", marginRight: "1rem"}}> RM {item?.itemPrice} x{item?.quantity} </span>;
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
      {item.quantity}
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
