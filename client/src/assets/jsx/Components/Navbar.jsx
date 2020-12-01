import React, { useState } from 'react';
import '../../css/navbar.css'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import 'antd/dist/antd.css'
import Axios from 'axios'
import { useEffect } from 'react';

Axios.defaults.withCredentials = true

const NavBar = () => {

    const [isAuth, setIsAuth] = useState(false)
    const [current, setCurrent] = useState('profile')

    useEffect(() => {
        Axios.get('http://localhost:5000/api/auth/isAuth')
            .then(res => setIsAuth(res.data.auth))
            .catch(err => false)
    }, [])

    useEffect(() => setCurrent(isAuth ? 'profile' : 'login/register'), [isAuth])

    const handleClick = e => setCurrent(e.key)

    return (
        <>
            <Menu onClick={handleClick} selectedKeys={current} mode='horizontal' theme='dark'>
                {
                    isAuth ?
                        <>
                            <Menu.Item key='profile'>
                                <a href="#">Your profile</a>
                            </Menu.Item>
                        </>
                        :
                        <>
                            <Menu.Item key='login/register'>
                                <a href="#">Login/Register</a>
                            </Menu.Item>
                        </>
                }
                <Menu.Item key='all_users'>
                    <a href="#">All Users</a>
                </Menu.Item>
            </Menu>
        </>
    );
};


export default NavBar