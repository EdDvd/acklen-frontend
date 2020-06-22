import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Modal from 'react-modal'
import Axios from 'axios'
import './styles/initWallet.css'

class NewWallet extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: " ",
            budget: " ",
            message: " ",
            walletID:" ",
            showModal: false
        }
    }

    changeMethod = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        
    }

    changeBudgetMethod=(event)=>{
        let regNum = /\d/g
        
        event.preventDefault()
        if (regNum.test(event.target.value) === true) {
            this.setState({ budget: event.target.value * 1 })
            
        }
        else {
            event.target.value = ""
        }
    }

    submitMethod = (event) => {
        let walletID = this.props.walletIDHandle
       
        event.preventDefault()
        
        if (this.state.name === " " || this.state.budget === " ") {
            this.setState({
                message: "empty fields",
                showModal: true
            })
        }
        
        else if(walletID.data===undefined){
            Axios.post('/api/wallets/', this.state)
            .then(response => {
               // console.log(response)
                this.setState({
                    showModal: true,
                    message: "wallet changed"
                })
            })
            .catch(err => { console.log(err) }) 
           
        }
        else {
            Axios.patch('/api/wallets/'+walletID, this.state)
                .then(response => {
                    console.log(response)
                    this.setState({
                        showModal: true,
                        message: "wallet changed"
                    })
                })
                .catch(err => { console.log(err) })
        }
        
       this.props.refresh()
    }
    closeModal = () => {
        this.setState({ showModal: false })
        if (this.state.message === "wallet changed") {
            this.props.refresh()
        }
    }
    closeButton = () => {
        this.props.refresh()
    }

    render() {
        
        return (

            <Container className="initWallet">
                <Modal  className="modalInit"
                        isOpen={this.state.showModal}>
                    <p>{this.state.message}</p>
                    <Button onClick={this.closeModal}>OK</Button>
                </Modal>
                <Form onSubmit={this.submitMethod}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label><strong>Name of Wallet</strong></Form.Label>
                        <Form.Control type="text" placeholder="" name="name" onChange={this.changeMethod} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" >
                        <Form.Label><strong>Budget</strong></Form.Label>
                        <Form.Control type="money" placeholder="" name="budget" onChange={this.changeBudgetMethod} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>{" "}
                    <Button variant="primary" onClick={this.closeButton}>Close</Button>
                </Form>
            </Container>
        )
    }
}
export default NewWallet
