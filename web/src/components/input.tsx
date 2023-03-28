import React from "react";

type InputProps = {
  type: React.ComponentProps<"input">["type"];
  required?: boolean;
  label: string;
  placeholder?: string;
  value: string | number | Date | undefined;
  onValueChange: (value: any) => void;
  className?: React.ComponentProps<"input">["className"];
  filled?: boolean;
  onFocusIn?: () => void;
  onFocusOut?: () => void;
};

export const Input = (props: InputProps) => {
  return (
    <div
      className={`
         mb-4
         ${props.filled ? "w-full" : ""}
         ${props.className}
    `}
    >
      <label
        htmlFor={props.label}
        className="z-0 mb-2 block text-sm font-bold text-slate-100"
      >
        {props.label}{" "}
        {props.required !== false && <span className="text-red-500">*</span>}
      </label>
      <input
        autoComplete="off"
        onFocus={props.onFocusIn}
        onBlur={props.onFocusOut}
        required={props.required}
        className={`
            block 
            w-full 
            rounded-lg 
            border 
            border-gray-300 
            bg-gray-50 p-2.5 
            text-sm 
            text-gray-900 
            focus:border-pink-400
            focus:ring-pink-400

        `}
        id={props.label}
        type={props.type}
        placeholder={props.placeholder ?? props.label}
        value={props.value?.toString()}
        onChange={(e) => props.onValueChange(e.target.value)}
      />
    </div>
  );
};
