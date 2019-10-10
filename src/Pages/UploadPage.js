import React from 'react';
import ImageUploadForm from '../Components/ImageUploadForm'
import PreviewImage from '../Container/PreviewImage'

class UploadPage extends React.Component {
    state = {
        imageFile: ''

    }

    // this function is to allow child component ImageUploadForm to update state when Upload button is clicked
    imageUpload = (imageFile) => {
        this.setState({
            imageFile: imageFile           
        })
    }

    render () {
        console.log('running upload page')
        console.log(this.state.imageFile)

        return (
            
            <>

            {/* Preview Image will have the imageFile variable which read from state here */}
            <PreviewImage imageFile = {this.state.imageFile}/>
            
            {/* ImageUploadForm will pass the state to parent */}
            {/* Passing APIcall down to ImageUploadForm when submit the button to reload all images */}
            <ImageUploadForm imageUpload = {this.imageUpload} imageFile = {this.state.imageFile} APIcall = {this.props.APIcall} />


            </>
        )
    }
}

export default UploadPage