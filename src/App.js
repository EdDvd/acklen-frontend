import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/content'
import LowBar from './components/LowBar'


export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      changeWalletRequest: true
    }
  }


  render() {
    return (
      <div>

        <Content />
        <LowBar />
      </div>
    )
  }
}
export default App

