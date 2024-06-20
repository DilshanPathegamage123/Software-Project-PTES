import React from 'react';
import './FeedBackModal.css';
import "./Style.css";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const FeedBackModal: React.FC<Props> = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default FeedBackModal;
