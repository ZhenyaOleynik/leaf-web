import React, { useState } from 'react';
import '../../css/navbar.css'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import 'antd/dist/antd.css'


const styles = {
    backgroundColor: '#1b283b',
    alignContent: 'right'
}

const NavBar = () => {

    let [current, setCurrent] = useState('profile')

    const handleClick = e => setCurrent(e.key)

    return (
        <>
            <Menu onClick={handleClick} selectedKeys={current} mode='horizontal' theme='dark'>
                <Menu.Item key='profile'>
                    {/* <Link to='/'>Your profile</Link> */}
                    <a href="#">Your profile</a>
                </Menu.Item>
                <Menu.Item key='all_users'>
                    {/* <Link to='/'>All Users</Link> */}
                    <a href="#">All Users</a>
                </Menu.Item>
            </Menu>
        </>
    );
};


export default NavBar