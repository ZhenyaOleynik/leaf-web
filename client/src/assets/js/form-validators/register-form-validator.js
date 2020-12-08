export const validate = values => {

    let errors = {}
    const name_regex = /^[a-zA-Z]+$/

    if (values.first_name) {
        if (!name_regex.test(values.first_name)) {
            errors.first_name = 'Can only contain letters'
        }
    }
    else {
        errors.first_name = 'Cannot be blank'
    }

    if (values.last_name) {
        if (!name_regex.test(values.lsat_name)) {
            errors.last_name = 'Can only contain letters'
        }
    }
    else {
        errors.first_name = 'Cannot be blank'
    }

    if (values.pass) {
        if (values.pass.length < 6) {
            errors.password = 'Password must be more than 4 characters'
        }
    }
    else {
        errors.password = 'Cannot be blank'
    }

    return errors

}