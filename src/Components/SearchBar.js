import '../css/SearchBar.css';
import SearchImg from '../img/search.svg';

function SearchBar() {
    return (
        <div className="search-bar-container">
            <input className="search-bar" type='text' placeholder='링크를 검색해보세요.'></input>
            <img className='search-bar-image' alt='magnifying glass' src={SearchImg} />
        </div>
    )
}

export default SearchBar;