import Axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { serverURL } from '../../../config'
import NavBar from '../Components/Navbar'
import UserCard from '../Components/UserCard'

const Profile = () => {

    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        Axios.get(serverURL + '/api/users/getCurrentUser')
            .then(res => {
                setUserInfo(res.data[0])
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <>
            <NavBar page='profile' />
            <UserCard userInfo={{
                avatar: userInfo.photo,
                login: userInfo.login,
                first_name: userInfo.first_name,
                last_name: userInfo.last_name
            }} />
        </>
    )
}

export default Profile