import * as React from "react";

export default function LikeIcon({ fillColor }) {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 8V20H0V8H4ZM8 20C7.46957 20 6.96086 19.7893 6.58579 19.4142C6.21071 19.0391 6 18.5304 6 18V8C6 7.45 6.22 6.95 6.59 6.59L13.17 0L14.23 1.06C14.5 1.33 14.67 1.7 14.67 2.11L14.64 2.43L13.69 7H20C21.11 7 22 7.9 22 9V11C22 11.26 21.95 11.5 21.86 11.73L18.84 18.78C18.54 19.5 17.83 20 17 20H8ZM8 18H17.03L20 11V9H11.21L12.34 3.68L8 8.03V18Z"
        fill={fillColor}
      />
    </svg>
  );
}
