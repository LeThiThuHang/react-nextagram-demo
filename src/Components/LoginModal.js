import React from 'react';

import { Button } from 'react-bootstrap';
//import styled components
import styled from 'styled-components';

import LogIn from '../Container/LogIn';
import SignUp from '../Container/SignUp';
import LogOut from '../Container/LogOut';

const ButtonX = styled(Button) ` 
    margin-left: 12px;
    background-color: #464159;
    border: 1px solid #464159;
    
`


class LoginModal extends React.Component {

    state = {
        showModal: false,
        isLoginForm: false, 

        showLogOutModal: false
    }


    // this is to control the buttons Sign In and Log In 

    showModal = () => {
        this.setState({
            showModal: !this.state.showModal, 
            isLoginForm: true
        })
    }

    showModalSignUp = () => {
        this.setState({
            showModal: !this.state.showModal, 
            isLoginForm: false

        })
    }

     // this is the functions that passing to children so they can control states
    closeForm = () => {
        this.setState({
            showModal: !this.state.showModal,
        })
    }

    toggleForm = () => {
        this.setState({
            isLoginForm: !this.state.isLoginForm
        })
    }

    //show Logout modal when click on the button Log out
    showLogOutModal = () => {
        this.setState({
            showLogOutModal: !this.state.showLogOutModal
        })
        
    }

    //after submitting the Logout button, set state as in beginning only if the JWT is empty
    // with log out, should remove item. So basically, we only need to remove item when the users click on log out
    closeLogOut = () => {
            this.setState({
                showModal: false,
                isLoginForm: false,    
                showLogOutModal: false
            })
            localStorage.removeItem('JWT')
        }


    render() {      
        if (this.props.isLoginVariable === true ) { // ony show the button log out
            return (
                <div>
                <ButtonX onClick = {this.showLogOutModal}>Log Out</ButtonX>  
                <LogOut show = {this.state.showLogOutModal} closeLogOut = {this.closeLogOut} logOut = {this.props.logOut}/>             
                </div>
            )
        } else {
            return (
                <div>
                {/* //to avoid the faults of same name when do styled buttons */}
                <ButtonX onClick={this.showModal}>Log In</ButtonX>
                <ButtonX onClick={this.showModalSignUp} >Sign Up</ButtonX>


{/*                 // this is to control the children: by either passing the variables 
                or passing the function so the children can manipulate the states */}
                <LogIn show = {this.state.showModal === true && this.state.isLoginForm === true ? true : false} closeForm = {this.closeForm} toggleForm = {this.toggleForm} /* userLogin = {this.userLogin} */  isLogin = {this.props.isLogin} isLoginVariable = {this.props.isLoginVariable}/>
                <SignUp show = {this.state.showModal === true && this.state.isLoginForm === false ? true : false} closeForm = {this.closeForm} toggleForm = {this.toggleForm}/>
                
                </div>
            )

        }
             
    }
        
}     



export default LoginModal