import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import UploadPage from './UploadPage';

import { Redirect } from 'react-router'
import LoadingImages from '../Components/LoadingImages';
import styled from 'styled-components';

const Userprofile = styled.div`
    display: flex;
    flex-direction: row;
    height: 20vh;
    justify-content: flex-start;
    align-items: center;
    background-color: #c7f0db;
`

const Image = styled.img`
    margin: 2rem;
    border-radius: 50%;
`

const Paragraph = styled.p`
    font-size: 3rem;
    font-family: 'Underdog', cursive;
`

const ImageContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const ImageOfUser = styled.img`
    margin: 1rem;
    height: 30vh;
    width: 30vw;
    border-radius: 5%;
`


class MyProfilePage extends React.Component {
    state = {
        isLoading: true,
        images: [],
        profile: {}

    }

    componentDidMount() {
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

        const { profile, images } = this.state

        if (this.state.isLoading) {
            return <LoadingImages />
        }

        return (
            localStorage.getItem('JWT')
                ? (
                    <>
                        <Userprofile>
                            <Image src={profile.profile_picture} alt='users upload pictures'></Image>
                            <Paragraph>{profile.username}</Paragraph>
                        </Userprofile>

                        <UploadPage APIcall={this.APIcall} /> {/* passing the API call down to ImageUpload Upload button so it will reload all images */}

                        
                        <ImageContainer>
                            {
                                images.map((each, index) =>
                                <ImageOfUser key={index} src={each} alt='users upload pictures'></ImageOfUser> 
                                )
                            }
                        </ImageContainer>
                        
                    </>
                )
                : <Redirect to='/' />
        )
    }
}


export default MyProfilePage

