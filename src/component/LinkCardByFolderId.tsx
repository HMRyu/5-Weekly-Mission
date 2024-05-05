import { useState } from "react";
import kebabImg from "../images/kebab.svg";
import noImage from "../images/no-image.svg";
import Modal from "./Modal";
import { calculateTimeDiff } from "../utils/calculateTimeDiff";
import { formatDate } from "../utils/formatDate";

interface Link {
  id: string;
  created_at: Date;
  url: string;
  title: string;
  description: string;
  image_source: string;
}

function LinkCard({
  link,
  modalStates,
  setModalStates,
  openModal,
  closeModal,
}: {
  link: Link;
  modalStates: any;
  setModalStates: any;
  openModal: any;
  closeModal: any;
}) {
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  return (
    <div className="w-[300px] h-[300px] m-[50px] shadow-2xl">
      <a href={link.url} target="_blank" rel="noreferrer">
        <img
          src={link.image_source ? link.image_source : noImage}
          alt="link"
          className="w-[350px] h-[200px] object-cover rounded-md"
        />
      </a>
      <div className="px-5 py-4">
        <div className="relative flex justify-between">
          <p className="text-[#666] text-[13px]">
            {calculateTimeDiff(link.created_at)}
          </p>
          <img
            src={kebabImg}
            alt="kebab"
            className="cursor-pointer"
            onClick={togglePopover}
          />
          {showPopover && (
            <div className="absolute top-8 right-2 bg-white p-2 rounded-md shadow-md">
              <button
                className="block px-3 w-full hover:bg-[#E7EFFB]"
                onClick={() => openModal("deleteLinkModal")}
              >
                <p
                  className="text-center"
                  onClick={() => openModal("deleteLinkModal")}
                >
                  삭제하기
                </p>
              </button>
              <Modal
                isOpen={modalStates.deleteLinkModal}
                onClose={() => closeModal("deleteLinkModal")}
                title="링크 삭제"
              >
                <button className="flex m-auto justify-center w-full px-5 py-4 mt-4 rounded-md text-[#f5f5f5] text-[16px] bg-[#FF5B56]">
                  삭제하기
                </button>
              </Modal>
              <button
                className="block px-3 w-full hover:bg-[#E7EFFB]"
                onClick={() => openModal("addLinkModal")}
              >
                <p className="text-center">폴더에 추가</p>
              </button>
              <Modal
                isOpen={modalStates.addLinkModal}
                onClose={() => closeModal("addLinkModal")}
                title="폴더에 추가"
              >
                <input
                  placeholder="내용 입력"
                  className="px-4 py-5 rounded-md border border-[#6d6afe] bg-[#fff] w-full"
                />
                <button className="flex m-auto justify-center w-full px-5 py-4 mt-4 rounded-md text-[#f5f5f5] text-[16px] bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE]">
                  추가하기
                </button>
              </Modal>
            </div>
          )}
        </div>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          {link.description}
        </p>
        <p className="mt-2 text-[#333] text-[14px]">
          {formatDate(link.created_at)}
        </p>
      </div>
    </div>
  );
}

export default LinkCard;
