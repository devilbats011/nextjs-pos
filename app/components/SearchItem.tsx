"use client";

import { useState } from "react";

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

      <ul style={listItemStyle}>
        {filteredItems.map((item: any, index: number | string) => (
          <li style={itemStyle} key={index}>
            <code>{JSON.stringify(item)}</code>
            <button
              style={{ border: "1px solid blue", padding: "10px", margin: '6px' }}
              onClick={itemOnClick.bind(this, item)}
            >
              CHARGE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchItem;
