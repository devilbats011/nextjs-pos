"use client";

import { useRouter } from "next/navigation";

export default function Modal() {

  const router = useRouter();

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal">
          <h1>Modal</h1>
          <div className="modal-header">
            <div onClick={handleCloseClick} > x </div>
          </div>
        </div>
      </div>
    </div>
  );
}
