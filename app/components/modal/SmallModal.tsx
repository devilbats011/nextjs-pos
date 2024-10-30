import React from "react";
import Modal from "./Modal";
import { ModalProps, modalWrapperProps } from "./interface";

export default function SmallModal({ children, ...props }: ModalProps) {
  return (
    <Modal
      modalWrapper={{
        width: "300px",
        height: "200px",
        ...props.modalWrapper,
      }}
      headerModalProps={{ style: { color: "#3F2F67" }, ...props.headerModalProps }}
      {...props}
    >
      <div className="flex flex-col gap-4 justify-center items-center"  style={{ color: "#3F2F67" }}>
        {children}
      </div>
    </Modal>
  );
}
