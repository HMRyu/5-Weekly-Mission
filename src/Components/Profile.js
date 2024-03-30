import '../css/Profile.css';

function Profile({ folderData }) {
    if (!folderData) {
        return <p>Loading...</p>
    }

    return (
        <>  
            <div className="profile">
                <img src={folderData.folder.owner.profileImageSource} alt="owner"></img>
                <div className='profile-name'>@{folderData.folder.owner.name}</div>
                <h1>{folderData.folder.name}</h1>
            </div>
        </>
    )
}

export default Profile;