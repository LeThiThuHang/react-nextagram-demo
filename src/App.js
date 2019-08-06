import React from 'react';
import { Route} from 'react-router-dom'
//import Bootstrap 
import 'bootstrap/dist/css/bootstrap.css'
//import toast
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


 
//import pages
import HomePage from './Pages/HomePage.js'
import UserProfilePage from './Pages/UserProfilePage.js'
import MyProfilePage from './Pages/MyProfilePage'
//import Navbar
import Navigation from './Components/Navbar.js'
import UploadPage from './Pages/UploadPage.js';



class App extends React.Component {
  state = {
    isLogin: false,
    JWT: ''
  }

  //passing this funtion to Login to receive the state of true/ false for isLogin state, logInInfor is the response.data from Login component
  isLogin = (logInInfor) => {   
    this.setState({
      isLogin: logInInfor.status === 'success' ? true : false,
      JWT: logInInfor.auth_token
    })   
  }


  // update the isLogin when logout is clicked 
  logOut = () => {
    this.setState({
      isLogin: false

    })
  }



  render () {

    return ( 
      
      <>

        {/* This is to pass down the isLogin function all the way down to LogIn components */}
        {/* This is to pass down the isLogin state as variable to sub-components */}
        <Navigation isLogin = {this.isLogin} isLoginVariable = {this.state.isLogin} logOut = {this.logOut}/> 
        
        <Route exact path = '/' component = {HomePage}></Route>
        <Route path = '/users/:id' component = {UserProfilePage}></Route>
        <Route exact path = '/profile' component = {MyProfilePage}></Route>
        

        <ToastContainer />

      </>
      
    )
  } 
}


export default App

