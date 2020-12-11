import React, { useState } from 'react';
import '../../css/navbar.css'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd'
import 'antd/dist/antd.css'
import Axios from 'axios'
import { useEffect } from 'react';
import { serverURL } from '../../../config';

Axios.defaults.withCredentials = true

const NavBar = ({ page }) => {

    const [isAuth, setIsAuth] = useState(false)
    const [current, setCurrent] = useState('profile')
    const [mounted, setMounted] = useState(false)

    if (!mounted) {
        Axios.get(serverURL + '/api/auth/isAuth')
            .then(res => setIsAuth(res.data.auth))
            .catch(err => false)
    }

    useEffect(() => {
        setMounted(true)
        setCurrent(page)
    }, [])

    const handleClick = e => setCurrent(e.key)

    return (
        <>
            <Menu onClick={handleClick} selectedKeys={current} mode='horizontal' theme='dark'>
                {
                    isAuth ?
                        <>
                            <Menu.Item key='profile'>
                                <NavLink to='/profile'>Your Profile</NavLink>
                            </Menu.Item>
                        </>
                        :
                        <>
                            <Menu.Item key='login/register'>
                                <NavLink to='/auth'>Login/Register</NavLink>
                            </Menu.Item>
                        </>
                }
                <Menu.Item key='table'>
                    <NavLink to='/table'>All Users</NavLink>
                </Menu.Item>
            </Menu>
        </>
    );
};


export default NavBar