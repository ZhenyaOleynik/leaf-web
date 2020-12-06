import { Button, Table } from "antd"
import { DeleteOutlined } from '@ant-design/icons'
import Column from "antd/lib/table/Column"
import Axios from "axios"
import { createContext, useState } from "react"
import { useEffect } from 'react'



export const AllUsersTable = () => {

    const [datasource, setDatasource] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:5000/api/users/getAll')
            .then(res => {
                console.log(res.data)
                setDatasource(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const deleteUser = id => {
        Axios.delete(`http://localhost:5000/api/users/delete/${id}`,
            { withCredentials: true },
            { id })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        window.location.reload(true)
    }

    const cols = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name'
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'first_name'
        },
        {
            title: 'Login',
            dataIndex: 'login',
            key: 'login'
        },

    ]
    return (
        <Table dataSource={datasource}>
            <Column title='ID' dataIndex='id' key='id' />
            <Column title='First name' dataIndex='first_name' key='first_name' />
            <Column title='Last name' dataIndex='last_name' key='last_name' />
            <Column title='Login' dataIndex='login' key='login' />
            <Column
                title=''
                key='delete'
                render={(record) => (
                    <span>
                        {
                            <Button onClick={(e) => deleteUser(record.id)}>
                                <DeleteOutlined />
                            </Button>
                        }
                    </span>
                )}
            />

        </Table>
    )

}
