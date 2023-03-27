import React from "react";

type GridProps = {
  children: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
};

export const Row = (props: GridProps) => {
  const shouldRenderDefaultSettings = () => {
    if (props.className?.includes("mt")) return false;
    if (props.className?.includes("space-x")) return false;
    return true;
  };
  return (
    <div
      className={`
           flex
           flex-row
           items-center
           ${shouldRenderDefaultSettings() ? "mt-2 space-x-4" : ""}
           ${props.className}
      `}
    >
      {props.children}
    </div>
  );
};

export const Col = (props: GridProps) => {
  const shouldRenderDefaultSettings = () => {
    if (props.className?.includes("items-")) return false;
    return true;
  };

  return (
    <div
      className={`
           flex
           flex-col
           ${shouldRenderDefaultSettings() ? "items-center" : ""}
           ${props.className}
      `}
    >
      {props.children}
    </div>
  );
};
