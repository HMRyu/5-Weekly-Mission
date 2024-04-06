import { Link } from 'react-router-dom';
import '../css/CardList.css'
import { calculateTimeDiff, formatDate } from '../utils';
import noImg from '../img/no-img.svg';
import starImg from '../img/star.svg';
import kebabImg from '../img/kebab.svg';

function LinkCard({ link }) {
    return (
        <Link to={`/detail/${link.id}`}>
            <div className="card">
                <img className='card-img' src={link.imageSource ? link.imageSource : noImg} alt={link.title}></img>
                <img className='card-star-img' src={starImg} alt='star' width="30px"></img>
                <div className='card-content'>
                    <img className='card-kebab-img' src={kebabImg} alt='kebab' width="30px"></img>
                    <p className='card-content-timediff'>{calculateTimeDiff(link.createdAt)}</p>
                    <p>{link.description}</p>
                    <p className='card-content-createdat'>{formatDate(link.createdAt)}</p>
                </div>
            </div>
        </Link>  
    )
}

export default LinkCard;