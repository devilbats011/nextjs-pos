/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const ItemRepresentative: React.FC<any> = ({ ...rest }) => {
  return (
    <div style={{
      width: '36px',
      height: '36px',
      backgroundColor: '#7A288A', // a purple-ish color
      display: 'inline-block'
    }}></div>
  );
};
export default ItemRepresentative;
