import React from 'react';
import logo from './loading.gif'

/* 
class LoadingImages extends React.Component {
    // the props imagesLoading refer to this.state.imagesLink from ContainerImage
    render() {
        return (
            <div>             
                 <img src= {logo} alt = 'Loading'></img>                                 
                          
            </div>
        )
    }
} */

// this is Stateless Function Component
const LoadingImages = (props) => {
    return (
        <div>             
            <img src= {logo} alt = 'Loading'></img>                                                
        </div>
    )
}

export default LoadingImages