import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      
      isValid: true,
      isValidPassword: true,
      
      showPasswordWarning: false
      
    };
    this.timer = null;
  }
  
   

    handleAPI = () => {
          //after click on the Sign Up button, do the API call
          axios({
           method: 'POST', 
           url: 'https://insta.nextacademy.com/api/v1/users/',
           data: {
             username: this.state.username,
             email: this.state.email,
             password: this.state.password
           }
         })
           .then(response => {
             console.log(response)
           })
           .catch(error => {
             console.error(error.response)
           })
    }

    handleSubmit = (event) => {
      event.preventDefault();

      //if the password recheck matches, set state

      if ( this.state.password === this.state.confirmPassword) {
        this.setState({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          
          isValid: true,
          isValidPassword: true,

          showPasswordWarning: false
        })
        this.handleAPI();
      } else {

        //if the password recheck is not matching, displaying the paragraph saying that, clear the input for double check password
        this.setState({
          confirmPassword: '',
          showPasswordWarning: true
        })

      }

      

    }

    handleInput = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })

    }

 

    // USERNAME: for handleUsername input: set state and delay for check username function
    handelUsernameInput = e => {     
      clearTimeout(this.timer)

      const { value } = e.target
      
      this.setState({
        username: value
      })

      this.timer = setTimeout ( () => {
        this.checkUsername(value)
      }, 3000) 

    }

    // USERNAME: for checking username by calling API
    checkUsername = username => {
      console.log('check username by calling API')
      axios.get(`https://insta.nextacademy.com/api/v1/users/check_name?username=${username}`)
        .then(result => {
          this.setState({
            isValid: result.data.valid
          })
      })
    
    }
    
    // USERNAME: for setting the prop to appear in the form 
    getInputProp = () => {
      const { isValid, username } = this.state
      if(username.length > 3) {
        if(isValid) {
          return 'isvalid'
        } else {
          return 'isinvalid'
        }
      } else {
        return ''
      }
     }

     // PASSWORD: handle passowrd input and delay the password check after the users stop for 3s
     handlePasswordInput = (e) => {
       console.log('handle password input')
       const {value} = e.target
       clearTimeout(this.timer)

       this.setState({
         password: value
       })

       this.timer = setTimeout( () => {
         this.checkPassword()
       }, 3000)

     }

     // PASSWORD: for checking password and return the state valid or not
     checkPassword = () => {
       if (this.state.password.length >= 6) {
         this.setState ({
          isValidPassword: true,
         })
       }
     }

     //PASSWORD: return the props in render 
     getPasswordProp = () => {  
       const {isValidPassword, password} = this.state
       if (isValidPassword) {
         if(password.length >= 6) {
           return 'isvalid'
         } else if (password.length >= 1) {
            return 'isinvalid'
           } else return ''          
         }
     }


     //clear form after click on the close button / cancel button
    clearForm = () => {
       this.setState({
        username: '',
        email: '',
        password: '',
        isValid: true
       })
     }


    
    render() {
      const {showPasswordWarning} = this.state
      const usernameCheck = this.getInputProp()
      const passwordCheck = this.getPasswordProp()
      
      
      
        return (
            <>
              <Modal show={this.props.show} >
                
                <div onClick = {this.clearForm}>
                <Modal.Header closeButton onClick = {this.props.closeForm} >
                  <div>
                    <h1>Sign Up</h1>
                  <h5>
                  {
                    (showPasswordWarning)
                    ? 'Password does not match'
                    : ''
                  }
                  </h5>
                  </div>
                </Modal.Header>
                </div>
                <Modal.Body>
                  
                

                    
               
                {/*inside here we need to put the form*/}
                    <Form onSubmit = {this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter username, min 3 characters, max 20 characters" name ='username' value = {this.state.username} onChange = {this.handelUsernameInput}/>
                        <Form.Control.Feedback style = {{color: 'red'}} type = {usernameCheck}>
                          {
                            usernameCheck === 'isvalid' 
                            ? <p style = {{color: 'green'}}>OK</p>
                            : usernameCheck === 'isinvalid'
                            ? <p style = {{color: 'red'}}>Choose another username</p>
                            :''
                            
                          }
                          </Form.Control.Feedback>
                          

                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name ='email' value = {this.state.email} onChange = {this.handleInput} />
                        <Form.Control.Feedback style = {{color: 'red'}} type = 'isinvalid'></Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password, between 6 and 50 characters" name ='password' value = {this.state.password} onChange = {this.handlePasswordInput}/>
                        <Form.Control.Feedback style = {{color: 'red'}} type= {passwordCheck}>
                          {
                            passwordCheck === 'isvalid' 
                            ? <p style = {{color: 'green'}}>OK</p>
                            : passwordCheck === 'isinvalid'
                            ? <p style = {{color: 'red'}}>Password must be minimum 6 characters</p>
                            : ''
                          }
                          </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirmed Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name = 'confirmPassword' value = {this.state.confirmPassword} onChange = {this.handleInput}/>
                    </Form.Group>

                    </Form>               
                {/*inside here we need to put the form*/}

                Already a member ? <Button onClick = {this.props.toggleForm} >Log in here</Button>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={this.handleSubmit} 
                          disabled = { !this.state.username || !this.state.email || !this.state.password || !this.state.confirmPassword }>
                    Sign Up
                  </Button>

                  <div onClick = {this.clearForm}>

                  <Button variant="secondary" onClick = {this.props.closeForm} >
                    Cancel 
                  </Button>
                  </div>

                </Modal.Footer>
              </Modal>
            </>
          )
        }
    
  }


export default SignUp