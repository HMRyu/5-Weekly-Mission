import AddFolderModal from "./AddFolderModal";

interface Folder {
  id: number;
  created_at: Date;
  name: string;
  user_id: number;
  favorite?: boolean;
}

interface ModalStates {
  addModal: boolean;
  shareModal: boolean;
  editModal: boolean;
  deleteModal: boolean;
  addLinkModal: boolean;
  deleteLinkModal: boolean;
}

export default function FolderTabs({
  clickedButton,
  handleButtonClick,
  handleAllButtonClick,
  folders,
  openModal,
  closeModal,
  modalStates,
}: {
  clickedButton: number | null;
  handleButtonClick: (folderId: number) => void;
  handleAllButtonClick: () => void;
  folders: Folder[] | undefined | null;
  openModal: (modal: keyof ModalStates) => void;
  closeModal: (modal: keyof ModalStates) => void;
  modalStates: ModalStates;
}) {
  return (
    <div className="flex items-center justify-between mt-[40px] px-[32px] xl:px-[200px]">
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
          folders?.map((folder: Folder) => {
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
      <AddFolderModal modalStates={modalStates} closeModal={closeModal} />
    </div>
  );
}
