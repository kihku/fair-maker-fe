const serverUrl = import.meta.env.VITE_SERVER_URL;

function objToParamString(params){
    console.log(params);
    let result = "";
    for (const [key, value] of Object.entries(params)){
        if (value){
            console.log(value, result ? "&" : "" + `${key}=${value}`)
            result += ((result ? "&" : "") + `${key}=${value}`);
        }
    }
    return result;
}


export async function send_request({method = "GET", url="", headers={}, params={}, body=undefined, token=undefined} = {}){
    const searchParams = objToParamString(params);
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