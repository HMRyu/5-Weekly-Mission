export async function fetchUserData() {
    try {
        const response = await fetch('https://bootcamp-api.codeit.kr/api/sample/user');
        if (!response.ok) {
            throw new Error('정보를 불러오는데 실패했습니다.');
        }
        const body = await response.json();
        return body;
    } catch (error) {
        throw new Error(error.message);
    }  
}

export async function fetchFolderData() {
    try {
        const response = await fetch('https://bootcamp-api.codeit.kr/api/sample/folder');
        if (!response.ok) {
            throw new Error('정보를 불러오는데 실패했습니다.');
        }
        const body = await response.json();
        return body;
    } catch (error) {
        throw new Error(error.message);
    }  
}


