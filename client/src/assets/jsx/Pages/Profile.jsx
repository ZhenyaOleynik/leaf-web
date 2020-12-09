import Axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import NavBar from '../Components/Navbar'
import UserCard from '../Components/UserCard'

const Profile = () => {

    const [userInfo, setUserInfo] = useState({})
    // const [mounted, setMounted] = useState(false)

    // console.log(1)

    // if (!mounted) {

    // }

    // useEffect(() => setMounted(true), [])

    useEffect(() => {
        console.log(2)
        Axios.get('http://localhost:5000/api/users/getCurrentUser')
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