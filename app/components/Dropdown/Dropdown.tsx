'use client';

import React, { useEffect, useState } from "react";


interface DropdownItem {
  id?: string;
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  items: DropdownItem[];
  label: string;
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  defaultValue?: string;
}

export default function Dropdown({
  items,
  label,
  containerProps,
  defaultValue = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(defaultValue);

  useEffect(() => {
    setName(defaultValue);
  }, [defaultValue]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: DropdownItem) => {
    item.onClick();
    setIsOpen(false);
  };

  return (
    <div {...containerProps} className="relative">
      <h3
        className="font-bold text-base md:text-xl "
        style={{ color: "#3F2F67" }}
      >
        {label}
      </h3>
      <button
        className="w-full mt-4 px-1 py-1 flex justify-between items-center border-2 focus:border-indigo-500 "
        style={{ textAlign: "end", background: "#EFEFEF" }}
        type="button"
        onClick={handleToggle}
      >
        <div className="w-8/12 text-left pl-1">{name}</div>
        <svg
          className="mr-2"
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
            fill="#000000"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute bg-white shadow-md mt-1 w-full border ">
          {items.map((item, index) => (
            <li
              key={index}
              className="p-3 cursor-pointer hover:border-gray-100 hover:bg-gray-100"
              style={{ color: "#3F2F67" }}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item);
                if (item.label !== "+ Add Category") {
                  setName(item.label);
                }
              }}
            >
              {item.label !== "+ Add Category" ? (
                item.label
              ) : (
                <b>{item.label}</b>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

