import { Link } from 'react-router-dom';
import '../css/CardList.css'
import SearchImg from '../img/search.svg';
import { calculateTimeDiff, formatDate } from '../utils';

function Card({ link }) {

    return (
        <>  
            <Link to={`/detail/${link.id}`}>
                <div className="card">
                    <img className='card-img' src={link.imageSource} alt={link.title}></img>
                    <div className='card-content'>
                        <p>{link.title}</p>
                        <p className='card-content-timediff'>{calculateTimeDiff(link.createdAt)}</p>
                        <p>{link.description}</p>
                        <p className='card-content-createdat'>{formatDate(link.createdAt)}</p>
                    </div>
                </div>
            </Link>  
        </>
    )
}

function CardList({ folderData }) {
    if (!folderData) {
        return <p>Loading...</p>
    }

    let links = folderData.folder.links;

    return (
        <>  
            <div className='card-container'>
                <input className="search-bar" type='text' placeholder='링크를 검색해보세요.'></input>
                <img className='search-bar-image' alt='magnifying glass' src={SearchImg} />
                <div className="card-list">
                    {   
                        links.map((link) => {
                            return (
                                <Card key={link.id} link={link} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default CardList;