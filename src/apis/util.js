export async function send_request({method = "GET", url="", headers={}, params={}, body=undefined, token=undefined} = {}){
    const searchParams = new URLSearchParams({...params}).toString();
    console.log("Token passed to send_request: " + token);
    url = url + (searchParams ? "?" : "") + searchParams;
    const result = await fetch(
        "http://192.168.31.115:8001"+url,
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