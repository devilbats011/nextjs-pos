import React from "react";
import { useEffect, useState } from "react";
import { InputGroupErrorState, InputGroupTextProps } from "./interfaces";



export default function InputGroupText({
  children,
  id,
  inputProps,
  labelProps,
  errorProps,
  errorMessage,
}: InputGroupTextProps) {
  const _id = id || `input-${Math.random().toString(36).slice(2, 11)}`;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}
      className=""
    >
      <label
        {...labelProps}
        htmlFor={_id}
        className="font-bold text-base md:text-xl "
        style={{ color: "#3F2F67" }}
      >
        {children}
      </label>
      <input
        {...inputProps}
        className="input w-full px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="text"
        style={{ background: "#EFEFEF" }}
        id={_id}
      />
      <ErrorText {...errorProps} message={errorMessage}></ErrorText>
    </div>
  );
}

function ErrorText({
  message,
  style,
  ...props
}: {
  message?: InputGroupErrorState;
  style?: React.CSSProperties;
  

}): JSX.Element | null {
  const [isShaking, setIsShaking] = useState(false);

  const handleShake = () => {
    setIsShaking(true);
  };

  const handleAnimationEnd = () => {
    setIsShaking(false); // Reset the shake state when the animation ends
  };

  useEffect(() => {
    handleShake();
  }, [message?.counter]);

  if (!message) {
    return null;
  }
  if (!message.message) {
    return null;
  }

  return (
    <>
      <style>
        {`
          @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
          }
        `}
      </style>
      <div
        style={{
          color: "red",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          perspective: "1000px",
          ...(isShaking && {
            animation: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
          }),
          ...style,

        }}
        onClick={handleShake}
        onAnimationEnd={handleAnimationEnd} // Reset animation when it ends
        {...props}
      >
        {message.message}
      </div>
    </>
  );
}
