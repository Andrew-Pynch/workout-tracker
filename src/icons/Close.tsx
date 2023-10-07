
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Close = ({ ...props }: Props) => {
  return (
    <div className="cursor-pointer" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30px"
        height="30px"
        viewBox="-0.5 0 25 25"
      >
        <path
          d="M3 21.32L21 3.32001"
          stroke="#F95B5B"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 3.32001L21 21.32"
          stroke="#F95B5B"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Close;
