import { Button, Table } from "antd"
import { DeleteOutlined } from '@ant-design/icons'
import Column from "antd/lib/table/Column"
import Axios from "axios"
import { createContext, useState } from "react"
import { useEffect } from 'react'

const AllUsersTable = () => {

    const [datasource, setDatasource] = useState([])
    const [mounted, setMounted] = useState(false)
    const [userType, setUserType] = useState('user')

    if (!mounted) {
        Axios.get('http://localhost:5000/api/users/getCurrentUser')
            .then(res => setUserType(res.data[0].title))
            .catch(err => console.log(err))

        Axios.get('http://localhost:5000/api/users/getAll')
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
        Axios.delete(`http://localhost:5000/api/users/delete/${id}`,
            { withCredentials: true },
            { id })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        window.location.reload()
    }

    return (
        <Table dataSource={datasource}>
            <Column title='ID' dataIndex='id' key='id' />
            <Column title='First name' dataIndex='first_name' key='first_name' />
            <Column title='Last name' dataIndex='last_name' key='last_name' />
            <Column title='Login' dataIndex='login' key='login' />
            {userType === 'admin' ?
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
                : <></>}
        </Table>
    )

}

export default AllUsersTable