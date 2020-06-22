import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Modal from 'react-modal'
import Axios from 'axios'

export class addWallet extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: " ",
            budget: " ",
            message: " ",
            showModal: false
        }
    }
    
    render() {
        return (
            <div>
                <Container>
                <Modal isOpen={this.state.showModal}>
                    <p>{this.state.message}</p>
                    <Button onClick={this.closeModal}>OK</Button>
                </Modal>
                <Form onSubmit={this.submitMethod}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name of Wallet</Form.Label>
                        <Form.Control type="text" placeholder="" name="name" onChange={this.changeMethod} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" >
                        <Form.Label>Budget</Form.Label>
                        <Form.Control type="money" placeholder="" name="budget" onChange={this.changeMethod} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>{" "}
                    <Button variant="primary" onClick={this.closeButton}>Close</Button>
                </Form>
            </Container>
            </div>
        )
    }
}

export default addWallet
