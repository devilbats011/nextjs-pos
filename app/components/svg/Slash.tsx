import { SVGProps } from "react";

export default function Slash(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
    {...props}
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 3L8 21"
        stroke="#191A2C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
