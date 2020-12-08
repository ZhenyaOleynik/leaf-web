import React from 'react'
import '../../../css/login-register-form.css'
import { handleLogin } from '../../../js/login-register-form-handlers'

const LoginForm = () => {

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