import React from 'react';
import { Button, ButtonToolbar, Modal, Form } from 'react-bootstrap';
import axios from 'axios'
import { toast } from 'react-toastify';


class LogIn extends React.Component {
    state = {        
        username: '',
        password: '',
        notifyLogin: '', 

        // this one should be stored in the App
        /* isLogin: localStorage.getItem('JWT') ? true : false, */
       /*  isLogin: this.props.isLoginVariable */


    }

    handleInput = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    handleSubmit = (event) => {
      event.preventDefaul();   

    }

    logIn = () => {
      console.log('run log in function')
      axios({
        method: 'POST',
        url: 'https://insta.nextacademy.com/api/v1/login',
        data: {
          username: this.state.username,
          password: this.state.password 
        }
      })
      .then(response => {
        console.log(response.data.status)
        if (response.data.status === 'success') {

          localStorage.setItem('JWT', response.data.auth_token)
          this.setState({
            notifyLogin: true,      

          })
          this.props.isLogin(response.data)
          toast('You have log in succesfully')          
        } 

      })
      .catch( () => {
        this.setState({
          notifyLogin: false
        })
        toast('You have errors')  
      })
      }

      //clearfrom when click on cancel button
      clearForm = () => {
        this.setState({
          username: '',
          password: '',
          notifyLogin: '',
        })

      }


    
    render() {
    


        return (
            <> 
              <Modal show={this.props.show}>

                <div onClick = {this.clearForm}>
                <Modal.Header closeButton onClick ={this.props.closeForm} >                 
                  <Modal.Title>
                    <h1>Login</h1>
                    <h3>
                        {
                        this.state.notifyLogin === true 
                        ? 'Your login is success'
                        : this.state.notifyLogin === false
                        ? 'Your login is failed !'
                        : ''
                      }
                    </h3>
                  </Modal.Title>
                </Modal.Header>
                </div>

                <Modal.Body>
                    {/*inside here we need to put the button*/}
                    <ButtonToolbar>
                        <Button href="#">Sign In with Google</Button>
                    </ButtonToolbar>
                  {/*inside here we need to put the button*/}
                    
                </Modal.Body>
                {/*inside here we need to put the form*/}
                    <Form onSubmit = {this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="email" placeholder="Enter user name" value = {this.state.username} onChange ={this.handleInput} name = 'username' />
                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value = {this.state.password} onChange = {this.handleInput} name = 'password'/>
                    </Form.Group>

                    New Member ? <Button onClick = {this.props.toggleForm}>Sign up here</Button>

                    </Form>               
                {/*inside here we need to put the form*/}
                <Modal.Footer>
                  <Button variant="primary" disabled = {!this.state.username || !this.state.password} onClick = {this.logIn}>
                    Login
                  </Button>
                  <div onClick = {this.clearForm}>
                  <Button variant="secondary" onClick = {this.props.closeForm} >
                    Cancel
                  </Button>
                  </div>
                </Modal.Footer>
              </Modal>
            </>
          );
    }
}

export default LogIn

/*{
  "auth_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjUwNTU4NzUsImlhdCI6MTU2NDk2OTQ3NSwic3ViIjo1ODN9.WTL5SVdwaHD0grzO6AQ9v-2hkd2MTgK0ru0NtPY7zLs", 
  "message": "Successfully created a user and signed in.", 
  "status": "success", 
  "user": {
    "id": 583, 
    "profile_picture": "http://next-curriculum-instagram.s3.amazonaws.com/profile-placeholder.jpg", 
    "username": "hang123"
  }
}
*/