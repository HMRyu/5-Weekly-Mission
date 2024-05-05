import { useEffect, useState } from "react";
import { getUserFolders, getUserLinks, getUserLinksById } from "../api/api";
import Modal from "./Modal";
import LinkCardListByFolderId from "./LinkCardListByFolderId";
import shareImg from "../images/share.svg";
import penImg from "../images/pen.svg";
import deleteImg from "../images/delete.svg";
import kakaoImg from "../images/kakao.svg";
import facebookImg from "../images/facebook.svg";
import linkImg from "../images/link.svg";

interface UserData {
  id: number;
  name: string;
  email: string;
  profileImageSource: string;
}

interface Folder {
  id: number;
  created_at: Date;
  name: string;
  user_id: number;
  favorite?: boolean;
}

function FolderMain({ user }: { user: UserData | null }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderId, setFolderId] = useState<number>(0);
  const [links, setLinks] = useState<any>([]);
  const [title, setTitle] = useState<string>("전체");
  const [clickedButton, setClickedButton] = useState<number | null>(0);
  const [modalStates, setModalStates] = useState<{
    addModal: boolean;
    shareModal: boolean;
    editModal: boolean;
    deleteModal: boolean;
    addLinkModal: boolean;
    deleteLinkModal: boolean;
  }>({
    addModal: false,
    shareModal: false,
    editModal: false,
    deleteModal: false,
    addLinkModal: false,
    deleteLinkModal: false,
  });

  const userId = user?.id;

  const getFolders = (userId: number) => {
    const result = getUserFolders(userId);

    return result;
  };

  const getLinksById = (userId: number, folderId: number) => {
    const result = getUserLinksById(userId, folderId);

    return result;
  };

  const getAllLinks = (userId: number) => {
    const result = getUserLinks(userId);

    return result;
  };

  const openModal = (modal: keyof typeof modalStates) => {
    setModalStates({ ...modalStates, [modal]: true });
  };

  const closeModal = (modal: keyof typeof modalStates) => {
    setModalStates({ ...modalStates, [modal]: false });
  };

  const handleButtonClick = (folderId: number) => {
    // Update the state to the ID of the clicked button
    setClickedButton(folderId);
    // Find the folder object corresponding to the clicked button
    const clickedFolder = folders.find((folder) => folder.id === folderId);
    if (clickedFolder) {
      // Update folderId and title
      setFolderId(clickedFolder.id);
      setTitle(clickedFolder.name);
    }
  };

  const handleAllButtonClick = () => {
    // Update the state to 0 for the "전체" button
    setClickedButton(0);
    // Update folderId and title
    setFolderId(0); // Assuming 0 represents "전체" folder
    setTitle("전체");
  };

  useEffect(() => {
    if (userId === undefined) return;

    const fetchAllLinks = async () => {
      const { data } = await getAllLinks(userId);

      setLinks(data.data);
    };

    const fetchUserFoldersData = async () => {
      const { data } = await getFolders(userId);

      setFolders(data.data);
    };

    const fetchLinksByFolderId = async () => {
      const { data } = await getLinksById(userId, folderId);

      setLinks(data.data);
    };

    if (folderId === 0) {
      fetchAllLinks();
    }
    // fetchAllLinks();
    fetchUserFoldersData();
    fetchLinksByFolderId();
  }, [userId, folderId]);

  return (
    <>
      <div className="flex items-center justify-between mt-[40px] xl:px-[200px] md:px-[32px] sm:px-[32px]">
        <div>
          <button
            className={`px-3 py-2 mr-2 border rounded-md ${
              clickedButton === 0
                ? "bg-blue-500 text-white"
                : "border-[#6D6AFE] text-black"
            }`}
            onClick={handleAllButtonClick}
          >
            전체
          </button>
          {folders &&
            folders.map((folder: Folder) => {
              return (
                <button
                  key={folder.id}
                  className={`px-3 py-2 mr-2 border rounded-md ${
                    folder.id === clickedButton
                      ? "bg-blue-500 text-white"
                      : "border-[#6D6AFE] text-black"
                  }`}
                  onClick={() => {
                    handleButtonClick(folder.id);
                  }}
                >
                  {folder.name}
                </button>
              );
            })}
        </div>
        <div
          className="text-[#6D6AFE] cursor-pointer"
          onClick={() => openModal("addModal")}
        >
          폴더 추가 +
        </div>
        <Modal
          isOpen={modalStates.addModal}
          onClose={() => closeModal("addModal")}
          title="폴더 추가"
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
      <div className="flex items-center justify-between mt-[40px] xl:px-[200px] md:px-[32px] sm:px-[32px]">
        <div className="text-[30px] font-bold">{title}</div>
        <div className="flex space-x-2">
          {title !== "전체" ? (
            <>
              <img
                src={shareImg}
                alt="share"
                className="cursor-pointer"
                onClick={() => openModal("shareModal")}
              />
              <Modal
                isOpen={modalStates.shareModal}
                onClose={() => closeModal("shareModal")}
                title="폴더 공유"
              >
                <div className="flex justify-center gap-x-5">
                  <img
                    src={kakaoImg}
                    alt="kakao"
                    className="bg-[#FEE500] p-4 rounded-full"
                  />
                  <img
                    src={facebookImg}
                    alt="facebook"
                    className="text-white bg-[#1877F2] p-4 rounded-full"
                  />
                  <img src={linkImg} alt="link" className="p-4" />
                </div>
              </Modal>
              <img
                src={penImg}
                alt="pen"
                className="cursor-pointer"
                onClick={() => openModal("editModal")}
              />
              <Modal
                isOpen={modalStates.editModal}
                onClose={() => closeModal("editModal")}
                title="폴더 이름 변경"
              >
                <input
                  placeholder="내용 입력"
                  className="px-4 py-5 rounded-md border border-[#6d6afe] bg-[#fff] w-full"
                />
                <button className="flex m-auto justify-center w-full px-5 py-4 mt-4 rounded-md text-[#f5f5f5] text-[16px] bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE]">
                  변경하기
                </button>
              </Modal>
              <img
                src={deleteImg}
                alt="delete"
                className="cursor-pointer"
                onClick={() => openModal("deleteModal")}
              />
              <Modal
                isOpen={modalStates.deleteModal}
                onClose={() => closeModal("deleteModal")}
                title="폴더 삭제"
              >
                <button className="flex m-auto justify-center w-full px-5 py-4 mt-4 rounded-md text-[#f5f5f5] text-[16px] bg-[#FF5B56]">
                  삭제하기
                </button>
              </Modal>
            </>
          ) : null}
        </div>
      </div>
      <LinkCardListByFolderId
        links={links}
        modalStates={modalStates}
        setModalStates={setModalStates}
        openModal={openModal}
        closeModal={closeModal}
      />
    </>
  );
}

export default FolderMain;
