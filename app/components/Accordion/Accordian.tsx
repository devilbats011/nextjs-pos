/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export default function Accordian({
  title,
  children,
  isOpen = false,
  setIsOpen,
}: {
  title: string;
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen?: any;
}) {
  const toggleAccordion = () => {
    if (setIsOpen) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className=" rounded px-4">
      <button
        onClick={toggleAccordion}
        className="w-full flex justify-between items-center rounded-sm gap-2.5"
      >
        <span className="text-lg font-medium">{title}</span>
      </button>
      {isOpen && (
        <div className="py-4 bg-white text-gray-700 overflow-auto relative">
          {children}
        </div>
      )}
    </div>
  );
}
