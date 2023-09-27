import { useState } from "react";

type DropdownProps = {
  options: string[];
  selectedOption?: string;
  setSelectedOption: (option: string) => void;
};

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="inline-flex items-center rounded bg-gray-200 py-2 px-4 font-semibold text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {props.selectedOption === undefined ||
          props.selectedOption.trim() === ""
            ? "Select an option"
            : props.selectedOption}
        </span>
        <svg
          className="ml-2 h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-8a6 6 0 1 0 0 12A6 6 0 0 0 10 4z" />
        </svg>
      </button>
      {isOpen && (
        <ul
          className="absolute mt-2 w-48 rounded border bg-white py-1 shadow"
          style={{ zIndex: 9999 }}
        >
          {props.options.map((option: any) => {
            return (
              <li
                onClick={() => {
                  props.setSelectedOption(option);
                  setIsOpen(false);
                }}
              >
                <a
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  href="#"
                >
                  {option}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

