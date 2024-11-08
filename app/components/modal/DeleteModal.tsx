import React from "react";
import Modal from "./Modal";
import { DeleteModalProps } from "./interface";
import ButtonSmall from "../Buttons/ButtonSmall";

export default function DeleteModal({
  deleteButtonOnClick: deleteOnClick,
  ...props
}: DeleteModalProps) {
  return (
    <Modal
      modalWrapper={{
        width: "300px",
        height: "200px",
        ...props.modalWrapper,
      }}
      headerModalProps={{ style: { color: "red" }, ...props.headerModalProps }}
      {...props}
    >
      <div className="flex flex-col gap-4 justify-center items-center">
        <h3 className="mb-3 font-bold">Are you sure?</h3>
        <ButtonSmall
          buttonProps={{
            onClick: deleteOnClick,
          }}
        >
          Yes, I’am sure! 💀
        </ButtonSmall>
      </div>
    </Modal>
  );
}
