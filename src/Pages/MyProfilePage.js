import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import Loading from '../Components/Loading'
import UploadPage from './UploadPage';

import { Redirect } from 'react-router'

class MyProfilePage extends React.Component {
    state = {
        isLoading: true,
        images: [], 
        profile: {}

    }

    componentDidMount () {
        //only call if log in 
        if (localStorage.getItem('JWT')) {
            this.APIcall();
        }
    }

    APIcall = () => {
        //get the profile name and ID and pass to the profile in state
        axios({
            url: 'https://insta.nextacademy.com/api/v1/users/me', 
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('JWT')}`
            }
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    profile: response.data // object that contains email, id, profile_picture, username
                })
            })
        

        //get the images to the pages from my own account and pass to the images in state
        axios({
                url: 'https://insta.nextacademy.com/api/v1/images/me',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('JWT')}`
                }
        })
            .then(response => {
                    this.setState({
                        isLoading: false, 
                        images: response.data
                    })
            })
            .catch(error => {
                toast('You have an error loading the images from yourself')
            })

    }



    render() {

        const {profile, images} = this.state

/*         if(this.state.isLoading) {
            return <Loading />
        } */

        return (
            localStorage.getItem('JWT')  
            ? (
                <>  
                <div>
                    <p>{profile.username}</p>
                    <img src = {profile.profile_picture}></img>

                </div>       
                               
                <UploadPage APIcall = {this.APIcall}/> {/* passing the API call down to ImageUpload Upload button so it will reload all images */}

                <div display = 'flex'>

                    {
                        images.map((each, index) => 
                        <img key={index} src={each}/>
                        )
                    }
                
                
                </div> 



                </>
            )
            : <Redirect to = '/' />
        )
    }
}


export default MyProfilePage

