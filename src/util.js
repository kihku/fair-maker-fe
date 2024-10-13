export async function send_request(method, url, headers, body){
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