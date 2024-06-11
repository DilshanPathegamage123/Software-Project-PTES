import React from "react";
import "./Style.css";

type Props = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  version?: string;
  isDisabled?: boolean;
};

const SendButton: React.FC<Props> = ({
  children,
  version = "primary",
  type,
  isDisabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`btn btn-${version} dbtn`}
    >
      {children}
    </button>
  );
};

export default SendButton;
