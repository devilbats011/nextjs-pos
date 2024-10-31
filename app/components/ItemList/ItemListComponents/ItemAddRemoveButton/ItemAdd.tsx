/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ItemAdd: React.FC<any> = ({ ...rest }) => {

  if(rest.disableAddRemoveButton) {
    return null;
  }

  return <div style={{ display: "inline-block", margin: "0 .4rem" }}
  className="border border-gray-300 px-2 rounded-md"
  >
  <button style={{ cursor: "pointer" }}
  className=""
  >+</button>
</div>;
};
export default ItemAdd;
