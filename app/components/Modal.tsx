"use client";

import { useRouter } from "next/navigation";

export default function Modal() {

  const router = useRouter();

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalWrapper}>
        <div style={styles.modal}>
          <h1>Modal</h1>
          <div style={styles.modalHeader}>
            <div onClick={handleCloseClick}> x </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  modalWrapper: {
    width: "500px",
    height: "600px",
  },
  modal: {
    background: "white",
    height: "100%",
    width: "100%",
    borderRadius: "15px",
    padding: "15px",
  },
  modalOverlay: {
    position: "absolute",
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
    justifyContent: "flex-end",
    fontSize: "25px",
  },
};


