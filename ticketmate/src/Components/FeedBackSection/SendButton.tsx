import React from "react";
import "./Style.css";

type Props = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  isDisabled?: boolean;
};

const SendButton: React.FC<Props> = ({
  children,
  type,
  isDisabled = false,
}) => {
  return (
    <button type={type} disabled={isDisabled} className={`btn  dbtn sendbtn`}>
      {children}
    </button>
  );
};

export default SendButton;
