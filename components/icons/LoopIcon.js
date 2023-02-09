import * as React from "react"

export default function LoopIcon({fillColor}) {
    return (
        <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_dd_185_381)">
                <path d="M9.5 0C11.2239 0 12.8772 0.684819 14.0962 1.90381C15.3152 3.12279 16 4.77609 16 6.5C16 8.11 15.41 9.59 14.44 10.73L14.71 11H15.5L20.5 16L19 17.5L14 12.5V11.71L13.73 11.44C12.59 12.41 11.11 13 9.5 13C7.77609 13 6.12279 12.3152 4.90381 11.0962C3.68482 9.87721 3 8.22391 3 6.5C3 4.77609 3.68482 3.12279 4.90381 1.90381C6.12279 0.684819 7.77609 0 9.5 0ZM9.5 2C7 2 5 4 5 6.5C5 9 7 11 9.5 11C12 11 14 9 14 6.5C14 4 12 2 9.5 2Z" fill="black" />
                <path d="M14.0592 10.406L13.7602 10.7573L14.0864 11.0836L14.3564 11.3536L14.5029 11.5H14.71H15.2929L19.7929 16L19 16.7929L14.5 12.2929V11.71V11.5029L14.3536 11.3564L14.0836 11.0864L13.7573 10.7602L13.406 11.0592C12.3522 11.9558 10.9859 12.5 9.5 12.5C7.9087 12.5 6.38258 11.8679 5.25736 10.7426C4.13214 9.61742 3.5 8.0913 3.5 6.5C3.5 4.9087 4.13214 3.38258 5.25736 2.25736C6.38258 1.13214 7.9087 0.5 9.5 0.5C11.0913 0.5 12.6174 1.13214 13.7426 2.25736C14.8679 3.38258 15.5 4.9087 15.5 6.5C15.5 7.98592 14.9558 9.35225 14.0592 10.406ZM9.5 1.5C6.72386 1.5 4.5 3.72386 4.5 6.5C4.5 9.27614 6.72386 11.5 9.5 11.5C12.2761 11.5 14.5 9.27614 14.5 6.5C14.5 3.72386 12.2761 1.5 9.5 1.5Z" stroke={fillColor} />
                <path d="M14.0592 10.406L13.7602 10.7573L14.0864 11.0836L14.3564 11.3536L14.5029 11.5H14.71H15.2929L19.7929 16L19 16.7929L14.5 12.2929V11.71V11.5029L14.3536 11.3564L14.0836 11.0864L13.7573 10.7602L13.406 11.0592C12.3522 11.9558 10.9859 12.5 9.5 12.5C7.9087 12.5 6.38258 11.8679 5.25736 10.7426C4.13214 9.61742 3.5 8.0913 3.5 6.5C3.5 4.9087 4.13214 3.38258 5.25736 2.25736C6.38258 1.13214 7.9087 0.5 9.5 0.5C11.0913 0.5 12.6174 1.13214 13.7426 2.25736C14.8679 3.38258 15.5 4.9087 15.5 6.5C15.5 7.98592 14.9558 9.35225 14.0592 10.406ZM9.5 1.5C6.72386 1.5 4.5 3.72386 4.5 6.5C4.5 9.27614 6.72386 11.5 9.5 11.5C12.2761 11.5 14.5 9.27614 14.5 6.5C14.5 3.72386 12.2761 1.5 9.5 1.5Z" stroke="black" strokeOpacity="0.2" />
            </g>
            <defs>
                <filter id="filter0_dd_185_381" x="-1" y="0" width="25.5" height="25.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_185_381" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect1_dropShadow_185_381" result="effect2_dropShadow_185_381" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_185_381" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}