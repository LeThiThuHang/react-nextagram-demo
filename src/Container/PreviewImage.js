import React from 'react';
import { Card } from 'react-bootstrap';

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
                            <>                     
                            <Card.Img variant="top" src = {PreviewImage} />
                            <Card.Body>
                                <Card.Text>
                                    Preview Image
                                </Card.Text>
                            </Card.Body>
                            </>
                            
                        )
                        : (   
                            <>                      
                            <Card.Body>
                                <Card.Text>
                                    Preview Image
                                </Card.Text>
                            </Card.Body>
                            </>
                        )
                    }


                </Card>
        )
    }
}

export default PreviewImage