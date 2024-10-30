export default function Sales({
  isButtonActive = false,
}: {
  isButtonActive?: boolean;
}) {
  function isBtnActiveManager(): string {
    return isButtonActive ? "#191A2C" : "white";
  }

  // console.log(isBtnActiveManager);
  return (
    <svg
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      width="26px"
      height="26px"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      fill={isBtnActiveManager()}
      stroke={isBtnActiveManager()}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          {" "}
          <polygon
            fill="none"
            stroke={isBtnActiveManager()}
            strokeWidth="2"
            strokeMiterlimit="10"
            points="21.903,5 55,38.097 34.097,59 1,25.903 1,5 "
          ></polygon>{" "}
          <polyline
            fill="none"
            stroke={isBtnActiveManager()}
            strokeWidth="2"
            strokeMiterlimit="10"
            points="29.903,5 63,38.097 42.097,59 "
          ></polyline>{" "}
          <circle
            fill="none"
            stroke={isBtnActiveManager()}
            strokeWidth="2"
            strokeMiterlimit="10"
            cx="14"
            cy="18"
            r="5"
          ></circle>{" "}
        </g>
      </g>
    </svg>
  );
}
