import React from 'react'
import { useState } from "react"
import {
    Upload,
    message,
    Form,
    Input,
    Button,
    Image,
    Typography
} from "antd"
import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import { useRef } from "react"
import Dropzone from 'react-dropzone'
import Axios from "axios"
import { serverURL } from "../../../config"

import '../../css/antd-form.css'

const { Title } = Typography

const EditForm = ({ oldData, returnTo }) => {

    const [image, setImage] = useState('')

    const ref = useRef(null)

    useEffect(() => ref.current.setFieldsValue({
        login: oldData.login,
        first_name: oldData.first_name,
        last_name: oldData.last_name,
        password: oldData.password
    }), [])

    const onFinish = values => {
        console.log(values)
        const photo = image || oldData.photo
        Axios.put(serverURL + `/api/users/update/${oldData.id}`, { ...values, photo })
        window.location.href = returnTo
    }

    const onSubmitImg = acceptedFiles => {
        let formData = new FormData()

        const config = {
            headers: {
                'content-type': 'multipart/form/data'
            }
        }

        const file = acceptedFiles[0]

        formData.append('file', file)

        Axios.post(serverURL + '/api/files/uploadImage', formData, config)
            .then(res => {
                if (res.data.success) {
                    setImage(res.data.url)
                }
            })
    }


    return (
        <div className={'antd-container'}>
            <Title level={2}>Edit user data</Title>
            <Title level={4}>Affect only fields you want to change</Title>
            <Form
                name='Edit'
                ref={ref}
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
                    label='First name'
                    name='first_name'
                    rules={[]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Last name'
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
                <Form.Item style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        image ? null : (
                            <Dropzone onDrop={(acceptedFiles) => onSubmitImg(acceptedFiles)}>
                                {({ getRootProps, getInputProps }) => (
                                    <section style={{ marginTop: '1rem' }}>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <Button type='primary'>
                                                <UploadOutlined /> Click to upload image
                                            </Button>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        image ? <Image style={{ maxWidth: '200px' }} src={`http://localhost:5000/${image}`} alt='avatar' />
                            : null
                    }
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )

}

export default EditForm