/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ItemRemove: React.FC<any> = ({ ...rest }) => {
  
  if(rest.disableAddRemoveButton) {
    return null;
  }

  return (
    <div style={{ display: "inline-block", margin: "0 .4rem" }}>
      <button style={{ cursor: "pointer" }}>-</button>
    </div>
  );
};
export default ItemRemove;
