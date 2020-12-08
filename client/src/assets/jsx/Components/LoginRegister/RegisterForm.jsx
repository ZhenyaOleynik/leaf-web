import React from 'react'
import { handleRegister } from '../../../js/login-register-form-handlers'
import { useState, useEffect } from 'react'
import { validate } from '../../../js/form-validators/register-form-validator'

const RegisterForm = () => {

    const initialValues = {
        first_name: '',
        last_name: '',
        pass: ''
    }

    const [formValues, setFormValues] = useState(initialValues) // to check form fields
    const [formErrors, setFormErrors] = useState({}) // to check form errors
    const [isSubmiting, setIsSubmiting] = useState(false) // to check if form can be submited

    const submitForm = () => handleRegister()

    const handleChange = e => {
        const { name, value } = e.target
        console.log("name:" + name + "\nval: " + value)
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = e => {
        setFormErrors(validate(formValues))
        setIsSubmiting(true)
    }

    useEffect(() => {
        console.log(formErrors)
        if (formErrors.length === 0 && isSubmiting)
            submitForm()
        else
            console.log(formErrors)
    }, [formErrors])

    return (
        <>
            <label htmlFor="first_name">first name</label>
            <input type="text" id="first_name" onChange={handleChange} />
            <label htmlFor="last_name">last name</label>
            <input type="text" id="last_name" onChange={handleChange} />
            <label htmlFor="username">login</label>
            <input type="text" id="username" />
            <label htmlFor="password">password</label>
            <input type="password" id="pass" onChange={handleChange} />
            {/* <label htmlFor="pass-confirm">confirm password</label>
            <input type="password" id="pass-confirm" /> */}
            <button type="button" className="submit" onClick={handleRegister}>Submit</button>
        </>
    )
}

export default RegisterForm