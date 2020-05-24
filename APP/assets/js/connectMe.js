async function sendReq(url, data) {
    const responce = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return await responce.text();
}

async function getReq(url) {
    let token = JSON.parse(sessionStorage.getItem('auth-token'));
    let headers = new Headers();
    headers.append('auth-token', token);
    const responce = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: headers
    });
    return JSON.parse(await responce.text());
}

async function sendPOST(url, data) {
    let token = JSON.parse(sessionStorage.getItem('auth-token'));
    let headers = new Headers();
    headers.append('auth-token', token);
    headers.append('Content-Type', 'application/json');
    console.log(JSON.stringify(data));
    const responce = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    console.log(responce.status);
    return await responce.text();
}