export async function send_request({method = "GET", url="", headers={}, params={}, body=undefined, token=undefined} = {}){
    const searchParams = new URLSearchParams({...params}).toString();
    url = url + (searchParams ? "?" : "") + searchParams;
    const result = await fetch(
        "http://192.168.31.115:8001"+url,
        {
            headers: {
                "Content-Type": "application/json",
                ...headers,
                ...((token) && {"Authorization": `Bearer ${token}`})

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