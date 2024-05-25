import DeleteFolderModal from "./DeleteFolderModal";
import EditFolderModal from "./EditFolderModal";
import ShareFolderModal from "./ShareFolderModal";

export default function FolderTitlebar({
  title,
  openModal,
  closeModal,
  modalStates,
}: {
  title: string;
  openModal: any;
  closeModal: any;
  modalStates: any;
}) {
  return (
    <div className="flex items-center justify-between mt-[40px] px-[32px] xl:px-[200px]">
      <div className="text-[30px] font-bold">{title}</div>
      <div className="flex space-x-2">
        {title !== "전체" && (
          <>
            <ShareFolderModal
              openModal={openModal}
              closeModal={closeModal}
              modalStates={modalStates}
            />
            <EditFolderModal
              openModal={openModal}
              closeModal={closeModal}
              modalStates={modalStates}
            />
            <DeleteFolderModal
              openModal={openModal}
              closeModal={closeModal}
              modalStates={modalStates}
            />
          </>
        )}
      </div>
    </div>
  );
}
