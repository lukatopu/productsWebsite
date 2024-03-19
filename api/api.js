export const logIn = async (username, password) => {
    return await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password
            // expiresInMins: 60, // optional
        })
    })
    .then(res => res.json())
    .then(data => {
        return data
    })
}

export const isAuthorized = async (token) => {
    return await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
            'Authorization': token, 
        }, 
    })
    .then(res => res.json())
    .then(data => {
        return data
    });
}

export const getProducts = async () => {
    return await fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        return data
    });
}
export const getSingleProduct = async(id) => {
    return await fetch (`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(data => {
        return data
    });
}

