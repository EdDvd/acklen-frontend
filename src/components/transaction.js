import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-modal'
import Button from 'react-bootstrap/Button'
import Select from 'react-select'
import Axios from 'axios'

class Transaction extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: " ",
            amount: 0,
            type: "output",
            msg: "",
            msgVisible: "hidden"
        }
    }

    changeMethod = (event) => {

        event.preventDefault()
        this.setState({ title: event.target.value })
        this.setState({ msgVisible: "hidden" })
    }

    changeAmountMethod = (event) => {
        let regNum = /\d/g

        event.preventDefault()
        if (regNum.test(event.target.value) === true) {
            this.setState({ amount: event.target.value * 1 })
            this.setState({ msgVisible: "hidden" })
        }
        else {
            event.target.value = ""
        }

    }

    changeTypeMethod = (value) => {
        this.setState({ type: value.value })
        if (value.value === "output" && this.state.amount > 0) {
            this.setState({ amount: this.state.amount * -1 })
        }
        else if (value.value === "input" && this.state.amount < 0) {
            this.setState({ amount: this.state.amount * -1 })
        }
        else {
            this.setState({ amount: this.state.amount })
        }
    }

    submitMethod = (event) => {
        event.preventDefault()
        if (this.state.title === " " || this.state.amount === " ") {
            this.setState({ msgVisible: "visible", msg: "empty fields" })
        }
        else if (this.state.amount === 0) {
            this.setState({ msgVisible: "visible", msg: "amount cannot be 0" })
        }
        else {
            Axios.post(process.env.REACT_APP_API+'/api/wallets/' + this.props.ID + '/transactions', (this.state))
                .then(response => {
                    console.log(response)
                    this.props.refresh()
                })
                .catch(err => { console.log(err) })
            this.props.openClose()
        }
    }

    closeMethod = () => {
        this.props.openClose()
    }

    render() {
        const optionType = [{ value: 'input', label: 'In' },
        { value: 'output', label: 'Out' }]

        return (
            <div>
                <Modal isOpen={this.props.modalOpenHandle}>
                    <Form onSubmit={this.submitMethod}>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder=" " name="title" onChange={this.changeMethod} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" >
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="money" placeholder=" " name="amount" onChange={this.changeAmountMethod} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Select
                                name="type"
                                options={optionType}
                                onChange={this.changeTypeMethod} />
                        </Form.Group>
                        <p style={{
                            visibility: this.state.msgVisible,
                            color: "red"
                        }}>{this.state.msg}</p>
                        <Button variant="primary" type="submit">
                            Submit
                    </Button>{" "}
                        <Button onClick={this.closeMethod}>
                            Close
                    </Button>
                    </Form>
                </Modal>

            </div>
        )
    }
}
export default Transaction
