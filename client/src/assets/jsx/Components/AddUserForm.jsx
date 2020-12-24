import React from 'react'
import Axios from 'axios'
import { serverURL } from '../../../config'
import { Form, Input, Button, Typography } from 'antd'

import '../../css/antd-form.css'

const { Title } = Typography

const AddUserForm = () => {

    const onFinish = async values => {

        await Axios.post(serverURL + '/api/auth/register', {
            ...values
        })
            .then(res => console.log(res.data))
            .catch(err => console.log('post add error: ' + err))


        window.location.href = '/table'
    }

    return (
        <div className={'antd-container'}>
            <Title level={2}>Add new user</Title>
            <Form
                name='Edit'
                onFinish={onFinish}
                onFinishFailed={err => console.log('Failed: ' + err)}
            >
                <Form.Item
                    label='Login'
                    name='login'
                    rules={[]}

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='First_name'
                    name='first_name'
                    rules={[]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Last_name'
                    name='last_name'
                    rules={[]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='password'
                    rules={[]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddUserForm