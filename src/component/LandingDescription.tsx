import dogImg from "../images/dog.png";
import editFolderImg from "../images/edit-folder.png";
import shareFolderImg from "../images/share-folder.png";
import searchFolderImg from "../images/search-folder.png";

function LandingDescription() {
  return (
    <div className="lg:px-[32px] md:px-[32px] sm:px-[32px]">
      <div className="flex justify-center items-center mt-[120px]">
        <div>
          <div className="text-4xl font-bold">
            원하는 링크를 <br />
            저장하세요.
          </div>
          <p className="text-sm text-[#6B6B6B] mr-[150px] ">
            나중에 읽고 싶은 글, 다시 보고 싶은 영상, <br />
            사고 싶은 옷, 기억하고 싶은 모든 것을 <br />한 공간에 저장하세요.
          </p>
        </div>
        <img src={dogImg} alt="dog" className="w-[400px] h-[300px]" />
      </div>
      <div className="flex justify-center items-center mt-[120px]">
        <img
          src={editFolderImg}
          alt="dog"
          className="w-[400px] h-[300px] mr-[150px]"
        />
        <div className="pl-[50px]">
          <div className="text-4xl font-bold">
            링크를 폴더로 <br />
            관리하세요.
          </div>
          <p className="text-sm text-[#6B6B6B]">
            나만의 폴더를 무제한으로 만들고 <br />
            다양하게 활용할 수 있습니다.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-[120px]">
        <div>
          <div className="text-4xl font-bold">
            저장한 링크를 <br />
            공유해 보세요.
          </div>
          <p className="text-sm text-[#6B6B6B] mr-[150px]">
            여러 링크를 폴더에 담고 공유할 수 있습니다. <br />
            가족, 친구, 동료들에게 쉽고 빠르게 링크를 <br />
            공유해 보세요.
          </p>
        </div>
        <img src={shareFolderImg} alt="dog" className="w-[400px] h-[300px]" />
      </div>
      <div className="flex justify-center items-center mt-[120px]">
        <img
          src={searchFolderImg}
          alt="dog"
          className="w-[400px] h-[300px] mr-[150px]"
        />
        <div>
          <div className="text-4xl font-bold">
            저장한 링크를 <br />
            검색해 보세요.
          </div>
          <p className="text-sm text-[#6B6B6B]">
            중요한 정보들을 검색으로 쉽게 찾아보세요.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingDescription;
