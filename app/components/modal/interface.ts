import React, { MouseEventHandler } from "react";
import { Dispatch, SetStateAction } from "react";

export interface ModalProps {
    isHide?: boolean;
    useStateHide?: { setHide: Dispatch<SetStateAction<boolean>>; hide: boolean };
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
