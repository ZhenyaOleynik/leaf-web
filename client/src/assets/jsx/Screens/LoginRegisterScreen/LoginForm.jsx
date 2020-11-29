import React from 'react'
import '../../../css/login-register-form.css'
import Axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'


const LoginForm = () => {

    Axios.defaults.withCredentials = true

    const handleLogin = async (e) => {


        const login = document.getElementById('login').value
        const password = document.getElementById('password').value

        console.log(login)
        console.log(password)

        await Axios.post('http://localhost:5000/login', { login, password })
            .then(res => console.log(res.data))
            .catch(err => console.log('post error: ' + err))

        Axios.get('http://localhost:5000/auth')
            .then(res => console.log(res.data))
            .catch(err => console.log('get error: ' + err))

    }

    return (
        <>
            <label htmlFor={"login"}>LOGIN</label>
            <input type="text" id="login" />
            <label htmlFor={"password"}>PASSWORD</label>
            <input type="password" id="password" />
            <button type="button" className="submit" onClick={handleLogin}>Submit</button>
        </>
    )
}

export default LoginForm