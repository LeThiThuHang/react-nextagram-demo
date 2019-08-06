import React from 'react';
import {Link} from 'react-router-dom';


import LoginModal from './LoginModal';

import { Navbar, Nav } from 'react-bootstrap';



const Navigation = (props) => {
    
    return (
        

        //this is new nav
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Nextagram</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="mr-auto">


            <Link to = '/' className = "nav-link active">Home</Link>
            <Link to = '/users/1' className="nav-link active"> User Profile</Link>
            <Link to = '/profile' className = "nav-link active">My Profile Page</Link>
            

            </Nav>

            <Nav>
                {/* This is to pass down the isLogin function all the way down to LogIn components */}
                <LoginModal isLogin = {props.isLogin} isLoginVariable = {props.isLoginVariable} logOut = {props.logOut} /> 
            </Nav>

        </Navbar.Collapse>
        </Navbar>
        
        //this is new nav

                                  
                        
 
    )

}

export default Navigation