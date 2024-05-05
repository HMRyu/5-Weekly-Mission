import LinkCardByFolderId from "./LinkCardByFolderId";

function LinkCardListByFolderId({
  links,
  modalStates,
  setModalStates,
  openModal,
  closeModal,
}: {
  links: any;
  modalStates: any;
  setModalStates: any;
  openModal: any;
  closeModal: any;
}) {
  if (links.length === 0) {
    return (
      <div className="flex justify-center items-center mt-[50px]">
        저장된 링크가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-items-center mt-[40px] xl:px-[200px] w-full">
      {links.map((link: any) => {
        return (
          <LinkCardByFolderId
            key={link.id}
            link={link}
            modalStates={modalStates}
            setModalStates={setModalStates}
            openModal={openModal}
            closeModal={closeModal}
          />
        );
      })}
    </div>
  );
}

export default LinkCardListByFolderId;
