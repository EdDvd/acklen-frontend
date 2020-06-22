import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'
import './styles/walletCard.css'
class walletCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             bgColor:"info"
        }
    }
    

    selectWallet = () => {
        let walletID = this.props.eachWalletHandle._id
        this.props.chooseWalletHandle(walletID)
    }
    mouseOver=()=>{
        this.setState({bgColor:"success"})
    }
    mouseOut=()=>{
        this.setState({bgColor:"info"})
    }
    deleteMethod=()=>{
        Axios.delete('/api/wallets/'+this.props.eachWalletHandle._id)
        this.props.refresh()
    }
    render() {
        return (
            <div className="walletCard">
                <Card
                    bg={this.state.bgColor}
                    text={"light"} 
                    style={{ width: '18rem' }}
                    onMouseOver={this.mouseOver}
                    onMouseOut={this.mouseOut}>
                    <Card.Header>Wallet</Card.Header>
                    <Card.Body>
                        <Card.Title>Name: {this.props.eachWalletHandle.name}</Card.Title>
                        <Card.Text>
                            <br/>
                            Budget: {this.props.eachWalletHandle.budget}
                          </Card.Text>
                          <Button variant='outline-light' onClick={this.selectWallet}>Select</Button>{' '}
                          <Button variant='outline-light' onClick={this.deleteMethod}>Delete</Button>
                        </Card.Body>
                </Card>
                <br/>
                <br/>
            </div>
        )
    }
}

export default walletCard

