import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Hamburger = ({ ...props }: Props) => {
  return (
    <div {...props}>
      <svg
        width="40"
        height="21"
        viewBox="0 0 40 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="0.5" x2="40" y2="0.5" stroke="#E2FF" />
        <line y1="10.5" x2="40" y2="10.5" stroke="#E2FF" />
        <line y1="20.5" x2="40" y2="20.5" stroke="#E2FF" />
      </svg>
    </div>
  );
};

export default Hamburger;
