import React from 'react';

interface SpinnerProps {
  color?: string;
  size?: string;
  spinTime?: string;
  className?: string;
}

const Spin = () => (
  <style>{`@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`}</style>
);

const Spinner = ({ color = 'black', size = '1em', spinTime = '2s' }: SpinnerProps) => {
  return (
    <>
      <Spin />
      <svg
        data-testid="spinner"
        style={{ animation: `spin ${spinTime} 0s linear infinite` }}
        viewBox="0 0 20 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fill={color}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <title>ic_fluent_spinner_ios_20_filled</title>
          <desc>Created with Sketch.</desc>
          <g id="🔍-System-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="ic_fluent_spinner_ios_20_filled" fill={color} fillRule="nonzero">
              <path
                d="M10,3.5 C6.41015,3.5 3.5,6.41015 3.5,10 C3.5,10.4142 3.16421,10.75 2.75,10.75 C2.33579,10.75 2,10.4142 2,10 C2,5.58172 5.58172,2 10,2 C14.4183,2 18,5.58172 18,10 C18,14.4183 14.4183,18 10,18 C9.58579,18 9.25,17.6642 9.25,17.25 C9.25,16.8358 9.58579,16.5 10,16.5 C13.5899,16.5 16.5,13.5899 16.5,10 C16.5,6.41015 13.5899,3.5 10,3.5 Z"
                id="🎨-Color"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </>
  );
};

export default Spinner;
