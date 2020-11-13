import React, { useState } from 'react'
import '../../../css/login-register-form.css'
import { useSpring, animated } from 'react-spring'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

const LoginRegisterForm = () => {

    const [regFormStatus, setRegFormStatus] = useState(false)
    const loginProps = useSpring({
        left: regFormStatus ? -500 : 0
    })
    const regProps = useSpring({
        left: regFormStatus ? 0 : 500
    })
    const loginBtnProps = useSpring({
        borderBottom: regFormStatus ?
            'solid 0px transparent' :
            'solid 2px #1059FF'
    })
    const regBtnProps = useSpring({
        borderBottom: regFormStatus ?
            'solid 2px #1059FF' :
            'solid 0px transparent'
    })

    const regBtnClicked = () => setRegFormStatus(true)
    const loginBtnClicked = () => setRegFormStatus(false)

    return (
        <div className="login-register-wrapper">
            <div className="nav-buttons">
                <animated.button
                    onClick={loginBtnClicked}
                    id='login-btn'
                    style={loginBtnProps}
                >
                    Login
                </animated.button>
                <animated.button
                    onClick={regBtnClicked}
                    id='reg-btn'
                    style={regBtnProps}
                >
                    Register
                </animated.button>
            </div>
            <div className="form-group">
                <animated.form action='' id='login-form' style={loginProps}>
                    <LoginForm />
                </animated.form>
                <animated.form action='' id='register-form' style={regProps}>
                    <RegisterForm />
                </animated.form>
                <animated.div className='forgot-panel' style={loginProps}>
                    <a href='#'>Forgot your password ?</a>
                </animated.div>
            </div>
        </div>
    )

}

export default LoginRegisterForm