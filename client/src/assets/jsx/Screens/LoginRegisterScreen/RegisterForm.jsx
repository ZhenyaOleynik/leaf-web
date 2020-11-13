import React from 'react'
import '../../../css/login-register-form.css'

const RegisterForm = () => {
    return (
        <React.Fragment>
            <label htmlFor="fullname">full name</label>
            <input type="text" id="fullname" />
            <label htmlFor="email">email</label>
            <input type="email" id="email" />
            <label htmlFor="password">password</label>
            <input type="password" id="password" />
            <label htmlFor="pass-confirm">confirm password</label>
            <input type="password" id="pass-confirm" />
            <input type="submit" value="submit" className="submit" />
        </React.Fragment>
    )
}

export default RegisterForm