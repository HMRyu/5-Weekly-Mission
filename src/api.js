export async function fetchUserData() {
    const response = await fetch('https://bootcamp-api.codeit.kr/api/sample/user');

    const body = await response.json();
    return body;
}

export async function fetchFolderData() {
    const response = await fetch('https://bootcamp-api.codeit.kr/api/sample/folder');
    
    const body = await response.json();
    return body;
}
