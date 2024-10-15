export async function send_request({method = "GET", url="", headers={}, params={}, body={}} = {}){
    const searchParams = new URLSearchParams({...params}).toString();
    url = url + (searchParams ? "?" : "") + searchParams;
    const result = await fetch(
        "https://greenify.host"+url,
        {
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            method: method,
            body: JSON.stringify(body),
        }
    )
    if (!result.ok){
        throw new Error(`Response status: ${result.status}` );
    }

    return await result.json()
}