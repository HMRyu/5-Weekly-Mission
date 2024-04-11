export async function fetchUserData(id) {
    
    const response = await fetch(`https://bootcamp-api.codeit.kr/api/users/${id}`);

    const body = await response.json();
    return body;
}

export async function fetchFolderData() {
    const response = await fetch('https://bootcamp-api.codeit.kr/api/sample/folder');
    
    const body = await response.json();
    return body;
}

export async function fetchFolderList(id) {
    const response = await fetch(`https://bootcamp-api.codeit.kr/api/users/${id}/folders`);

    const body = await response.json();
    return body;
}

export async function fetchLinkList(id) {
    const response = await fetch(`https://bootcamp-api.codeit.kr/api/users/${id}/links`);

    const body = await response.json();
    return body;
}

export async function fetchLinkListByFolderId(folderId) {
    const response = await fetch(`https://bootcamp-api.codeit.kr/api/users/1/links?folderId=${folderId}`);

    const body = await response.json();
    return body;
}


