import React from 'react';
import axios from 'axios';
//import styled components
import styled from 'styled-components';

import LoadingImages from '../Components/LoadingImages.js';
// to use the library react-graceful-image
import Image from "react-graceful-image";

// using the style () will add the extra properties into what Image already has
const StyledImage = styled(Image)` 
    width: 260px;
    height: 220px;
    margin-top: 1%;
    margin-left: 5px;
    object-fit: cover;
`


class ContainerImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imagesLink: [],
            isLoading: true
        }
    }

    componentDidMount () {
        axios.get(`https://insta.nextacademy.com/api/v1/images/?userId=${this.props.id}`) 
            .then(resp => {
                this.setState({
                    imagesLink: resp.data, // calling the array of list of imagesLink from one ID
                    isLoading: false
                })
            })
    }  
    
    render() {
        const isLoading = this.state.isLoading

        if(isLoading) {
            return <LoadingImages />
        }


        return (
            <>
            {
                this.state.imagesLink.map((imageLink, index) =>
                                     
                 <StyledImage key = {index} src={imageLink} />  
                                                 
                )
            }
            </>
            
        )

    }
}
                   


export default ContainerImage