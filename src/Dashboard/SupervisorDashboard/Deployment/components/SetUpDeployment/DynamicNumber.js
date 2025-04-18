import React from "react";

const DynamicNumberSvg = ({ number = 19, fill = "#D83B01", size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 9.3169C20 14.4545 15.8207 18.6338 10.6831 18.6338C6.16083 18.6338 2.37426 15.3775 1.54172 11.0878L1.23277 11.481C0.996738 11.7812 0.56218 11.832 0.263579 11.5969C-0.0357126 11.3611 -0.0881633 10.9277 0.147635 10.6277L1.51365 8.89017C1.62684 8.74593 1.79339 8.65299 1.97536 8.63136C2.15664 8.60767 2.34136 8.66173 2.48422 8.7756L4.2358 10.1612C4.53509 10.3977 4.5857 10.8318 4.34898 11.1304C4.11318 11.4297 3.67978 11.4814 3.3798 11.2435L2.90222 10.8658C3.6271 14.5001 6.84522 17.2535 10.6831 17.2535C15.0591 17.2535 18.6197 13.6929 18.6197 9.3169C18.6197 4.94095 15.0593 1.38028 10.6831 1.38028C10.3017 1.38028 9.99296 1.07156 9.99296 0.690141C9.99296 0.308723 10.3017 0 10.6831 0C15.8207 0 20 4.17926 20 9.3169Z"
      fill={fill}
    />
    <path
      d="M7.74 0.986984C7.64292 0.618218 7.86261 0.240941 8.23138 0.143862C8.59462 0.0474718 8.97742 0.265786 9.0745 0.635242L9.16744 0.987674C9.26452 1.35644 9.04482 1.73372 8.67606 1.8308C8.31166 1.92719 7.93094 1.71163 7.83294 1.33942L7.74 0.986984Z"
      fill={fill}
    />
    <path
      d="M5.67643 2.03582C5.48779 1.70432 5.60373 1.2831 5.93454 1.09424C6.26489 0.906287 6.68679 1.02085 6.87612 1.35235L7.05602 1.66843C7.24466 1.99993 7.12871 2.42115 6.7979 2.61002C6.46756 2.79796 6.04565 2.6834 5.85632 2.3519L5.67643 2.03582Z"
      fill={fill}
    />
    <path
      d="M3.97833 3.58823C3.70872 3.31861 3.70872 2.88198 3.97833 2.61237C4.24795 2.34275 4.68458 2.34275 4.95419 2.61237L5.19873 2.85691C5.46835 3.12652 5.46835 3.56315 5.19873 3.83277C4.92912 4.10238 4.49249 4.10238 4.22287 3.83277L3.97833 3.58823Z"
      fill={fill}
    />
    <path
      d="M2.46175 4.58056C2.64648 4.24768 3.06769 4.12828 3.40057 4.31439L3.70998 4.48693C4.04286 4.67234 4.16226 5.09287 3.97615 5.42575C3.79142 5.75748 3.37136 5.87802 3.03733 5.69191L2.72791 5.51938C2.39504 5.33396 2.27587 4.91343 2.46175 4.58056Z"
      fill={fill}
    />
    <path
      d="M1.51263 6.85497C1.61178 6.48575 1.99458 6.26858 2.35851 6.36773L2.70358 6.46067C3.07235 6.55982 3.28997 6.93848 3.19082 7.30656C3.09075 7.67785 2.70864 7.8918 2.34494 7.7938L1.99987 7.70086C1.63133 7.60194 1.41371 7.22305 1.51263 6.85497Z"
      fill={fill}
    />
    {/* Dynamic Number */}
    <text
      x="11"
      y="13"
      fill="#D83B01"
      fontSize="10"
      textAnchor="middle"
      fontWeight="bold"
    >
      {number}
    </text>
  </svg>
);

export default DynamicNumberSvg;
