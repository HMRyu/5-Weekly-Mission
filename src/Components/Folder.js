import "../css/Folder.css";
import SearchBar from "./SearchBar";
import FolderList from "./FolderList";


function Folder({ sortList, id }) {
    return (
        <>
            <div className="folder-container">
                <input className="folder-input" placeholder="링크를 추가해 보세요."></input>
                <button className="folder-btn">추가하기</button>
            </div>
            <SearchBar />
            <FolderList sortList={sortList} id={id} />
        </>
    )
}

export default Folder;