import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import '../../css/navbar.css'


const styles = {
    backgroundColor: '#1b283b',
    alignContent: 'right'
}

const NavBar = () => {
    return (
        <>
            <Navbar style={{backgroundColor: styles.backgroundColor}} expand="lg" variant={'dark'}>
                <Navbar.Brand href="#home" style={{paddingRight: 30}}>{'<LEAF>'}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link href="#home">Лента</Nav.Link>
                        <Nav.Link href="#link">Все статьи</Nav.Link>
                        <Nav.Link href="#link">Случайна статья</Nav.Link>
                        <Nav.Link href="#link">Мой профиль</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};


export default NavBar