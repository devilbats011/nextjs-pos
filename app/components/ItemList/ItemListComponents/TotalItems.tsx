import React from "react";

const TotalItems: React.FC<any> = ({ ...rest }) => {
  return (
    <div>Total Price: RM {rest.price} </div>
  );
};
export default TotalItems;
