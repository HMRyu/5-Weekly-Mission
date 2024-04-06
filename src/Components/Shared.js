import { useEffect, useState } from "react";
import '../css/Shared.css';
import CardList from "./CardList";
import Profile from "./Profile";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import { fetchFolderData } from "../api";

function Shared() {
    const [folderData, setFolderData] = useState(null);

    const loadFolderData = async () => {
        const result = await fetchFolderData();
        
        return result;
      }

    useEffect(() => {
        loadFolderData()
        .then((r) => {
        const { folder } = r;

        setFolderData((p) => ({
            ...p,
            folder,
        }));
        })
        .catch((e) => console.error(e));
    }, []);
    
    return (
        <>
            {folderData ? <Profile folderData={folderData}/> : <Loading />}
            <div className="searchbar">
                <SearchBar />
            </div>
            {folderData ? <CardList datas={folderData.folder.links}/> : <Loading />}
        </>
    )
}

export default Shared;