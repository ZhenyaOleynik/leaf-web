import React from 'react'
import { Skeleton, Switch, Card, Avatar } from 'antd'
import { EditOutlined, LogoutOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { serverURL } from '../../../config'

const { Meta } = Card

const UserCard = ({ userInfo }) => {

    const handleLogout = async e => {
        await Axios.get(serverURL + '/api/users/logout')
            .then(res => console.log(res))
            .catch(err => console.log(err))

        window.location.href = '/'
    }

    return (
        <>
            <Card
                style={{ width: 400, marginTop: 16 }}
                actions={[
                    <Link to='/edit'><EditOutlined key='edit' /></Link>,
                    <LogoutOutlined key='logout' onClick={handleLogout} />
                ]}
                cover={
                    <img
                        style={{ height: 500 }}
                        alt=''
                        src={serverURL + `/${userInfo.avatar}`}
                    />
                }
            >

                <Meta
                    // avatar={
                    //     <Avatar src={userInfo.avatar} />
                    // }
                    title={userInfo.login}
                    description={userInfo.first_name + ' ' + userInfo.last_name}
                />
            </Card>
        </>
    )

}

export default UserCard