"use client";
import { useState, ReactNode } from "react";

interface HobbyAccordionProps {
  title: string;
  children: ReactNode;
}

const HobbyAccordion: React.FC<HobbyAccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-darkGray text-white px-5 py-7 font-NotoSans text-lg flex justify-between items-center"
      >
        {title}
        <span
          className={`text-white font-Bodoni transform transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-gray-300/10 text-gray-300 font-NotoSans">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HobbyAccordion;
