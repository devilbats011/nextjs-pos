/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ItemWrapper from "./ItemWrapper";
import { ItemProps } from "@/hooks/zustand/interface/item";
import { API_IMG } from "@/hooks/helper/constant";
import Image from "next/image";

const ItemRepresentative: React.FC<any> = ({
  item,
  ...rest
}: {
  item: ItemProps;
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (rest.disableRepresentative) {
    return null;
  }


  return (
    <ItemWrapper>
      {item.representation_color && item.representation_color != "null" ? (
        <div
          style={{
            width: "36px",
            height: "36px",
            backgroundColor: item.representation_color ?? "black",
            display: "inline-block",
          }}
        ></div>
      ) : 
      <Image
      src={API_IMG + "/" + item.representation_image}
      alt={item.name}
      style={{
        width: "36px",
        height: "36px",
        display: "inline-block",
      }}
    />
      }
      {/* {item.representation_image ? (
        <img
          src={API_IMG + "/" + item.representation_image}
          alt={item.name}
          style={{
            width: "36px",
            height: "36px",
            display: "inline-block",
          }}
        />
      ) : null} */}
    </ItemWrapper>
  );
};
export default ItemRepresentative;
