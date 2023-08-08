import * as React from "react";

export default function Star({ fillColor, height, width, stroke }) {
  return (
    <svg
      width={height}
      height={width}
      viewBox="0 0 46 43"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.2962 33.2038L22.7795 32.8919L22.2628 33.2038L10.5072 40.299L13.6268 26.9264L13.7639 26.3386L13.3077 25.9434L2.92053 16.945L16.5963 15.7847L17.1971 15.7337L17.4325 15.1785L22.7795 2.5626L28.1265 15.1785L28.3618 15.7337L28.9627 15.7847L42.6384 16.945L32.2512 25.9434L31.795 26.3386L31.9322 26.9264L35.0518 40.299L23.2962 33.2038Z"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
}
