import React from 'react';
import axios from 'axios';

//import Bootstrap 
import 'bootstrap/dist/css/bootstrap.css'

class UserProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageLinks: [],
            profile: {}

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
                imageLinks: resp.data
            })
        }) 
    }

    render() {
        const imageLinks = this.state.imageLinks
        const profile = this.state.profile

        return (
            <div class = 'container'>

                {/*first part is a row*/}
                <div class = 'row'>
                    <div class ='col-4'>
                        <img width = '20%' src={profile.profileImage} /> 
                    </div>

                    <div class='col-8'>
                        <p>{profile.username}</p>
                   </div>

                </div>

                {/*second part is a row*/}
                <div class="d-flex flex-row bd-highlight mb-3">
                    {
                    imageLinks.map((imageLink)=>{
                        return <img width = '100vw' src = {imageLink}></img>
                    })
                    }                        
                </div>
            </div>
        )
    }
}

export default UserProfilePage;