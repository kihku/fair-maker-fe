const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function send_request({method = "GET", url="", headers={}, params={}, body=undefined, token=undefined} = {}){
    const searchParams = new URLSearchParams({...params}).toString();
    url = url + (searchParams ? "?" : "") + searchParams;
    const result = await fetch(
        serverUrl+url,
        {
            headers: {
                "Content-Type": "application/json",
                ...((token) && {"Authorization": `Bearer ${token}`}),
                ...headers,
            },
            method: method,
            credentials: 'include',
            ...((body) && {body: JSON.stringify(body)})
        }
    )
    if (!result.ok){
        throw new Error(`Response status: ${result.status}` );
    }

    return await result.json()
}