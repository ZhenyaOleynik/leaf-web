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

const { Title } = Typography

// edit-form container style
const container = {
    width: '500px',
    height: '560px',
    box_sizing: 'border-box',
    padding: '20px',
    justify: 'center',
    justify_content: 'center',
    marginTop: '5rem'

}

const EditForm = ({ oldData }) => {

    const [image, setImage] = useState('')

    const onFinish = values => {
        Axios.put(serverURL + '/api/users/updateCurrent', {...values, photo: (image === '' ? oldData.image : image)})
            .then(res => window.location.href = '/profile')
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
        <div style={container}>
            <Title level={2}>Edit your data</Title>
            <Title level={4}>Fill only fields you want to change</Title>
            <Form
                name='Edit'
                initialValues = {{
                    login: oldData.login,
                    first_name: oldData.first_name,
                    last_name: oldData.last_name,
                    password: oldData.password
                }}
                onFinish={onFinish}
                onFinishFailed={err => console.log('Failed: ' + err)}
            >
                <Form.Item
                    label='login'
                    name='login'
                    rules={[]}
                >
                    <Input placeholder={oldData.login} />
                </Form.Item>
                <Form.Item
                    label='first_name'
                    name='first_name'
                    rules={[]}
                >
                    <Input placeholder={oldData.first_name} />
                </Form.Item>
                <Form.Item
                    label='last_name'
                    name='last_name'
                    rules={[]}
                >
                    <Input placeholder={oldData.last_name} />
                </Form.Item>
                <Form.Item
                    label='password'
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