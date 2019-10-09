import React from 'react';
import axios from 'axios';
import { Form, FormGroup, FormText, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

class ImageUploadForm extends React.Component {
    state = {
        message : '' ,
        text: ''

    }

    handleFile = (e) => {
        this.props.imageUpload(e.target.files[0])
    }

    handleSubmit = (event) => {
        console.log('handle submit')
        console.log(this.props.imageFile)

        event.preventDefault(); 

        
        let JWT = localStorage.getItem('JWT')
        let formData = new FormData ();
        formData.append('image', this.props.imageFile);
        axios.post('https://insta.nextacademy.com/api/v1/images/', formData, {
            headers: {Authorization: `Bearer ${JWT}`}
        })
        .then(response => {
            console.log(response.data)
            if(response.data.success) {
                toast('You have upload your photo successfully')
                console.log('success')
                this.props.imageUpload('')
                this.setState({
                    text: ''
                })
            }
        })
        .catch(error => {
            toast('Your photo is not uploaded succesfully')
            this.props.imageUpload('')
            this.setState({
                text: ''
            })
        })            
        }
    

    render() {
        console.log('running image upload file')
        
        return (
            <Form>
                <FormGroup>

                    <Form.Control
                        type = 'file'
                        name = 'image-file'
                        /* multiple = 'false' */
                        value = {this.state.text}
                        onChange = {this.handleFile}
                    />                 

                    <FormText color = 'muted'>
                        Make sure the image being uploaded is supported format
                    </FormText>

                </FormGroup>

                <Button type = 'submit' color = 'primary' /* disable = {!this.state.imageFile} */ 
                        onClick = { (event) => {                       
                            this.handleSubmit(event);
                            this.props.APIcall(); // calling the API to reaload all image after submit
                        } }
                >
                    Upload
                </Button>
            </Form>
        

        )
    }
}

export default ImageUploadForm