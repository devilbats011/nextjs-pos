export default function Item({
  isButtonActive = false,
}: {
  isButtonActive?: boolean;
}) {

  function isBtnActiveManager(): string {
    return isButtonActive ? "#191A2C" : "white";
  }

  return (
    <>
      <style>
        {`
     .c{fill:none;stroke:${isBtnActiveManager()};strokeLinecap:round;strokeLinejoin:round;}
        `}
      </style>
      <svg
        width="26px"
        height="26px"
        viewBox="0 0 48 48"
        id="b"
        xmlns="http://www.w3.org/2000/svg"
        fill={isBtnActiveManager()}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <defs></defs>
          <polygon
            className="c"
            points="36.9 24 24 36.9 11.1 24 19.7 15.4 15.4 11.1 2.5 24 24 45.5 45.5 24 24 2.5 19.7 6.8 36.9 24"
          ></polygon>
          <polygon
            className="c"
            points="24 19.7571 28.3133 24.0704 24 28.3837 19.6867 24.0704 24 19.7571"
          ></polygon>
        </g>
      </svg>
    </>
  );
}
