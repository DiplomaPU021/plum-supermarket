import * as React from "react";

export default function DisLikeIcon({ fillColor }) {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 12V0H22V12H18ZM14 0C14.5304 0 15.0391 0.210714 15.4142 0.585786C15.7893 0.960859 16 1.46957 16 2V12C16 12.55 15.78 13.05 15.41 13.41L8.83 20L7.77 18.94C7.5 18.67 7.33 18.3 7.33 17.88L7.36 17.57L8.31 13H2C0.89 13 0 12.1 0 11V9C0 8.74 0.05 8.5 0.14 8.27L3.16 1.22C3.46 0.5 4.17 0 5 0H14ZM14 2H4.97L2 9V11H10.78L9.65 16.32L14 11.97V2Z"
        fill={fillColor}
      />
    </svg>
  );
}
