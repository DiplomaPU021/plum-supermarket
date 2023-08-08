import * as React from "react";

export default function GooglePlayIcon({ fillColor }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 20.4999V3.4999C3 2.9099 3.34 2.3899 3.84 2.1499L13.69 11.9999L3.84 21.8499C3.34 21.5999 3 21.0899 3 20.4999ZM16.81 15.1199L6.05 21.3399L14.54 12.8499L16.81 15.1199ZM20.16 10.8099C20.5 11.0799 20.75 11.4999 20.75 11.9999C20.75 12.4999 20.53 12.8999 20.18 13.1799L17.89 14.4999L15.39 11.9999L17.89 9.4999L20.16 10.8099ZM6.05 2.6599L16.81 8.8799L14.54 11.1499L6.05 2.6599Z"
        fill={fillColor}
      />
    </svg>
  );
}
