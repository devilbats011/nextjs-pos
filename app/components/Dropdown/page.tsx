// app/components/Dropdown/page.tsx
import React, { useState } from "react";

interface DropdownItem {
  label: string;
  value: string;
  onClick: () => void;

}

interface DropdownProps {
  items: DropdownItem[];
  label: string;
  containerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

const Dropdown: React.FC<DropdownProps> = ({ items, label, containerProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: DropdownItem) => {
    item.onClick();
    setIsOpen(false);
  };

  return (
    <div {...containerProps}  className="relative my-4" >
      <h3
        className="font-bold text-base md:text-xl "
        style={{ color: "#3F2F67" }}
      >
        {label}
      </h3>
      <button className="w-full mt-4 p-2.5 " style={{textAlign:'end', background: '#EFEFEF'}} onClick={handleToggle}>
        <span className="mr-4">
            V
            </span> 
      </button>
      {isOpen && (
        <ul className="absolute bg-white shadow-md mt-1 p-2 w-full border border-transparent hover:border-gray-100 hover:bg-gray-100" >
          {items.map((item, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer"
              style={{ color: "#3F2F67" }}
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
