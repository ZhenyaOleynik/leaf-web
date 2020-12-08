
import LoginRegisterForm from "../Components/LoginRegister/LoginRegisterForm"
import NavBar from "../Components/Navbar"


const LoginRegisterScreen = () => {
    return (
        <>
            <NavBar page='login/register' />
            <LoginRegisterForm />
        </>
    )
}

export default LoginRegisterScreen
