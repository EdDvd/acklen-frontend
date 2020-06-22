import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'

 
class Navigation extends Component {
  
    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Wallet
                        </Dropdown.Toggle>
                        <Dropdown.Menu alignRight>
                            
                            <Dropdown.Item href="" onClick={this.props.addWalletHandle}>New Wallet</Dropdown.Item>
                            <Dropdown.Item href="" onClick={this.props.unchooseWalletHandle}>Change Wallet</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Navbar>
        )
    }
}

export default Navigation
