import { updateHTMLContent } from "./auth.js"
import { logIn } from "../api/api.js"
import { updateUsername } from './products.js'

const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const submitButton = document.querySelector('#submitButton')



submitButton.addEventListener('click', async (e) => {
    e.preventDefault()
    
    let data = await logIn(usernameInput.value, passwordInput.value)

    if(data.token) {
        localStorage.setItem('username', data.username)
        updateUsername()
        document.cookie = `token=${data.token}`
        updateHTMLContent()
    }
})


