/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Trash from "../../svg/Trash";

const ItemDeleteButton: React.FC<any> = ({ ...rest }) => {

  if(rest.disableDeleteButton) {
    return null;
  }

  return (
    <button
    className="mr-4"
    onClick={() => {
      return null;
      //   rest.deleteOrderItem(item)
    }}
  >
    <Trash />
  </button>
  );
};
export default ItemDeleteButton;
