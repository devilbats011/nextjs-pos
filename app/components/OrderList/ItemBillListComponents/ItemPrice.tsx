/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatPrice } from "@/hooks/helper/helper";
import React from "react";

const ItemPrice: React.FC<any> = ({ ...rest }) => {
  return (
    <div className="w-full font-bold text-base"> 
    <div className="w-max">
    {formatPrice(rest.price * rest.bill.item_quantity) } 

    </div>
    
    </div>
  );
};
export default ItemPrice;
