import React, { MouseEventHandler } from "react";
// import { Dispatch, SetStateAction } from "react";

// Dispatch<SetStateAction<boolean>>
export interface ModalProps {
    isHide?: boolean;
    useStateHide?: { setHide: (value: boolean) => void ; hide: boolean };
    headerModalTitle?: string;
    modalWrapper?: modalWrapperProps;
    headerModalProps?: React.HTMLAttributes<HTMLHeadingElement>;
    children?: React.ReactNode;
  }

export interface modalWrapperProps extends React.CSSProperties {
    width?: string;
    height?: string;
}

export interface  DeleteModalProps extends ModalProps {
  deleteButtonOnClick: MouseEventHandler<HTMLButtonElement>;
}
