import { useState } from "react";
import kebabImg from "../images/kebab.svg";
import noImage from "../images/no-image.svg";
import { calculateTimeDiff } from "../utils/calculateTimeDiff";
import { formatDate } from "../utils/formatDate";

interface Link {
  id: string;
  createdAt: Date;
  url: string;
  title: string;
  description: string;
  imageSource: string;
}

function LinkCard({ link }: { link: Link }) {
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  return (
    <div className="w-[300px] h-[300px] m-[50px] shadow-2xl">
      <a href={link.url} target="_blank" rel="noreferrer">
        <img
          src={link.imageSource ? link.imageSource : noImage}
          alt="link"
          className="w-[350px] h-[200px] object-cover rounded-md"
        />
      </a>
      <div className="px-5 py-4">
        <div className="relative flex justify-between">
          <p className="text-[#666] text-[13px]">
            {calculateTimeDiff(link.createdAt)}
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
                onClick={() => console.log("Delete")}
              >
                <p className="text-center">삭제하기</p>
              </button>
              <button
                className="block px-3 w-full hover:bg-[#E7EFFB]"
                onClick={() => console.log("Add to folder")}
              >
                <p className="text-center">폴더에 추가</p>
              </button>
            </div>
          )}
        </div>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
          {link.description}
        </p>
        <p className="mt-2 text-[#333] text-[14px]">
          {formatDate(link.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default LinkCard;
