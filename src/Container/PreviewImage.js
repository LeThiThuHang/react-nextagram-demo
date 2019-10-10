import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import myImage from './Images/default_image.jpg'


const PreviewImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 40vh;
    justify-content: flex-start;
    align-items: center;
`
const Image = styled.img`
    margin: 2rem;
    height: 50vh;
    width: 40vw;
    border-radius: 5%;
    border: 1px solid black;
`

const Text = styled.p`
    font-size: 3rem;
    font-family: 'Underdog', cursive;
`

class PreviewImage extends React.Component {
    state = {

    }
    
    render () {
        console.log('running Preview Image')
        console.log(this.props.imageFile)

        // this to change the imageFile state from parent UploadPage to preview url 
        const PreviewImage = this.props.imageFile ? URL.createObjectURL(this.props.imageFile) : null
        return (            
                <Card>
                    {
                        PreviewImage 
                        ? (  
                            <PreviewImageContainer>
                                <Text>Upload images</Text>
                                <Image src = {PreviewImage} ></Image>
                            </PreviewImageContainer>                           
                        )
                        : (   
                            <PreviewImageContainer>
                                <Text>Upload images</Text>
                                <Image src = {myImage}></Image>
                            </PreviewImageContainer> 
                            
                        )
                    }


                </Card>
        )
    }
}

export default PreviewImage