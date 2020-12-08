import React from 'react'
import NavBar from '../Components/Navbar'
import UserCard from '../Components/UserCard'

const Profile = () => {
    return (
        <>
            <NavBar page='profile' />
            <UserCard userInfo={{
                avatar: 'E:/programming/Java/SecondYear/SnakeGame/src/resources/apple.png',
                login: 'fop@t@',
                first_name: 'Fopt',
                last_name: 'FuPT'
            }} />
        </>
    )
}

export default Profile