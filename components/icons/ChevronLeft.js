import * as React from "react";

export default function ChevronLeft({ fillColor, w, h }) {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.2625 9.275L13.5375 15L19.2625 20.7375L17.5 22.5L10 15L17.5 7.5L19.2625 9.275Z"
        fill={fillColor}
      />
    </svg>
  );
}
