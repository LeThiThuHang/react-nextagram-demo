import React from 'react';
import axios from 'axios';

//import Bootstrap 
import 'bootstrap/dist/css/bootstrap.css'

//import styled components
import styled from 'styled-components';
import LoadingImages from '../Components/LoadingImages.js';

const UserContainer = styled.p`
    font-family: 'Underdog', cursive;
    font-size: 4rem
`

const ImageContainer = styled.img`
    height: 30vh;
    border-radius:50px;
    margin:1rem;
`

const UserImageContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap
`
const EachImage = styled.img`
    height:30vh;
    width: 20vw;
    margin:1rem;
    border-radius:15px
`

class UserProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageLinks: [],
            profile: {},
            isLoading: true
        }
    }

   
    componentDidMount() {
         // this one is to get the ID, because of Router, that the UserProfileImage has one object as match
        const userId = this.props.match.params.id

        //input the users profiles (id, profileImage, username) to the page
        axios.get(`https://insta.nextacademy.com/api/v1/users/${userId}`)
        .then(resp => {
            this.setState({
                profile: resp.data // it return an object with keys as id, profileIMage, username
            })
        })


        //input the images to the page
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)
        .then(resp => {
            this.setState ({
                imageLinks: resp.data,
                isLoading: false
            })
        }) 
    }

    render() {
        const {imageLinks,profile, isLoading} = this.state

        if (isLoading) {
            return <LoadingImages />
        }

        

        return (
            <UserContainer>
            <div class = 'container'>

                {/*first part is a row*/}
                <div class = 'row d-flex flex-row align-items-center justify-content-center'>
                    <div class ='col-4'>
                        <ImageContainer src={profile.profileImage}>
                            {/* <img  width = '80%'   />  */}
                        </ImageContainer>
                    </div>

                    <div class='col-8'>
                        <p>{profile.username}</p>
                   </div>

                </div>

                {/*second part is a row*/}
                <UserImageContainer>
                    {
                    imageLinks.map((imageLink)=>{
                        return <EachImage src = {imageLink}></EachImage>
                        
                    })
                    }                        

                </UserImageContainer>
                {/* <div class="d-flex flex-row bd-highlight mb-3">
                </div> */}
            </div>
            </UserContainer>
        )
    }
}

export default UserProfilePage;