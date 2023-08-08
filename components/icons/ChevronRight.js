import * as React from "react";

export default function ChevronRight({ fillColor, w, h }) {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.7375 20.725L16.4625 15L10.7375 9.2625L12.5 7.5L20 15L12.5 22.5L10.7375 20.725Z"
        fill={fillColor}
      />
    </svg>
  );
}
