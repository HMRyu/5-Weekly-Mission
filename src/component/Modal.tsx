import React from "react";
import closeImg from "../images/close.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal only if the background is clicked, not the modal content
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full px-[40px] py-[32px] flex justify-center items-center z-40"
          onClick={handleBackgroundClick}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5" }}
        >
          <div className="w-[360px] bg-[#fff] p-[20px] rounded-md">
            <div className="flex flex-col justify-between items-center">
              <img
                src={closeImg}
                className="font-[18px] cursor-pointer ml-auto"
                onClick={onClose}
                alt="close"
              />
              <h2 className="text-[20px] font-bold pb-5">{title}</h2>
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
