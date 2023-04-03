import * as React from "react";

export default function StarIcon({ fillColor, borderColor }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // border={`2px solid ${borderColor}`}
    >
      <path
        d="M10 15.77L16.18 19.5L14.54 12.47L20 7.74L12.81 7.12L10 0.5L7.19 7.12L0 7.74L5.45 12.47L3.82 19.5L10 15.77Z"
        fill={fillColor}  
      />
    </svg>
  );
}
