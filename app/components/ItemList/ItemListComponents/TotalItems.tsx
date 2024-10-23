/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const TotalItems: React.FC<any> = ({ ...rest }) => {
  
  if(rest.disableTotalItems) {
    return null;
  }

  return (
    <div>Total Price: RM {rest.price} </div>
  );
};
export default TotalItems;
