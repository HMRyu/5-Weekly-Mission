import { calculateTimeDiff } from "@/utils/calculateTimeDiff";
import { useState } from "react";
import Modal from "./Modal";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

interface Link {
  id: string;
  created_at: Date;
  url: string;
  title: string;
  description: string;
  image_source: string;
}

export default function LinkCardByFolderId({
  link,
  modalStates,
  openModal,
  closeModal,
}: {
  link: Link;
  modalStates: any;
  openModal: any;
  closeModal: any;
}) {
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  console.log(link);

  return (
    <div className="w-[300px] h-[300px] m-[50px] shadow-2xl">
      <Link href={`https://${link.url}`} target="_blank" rel="noreferrer">
        <img
          src={link.image_source ? link.image_source : "/images/no-image.svg"}
          alt="link"
          className="w-[350px] h-[200px] object-cover rounded-md"
        />
      </Link>
      <div className="px-5 py-4">
        <div className="relative flex justify-between">
          <p className="text-[#666] text-[13px]">
            {calculateTimeDiff(link.created_at)}
          </p>
          <img
            src="/images/kebab.svg"
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
