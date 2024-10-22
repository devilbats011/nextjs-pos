/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ItemDeleteButton: React.FC<any> = ({ ...rest }) => {

  if(rest.disableDeleteButton) {
    return null;
  }

  return (
    <button
    style={{ border: "1px solid red", padding: "4px" }}
    onClick={() => {
      return null;
      //   rest.deleteOrderItem(item)
    }}
  >
    Delete
  </button>
  );
};
export default ItemDeleteButton;
