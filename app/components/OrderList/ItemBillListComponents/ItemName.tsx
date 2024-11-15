/* eslint-disable @typescript-eslint/no-explicit-any */
import { isArrayNotEmpty } from "@/hooks/helper/helper";
import React from "react";

const ItemName: React.FC<any> = ({ className = 'items-center',...rest }: any) => {

  return (
    <div className={"w-full flex flex-col  pt-1"+" "+ className} >
      <div className="w-max"> {rest.name} </div>
      { isArrayNotEmpty(rest.bill_refund_details) && (
        <div className="pl-2 text-sm text-red-500 italic w-max">Item refunded * {rest.bill_refund_details.reduce((acc: any, refund: { quantity: any; }) => acc+ parseInt(refund.quantity),0)} </div>
      )}
    </div>
  );
};
export default ItemName;
