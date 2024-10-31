/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ItemCheckboxInput: React.FC<any> = ({ ...rest }) => {

  if(rest.disableCheckbox) {
    return null;
  }

  return (
    <input type="checkbox" style={{ margin: "0 .4rem"  }} />
  );
};
export default ItemCheckboxInput;
