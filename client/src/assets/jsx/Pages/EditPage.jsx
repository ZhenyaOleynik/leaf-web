import { useState, useEffect } from "react";
import Axios from "axios"
import EditForm from "../Components/EditForm"
import { serverURL } from "../../../config";

const { default: NavBar } = require("../Components/Navbar")


const EditPage = () => {

    const [user, setUser] = useState({})

    useEffect(() => {
        Axios.get(serverURL + '/api/users/getCurrentUser')
            .then(res => setUser(res.data[0]))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <NavBar />
            <EditForm oldData={user} />
        </>
    )
}

export default EditPage