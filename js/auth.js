import { isAuthorized } from "../api/api.js"

const authContainer = document.querySelector('#authContainer')
const productsContainer = document.querySelector('#productsContainer')

updateHTMLContent()

export async function updateHTMLContent() {
    const token = document.cookie.slice(6)
    let data = await isAuthorized(token)

    if(data.id) {
        authContainer.style.display = 'none'
        productsContainer.style.display = 'block'
    } else {
        authContainer.style.display = 'flex'
        productsContainer.style.display = 'none'
    }
}