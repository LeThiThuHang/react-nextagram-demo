import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class LogOut extends React.Component {

    render() {
        return (
            <Modal show = {this.props.show}>
            <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>Log out</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Please log out here</p>
            </Modal.Body>

            <Modal.Footer>
                <div onClick = {this.props.logOut}>
                <Button variant="secondary" onClick = {this.props.closeLogOut}>Log out</Button>  
                </div>            
            </Modal.Footer>
            </Modal.Dialog>
            </Modal>
        )
    }

}



export default LogOut