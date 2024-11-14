"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModalProps } from "./interface";

export default function Modal({
  isHide = true,
  useStateHide,
  headerModalTitle,
  headerModalProps = {},
  modalWrapper,
  children,
}: ModalProps) {
  const router = useRouter();

  const [_hide, _setHide] = useState(isHide);

  function setHideManager(value: boolean): void {
    useStateHide ? useStateHide.setHide(value) : _setHide(value);
  }

  function getHideManager(): boolean {
    return useStateHide ? useStateHide.hide : _hide;
  }

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    // router.back();
    setHideManager(true);
  };

  if (getHideManager()) return null;

  return (
    <div style={{ padding: "0 1rem", ...styles.modalOverlay }}>
      {/* old width and height:
        width: "300px",
        height: "200px",
     */}

      <div
        style={{
          width: "300px",
          height: "220px",
          ...modalWrapper,
        }}
      >
        <div style={styles.modal}>
          <div
            className="flex flex-row cursor-pointer justify-end"
            onClick={handleCloseClick}
          >
            <div className="border rounded-full border-black p-1">
              <svg
                fill="#000000"
                width="14px"
                height="14px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>cancel2</title>
                <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path>
              </svg>
            </div>
          </div>
          <div style={styles.modalHeader}>
            <h1
              {...headerModalProps}
              style={{
                width: "100%",
                border: "0px solid black",
                textAlign: "center",
                fontWeight: "bold",
                ...headerModalProps.style,
              }}
            >
              {headerModalTitle}
            </h1>
          </div>
          <div className="w-full px-2.5">{children}</div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  modal: {
    background: "white",
    height: "100%",
    width: "100%",
    borderRadius: "15px",
    padding: "15px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalHeader: {
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    fontSize: "20px",
  },
};
