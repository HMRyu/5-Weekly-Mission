import { useState, useEffect } from 'react';
import '../css/FolderList.css';
import { fetchLinkList, fetchLinkListByFolderId } from '../api';
import CardList from './CardList';
import Loading from './Loading';
import shareImg from '../img/share.svg';
import deleteImg from '../img/delete.svg';
import editImg from '../img/pen.svg';

function FolderList({ sortList, id }) {
    const [title, setTitle] = useState('전체');
    const [linkList, setLinkList] = useState(null);
    const [folderLinkList, setFolderLinkList] = useState(null);
    const [folderId, setFolderId] = useState(0);
    
    const loadLinkList = async () => {
        const result = await fetchLinkList(id);

        return result;
    } 

    const loadLinkListById = async () => {
        const result = await fetchLinkListByFolderId(folderId);

        return result;
    }

    useEffect(() => {
        loadLinkList()
        .then((r) => {
        setLinkList(r.data);
        }).catch((e) => console.error(e));
        loadLinkListById()
        .then((r) => {
            setFolderLinkList(r.data);
        }).catch((e) => console.error(e));
    }, []);

    return (
        <>
            <div className='folderlist'>
                <div className='folderlist-btn-list'>
                    <div className='folderlist-btn-select'>
                        <button onClick={() => {
                            setTitle('전체');
                            setFolderId(0);
                        }}>전체</button>
                        {sortList.map((item) => {
                            return (
                                    <button onClick={() => {
                                        setTitle(item.name);
                                        setFolderId(item.id);
                                    }} className="folderlist-btn" key={item.id}>{item.name}</button>
                            )
                        })}
                    </div>
                    <button className='folderlist-add-btn'>폴더 추가 + </button>
                </div>
                <div className='folderlist-title'>
                    <h1>{title}</h1>
                    {
                        folderId !== 0 ? 
                        <div className='folderlist-btn-options'>
                            <img src={shareImg} alt='share'></img>
                            <button>공유</button>
                            <img src={editImg} alt='edit'></img>
                            <button>이름 변경</button>
                            <img src={deleteImg} alt='delete'></img>
                            <button>삭제</button>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
            {folderId === 0 ? 
                linkList ? 
                    <CardList datas={linkList} /> 
                    : 
                    <Loading />
                :
                <CardList datas={folderLinkList} />}
        </>

    )
}

export default FolderList;
