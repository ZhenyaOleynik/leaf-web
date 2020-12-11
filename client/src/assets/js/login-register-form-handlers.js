import Axios from 'axios'
import { serverURL } from '../../config'

Axios.defaults.withCredentials = true

export const handleRegister = async e => {

    const first_name = document.getElementById('first_name').value
    const last_name = document.getElementById('last_name').value
    const login = document.getElementById('username').value
    const password = document.getElementById('pass').value

    await Axios.post(serverURL + '/api/auth/register', {
        first_name, last_name, login, password
    })
        .then(res => console.log(res.data))
        .catch(err => console.log('post register error: ' + err))


    window.location.reload()
}

export const handleLogin = async e => {

    const login = document.getElementById('login').value
    const password = document.getElementById('password').value

    console.log(login)
    console.log(password)

    await Axios.post(serverURL + '/api/auth/login', { login, password })
        .then(res => console.log(res.data))
        .catch(err => console.log('post error: ' + err))

    window.location.href = '../profile'
}
