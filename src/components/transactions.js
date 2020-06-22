import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'
class Transactions extends Component {
deleteMethod=()=>{
    Axios.delete(process.env.REACT_APP_API+'api/wallets/'+this.props.walletSelected+'/transactions/'+this.props.transactionHandle._id)
    .then(response => {
        console.log(response)
        this.props.refresh()
    })
    .catch(err => { console.log(err) })
    
}
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Header>{this.props.transactionHandle.title}</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Date: {this.props.transactionHandle.created}</ListGroup.Item>
                        <ListGroup.Item>Type: {this.props.transactionHandle.type}</ListGroup.Item>
                        <ListGroup.Item>Amount: {this.props.transactionHandle.amount}</ListGroup.Item>
                       <Button onClick={this.deleteMethod}>delete</Button> 
                    </ListGroup>
                </Card>
                <br/>
            </div>
        )
    }
}

export default Transactions

