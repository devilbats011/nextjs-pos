import React, { useState } from "react";

interface AccordionProps {
  title: string;
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen?: any;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  isOpen = false,
  setIsOpen,
}) => {

  const toggleAccordion = () => {
    if(setIsOpen) {
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
};

export default Accordion;
