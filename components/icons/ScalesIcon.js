import * as React from "react";

export default function ScalesIcon({ fillColor }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.99989 8C6.10446 8 6.99989 7.10457 6.99989 6C6.99989 4.89543 6.10446 4 4.99989 4C3.89532 4 2.99989 4.89543 2.99989 6C2.99989 7.10457 3.89532 8 4.99989 8Z"
        fill={fillColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.9999 8.5C21.9999 10.433 20.4329 12 18.4999 12C16.5669 12 14.9999 10.433 14.9999 8.5C14.9999 6.567 16.5669 5 18.4999 5C20.4329 5 21.9999 6.567 21.9999 8.5ZM19.9999 8.5C19.9999 9.32843 19.3283 10 18.4999 10C17.6715 10 16.9999 9.32843 16.9999 8.5C16.9999 7.67157 17.6715 7 18.4999 7C19.3283 7 19.9999 7.67157 19.9999 8.5Z"
        fill={fillColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5402 12.5684L1.71631 9.95895L2.28348 8.04105L22.3028 13.9612L21.7356 15.8791L14.0335 13.6014L17.874 20.5144L16.9999 22H6.99989L6.12573 20.5144L10.5402 12.5684ZM11.9999 14.0591L15.3004 20H8.69941L11.9999 14.0591Z"
        fill={fillColor}
      />
    </svg>
  );
}
