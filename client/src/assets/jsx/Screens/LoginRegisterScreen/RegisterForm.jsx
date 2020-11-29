import React from 'react'
import '../../../css/login-register-form.css'
import Axios from 'axios'

const RegisterForm = () => {

    const handleRegister = async e => {

        const first_name = document.getElementById('first_name').value
        const last_name = document.getElementById('last_name').value
        const login = document.getElementById('username').value
        const password = document.getElementById('pass').value

        await Axios.post('http://localhost:5000/register', {
            first_name, last_name, login, password
        })
            .then(res => console.log(res.data))
            .catch(err => console.log('post register error: ' + err))

    }

    return (
        <>
            <label htmlFor="first_name">first name</label>
            <input type="text" id="first_name" />
            <label htmlFor="last_name">last name</label>
            <input type="text" id="last_name" />
            <label htmlFor="login">login</label>
            <input type="text" id="username" />
            <label htmlFor="password">password</label>
            <input type="password" id="pass" />
            {/* <label htmlFor="pass-confirm">confirm password</label>
            <input type="password" id="pass-confirm" /> */}
            <button type="button" className="submit" onClick={handleRegister}>Submit</button>
        </>
    )
}

export default RegisterForm