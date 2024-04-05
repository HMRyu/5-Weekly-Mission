import '../css/CardList.css'
import SearchImg from '../img/search.svg';
import LinkCard from './LinkCard';

function CardList({ folderData }) {
    const links = folderData.folder.links;

    return (
        <div className='card-container'>
            <input className="search-bar" type='text' placeholder='링크를 검색해보세요.'></input>
            <img className='search-bar-image' alt='magnifying glass' src={SearchImg} />
            <div className="card-list">
                {   
                    links.map((link) => {
                        return (
                            <LinkCard key={link.id} link={link} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CardList;