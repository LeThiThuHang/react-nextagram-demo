import React from 'react';
import axios from 'axios';
//import Bootstrap 
import 'bootstrap/dist/css/bootstrap.css';
//import styled components
import styled from 'styled-components';
import {Link} from 'react-router-dom';


import ContainerImage from '../Container/ContainerImage.js';
import Loading from '../Components/Loading.js'



class HomePage extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
          users: [], // store user
          isLoading: true
    
        }
      }
    
      // calling the axios inside componentDidmount and get all users images inside the state
      componentDidMount () {
        axios.get('https://insta.nextacademy.com/api/v1/users')
        .then(res => {
          this.setState({     
            users: res.data,// res.data is an array contains obj, each obj contains infor abut user regarding id, profileImage, username
            isLoading: false
          });
        })
      }
    
      render() {
        const {users, isLoading} = this.state
        /* const users = this.state.users 
        const isLoading = this.state.isLoading */
    
        if(isLoading) {
          return <Loading />
        }
        
        return (  
          <div className = 'container-fluid'>
            {                     
              users.map((user, index) => {
                return (                 
                  
                    <div key = {index} className = 'row border border-dark mb-1 bg-light'>  
                        <div className = 'col-12 col-sm-3 col-md-3 col-lg-3  d-flex flex-column p-3' key = {user.id}>
                             
                            <Link className = 'p-2 text-center' to = {`/users/${user.id}`}><h4>{user.username}</h4></Link>
                           
                            <img style = {{'width': '80%'}} className ='rounded-circle'  src = {user.profileImage}/>
                        </div>
                        <div className = 'col-12 col-sm-9 col-md-9 col-lg-9 p-2 d-flex flex-wrap justify-content-start'>
                            <ContainerImage id = {user.id}/>              
                        </div>                  
                    </div> 
                  
                )                        
              })
            }
          </div>
        )
      }
}

export default HomePage;