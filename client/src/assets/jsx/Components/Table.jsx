import { Button, Table, Typography } from "antd"
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import Column from "antd/lib/table/Column"
import Axios from "axios"
import { createContext, useState } from "react"
import { useEffect } from 'react'
import { serverURL } from "../../../config"
import EditForm from "./EditForm"

const { Title } = Typography

const AllUsersTable = () => {

    const [datasource, setDatasource] = useState([])
    const [mounted, setMounted] = useState(false)
    const [userType, setUserType] = useState('user')
    const [data, setData] = useState({})
    const [isEditOpen, setIsEditOpen] = useState(false)

    if (!mounted) {
        Axios.get(serverURL + '/api/users/getCurrentUser')
            .then(res => setUserType(res.data[0].title))
            .catch(err => console.log(err))

        Axios.get(serverURL + '/api/users/getAll')
            .then(res => {
                console.log(res.data)
                setDatasource(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    const deleteUser = id => {
        Axios.delete(serverURL + `/api/users/delete/${id}`,
            { withCredentials: true },
            { id })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        window.location.reload()
    }

    const openEdit = record => {
        setData(record)
        setIsEditOpen(true)
    }

    return (
        <>
            {
                !isEditOpen ?
                    <>
                        <Link to='/add'><PlusOutlined key='add' /><Title level={3}>Add new user</Title></Link>
                        <Table dataSource={datasource}>
                            <Column title='ID' dataIndex='id' key='id' />
                            <Column title='First name' dataIndex='first_name' key='first_name' />
                            <Column title='Last name' dataIndex='last_name' key='last_name' />
                            <Column title='Login' dataIndex='login' key='login' />
                            {
                                userType === 'admin' ?
                                    <>
                                        <Column
                                            title=''
                                            key='delete'
                                            render={(record) => (
                                                <span>
                                                    <Button onClick={(e) => deleteUser(record.id)}>
                                                        <DeleteOutlined />
                                                    </Button>
                                                    <Button onClick={(e) => openEdit(record)}>
                                                        <EditOutlined key='edit' />
                                                    </Button>
                                                </span>
                                            )}
                                        />
                                    </>
                                    : <> </>
                            }
                        </Table>
                    </>
                    : <>
                        <EditForm oldData={data} returnTo='/table' />
                    </>

            }
        </>
    )

}

export default AllUsersTable