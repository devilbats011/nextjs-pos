"use client";

import { useState } from "react";
import ItemsReadonly from "./ItemsReadonly/page";

interface SearchItemProps {
  items?: any[];
  containerStyle?: React.CSSProperties;
  inputSearchStyle?: React.CSSProperties;
  listItemStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  itemOnClick?: any;
}

const SearchItem: React.FC<SearchItemProps> = ({
  items = [],
  containerStyle = undefined,
  inputSearchStyle = undefined,
  listItemStyle = undefined,
  itemStyle = undefined,
  itemOnClick = undefined,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={containerStyle}>
      <input
        style={inputSearchStyle}
        type="text"
        placeholder="Search on name.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ItemsReadonly
        item={filteredItems}
        listOnClick={(item: any, event: any) => itemOnClick(item, event)}
      />
    </div>
  );
};

export default SearchItem;
