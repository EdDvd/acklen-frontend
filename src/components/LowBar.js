import React, { Component } from 'react'

import Nav from 'react-bootstrap/Nav'

export class LowBar extends Component {
    render() {
        return (
            <Nav className="justify-content-center" activeKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" >
                        Disabled
                      </Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}

export default LowBar
