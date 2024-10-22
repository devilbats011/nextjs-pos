/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const QuantityItem: React.FC<any> = ({ ...rest }) => {

  if(rest.disableAddRemoveButton) {
    return <span style={{marginLeft: "10px", marginRight: "10px"}}> x{rest.quantity} </span>;
  }

  return (
    <div
      style={{
        display: "inline-block",
        margin: "0 .4rem",
        width: "2rem",
        position: "relative",
      }}
    >
      <input
        type="text"
        placeholder="0"
        defaultValue={rest.quantity}
        style={{
          width: "100%",
          border: "1px solid black",
          paddingLeft: ".4rem",
          borderRadius: "2px",
        }}
      />
    </div>
  );
};
export default QuantityItem;
