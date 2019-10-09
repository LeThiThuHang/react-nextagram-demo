import React from 'react';
import axios from 'axios';
//import Bootstrap 
import 'bootstrap/dist/css/bootstrap.css';
//import styled components
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';

import ContainerImage from '../Container/ContainerImage.js';
import Loading from '../Components/Loading.js'

import './Pages.css'

const Profile = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  font-family: 'Underdog', cursive;

  .img {
    background-color: blue;
    height: 70%
  }
`
const UserContainer = styled.div`
 
`



class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [], // store user
      isLoading: true

    }
  }

  // calling the axios inside componentDidmount and get all users images inside the state
  componentDidMount() {
    axios.get('https://insta.nextacademy.com/api/v1/users')
      .then(res => {
        this.setState({
          users: res.data,// res.data is an array contains obj, each obj contains infor abut user regarding id, profileImage, username
          isLoading: false
        });
      })
  }

  render() {
    const { users, isLoading } = this.state
    /* const users = this.state.users 
    const isLoading = this.state.isLoading */

    if (isLoading) {
      return <Loading />
    }

    return (
      <div className=' body_page container-fluid'>
        {
          users.map((user, index) => {
            return (
              <UserContainer>
                <div key={index} className='row user_container'> 
                  <div className='col-12 col-sm-3 col-md-3 col-lg-3  d-flex flex-column p-3' key={user.id}>
                    <Profile>
                      <NavLink  /* className='p-2 text-center' */ to={`/users/${user.id}`}><p>{user.username}</p></NavLink>
                      <img style={{ 'width': '100%' }} className='rounded-circle' src={user.profileImage} />
                    </Profile>
                  </div>
                  <div className='col-12 col-sm-9 col-md-9 col-lg-9 p-2 d-flex flex-wrap justify-content-start'>
                    <ContainerImage id={user.id} />
                  </div>
                </div>
              </UserContainer>

            )
          })
        }
      </div>
    )
  }
}

export default HomePage;