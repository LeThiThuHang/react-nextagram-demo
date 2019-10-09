import React from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import styled from 'styled-components';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.css'


const Navigation = (props) => {

    return (
     
            <Navbar bg="light" expand="lg" className="nav_bar_section">
                <Navbar.Brand href="/">
                    <img src="https://img.icons8.com/bubbles/50/000000/instagram-new.png" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <Link to = '/' className = "nav-link active">Home</Link> */}
                        <Link to='/users/1' className="nav-link active nav_bar_section"> User Profile</Link>
                        <Link to='/profile' className="nav-link active nav_bar_section">My Profile Page</Link>
                    </Nav>
                    <Nav>
                        {/* This is to pass down the isLogin function all the way down to LogIn components */}
                        <LoginModal isLogin={props.isLogin} isLoginVariable={props.isLoginVariable} logOut={props.logOut} />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

    )

}

export default Navigation