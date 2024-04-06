import '../css/CardList.css'
import LinkCard from './LinkCard';

function CardList({ datas }) {
    const nextData = datas.map((data) => {
        const newData = { id: data.id };
        if (data.created_at) {
            newData.createdAt = data.created_at;
        }
        if (data.createdAt) {
            newData.createdAt = data.createdAt;
        }
        newData.url = data.url;
        newData.title = data.title;
        newData.description = data.description;
        if (data.imageSource) {
            newData.imageSource = data.imageSource;
        }
        if (data.image_source) {
            newData.imageSource = data.image_source;
        }

        return newData;
    })

    return (
        <div className='card-container'>
            <div className="card-list">
                {   
                    nextData.map((link) => {
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