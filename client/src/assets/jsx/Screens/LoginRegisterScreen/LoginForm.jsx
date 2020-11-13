import React from 'react'
import '../../../css/login-register-form.css'


const LoginForm = () => {
    return (
        <React.Fragment>
            <label htmlFor={"username"}>USERNAME</label>
            <input type="text" id="username" />
            <label htmlFor={"password"}>PASSWORD</label>
            <input type="password" id="password" />
            <input type="submit" value="submit" className="submit" />
        </React.Fragment>
    )
}

export default LoginForm