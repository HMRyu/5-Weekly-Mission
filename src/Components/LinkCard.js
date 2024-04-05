import { Link } from 'react-router-dom';
import '../css/CardList.css'
import { calculateTimeDiff, formatDate } from '../utils';

function LinkCard({ link }) {
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

export default LinkCard;