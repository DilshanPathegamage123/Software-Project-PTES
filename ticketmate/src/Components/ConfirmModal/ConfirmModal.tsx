import React from "react";

type ConfirmModalProps = {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title: string;
  body: string;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  onHide,
  onConfirm,
  title,
  body,
}) => {
  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onHide}
            ></button>
          </div>
          <div className="modal-body">
            <p>{body}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary bg-black"
              onClick={onHide}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
