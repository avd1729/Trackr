import type { FC, ReactNode } from "react";

interface ModelProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<ModelProps> = ({ isOpen, onClose, children}) => {
    if(!isOpen) return null;
    return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-200"
      onClick={onClose} // close when clicking outside
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full transition-transform duration-200"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;