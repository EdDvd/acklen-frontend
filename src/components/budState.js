import React, { Component } from 'react'
import './styles/budState.css'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-modal'
import Transactions from './transactions'
import Transaction from './transaction'
import Axios from 'axios'

class budState extends Component {
    constructor(props) {
        super(props)

        this.state = {
            budget: "0.00",
            outputs: "0.00",
            inputs: "0.00",
            total: "0.00",
            showModal: false,
            addModal: false,
            walletSelected: this.props.selectedWalletHandle,
            transArray: [{}]
        }
    }

    async componentDidMount() {
        const id = this.state.walletSelected
        let walletInfo = await Axios.get(process.env.REACT_APP_API+'/api/wallets/' + id);
        let transactionsInfo = walletInfo.data.transactions;
        let sumOutputs = 0;
        let sumInputs = 0;

        for (let x = 0; x < transactionsInfo.length; x++) {
            if (transactionsInfo[x].type === "input") {
                sumInputs = sumInputs + transactionsInfo[x].amount;

            }
            else if (transactionsInfo[x].type === "output") {
                sumOutputs = sumOutputs + transactionsInfo[x].amount;

            }
        }
        this.setState({
            budget: walletInfo.data.budget,
            inputs: sumInputs,
            outputs: sumOutputs,
            total: walletInfo.data.budget + (sumInputs + sumOutputs),
            transArray: transactionsInfo
        });
    }

    refresh=()=>{
        this.componentDidMount()
    }
    showModalMethod = () => {
        this.setState({ showModal: true })
    }

    closeModalMethod = () => {
        this.setState({ showModal: false })
    }

    showAddModal=()=>{
        if(this.state.addModal===false)
        this.setState({addModal:true})
        else if( this.state.addModal===true)
        this.setState({addModal:false})
    }

   
    postTrnsaction=(trans)=>{
        Axios.post(process.env.REACT_APP_API+'/api/wallets/' + this.state.walletSelected + '/transactions', (trans))
                .then(response => {
                    console.log(response)
                    console.log(this.state)

                })
                .catch(err => { console.log(err) })
    }

    render() {

        return (
            <div>
                <Container className="budState">
                    <Col md={{ span: 4, offset: 4 }} >
                        <Row ><Col><h1><Badge variant='success'>Presupuesto</Badge></h1></Col><Col><h1>{this.state.budget}</h1></Col></Row>
                        <Row><Col><h2>Inputs</h2></Col> <Col><h2>{this.state.inputs}</h2></Col></Row>
                        <Row><Col><h2>outputs</h2></Col> <Col><h2>{this.state.outputs}</h2></Col></Row>
                        <Row><Col><h2>Total</h2></Col><Col><h2>{this.state.total}</h2></Col></Row>
                    </Col>
                    <div className="bottonButtons">
                    <Button onClick={this.showModalMethod}>Expand</Button>{'  '}
                    <Button onClick={this.showAddModal}>New</Button>
                    </div>
                    <Modal isOpen={this.state.showModal}
                             className="transModal">
                    <div>
                        <h4>In: {this.state.inputs}</h4>
                        <h4>Out: {this.state.outputs}</h4>
                        <Button onClick={this.closeModalMethod}>Close</Button>
                        {this.state.transArray.map(transaction => (
                            <Transactions refresh={this.refresh}
                                          walletSelected={this.state.walletSelected} 
                                          key={transaction._id} 
                                          transactionHandle={transaction} />
                        )
                        )}
                        </div>
                    </Modal>
                        <Transaction ID={this.state.walletSelected}                               
                                 modalOpenHandle={this.state.addModal} 
                                 openClose={this.showAddModal}
                                 refresh={this.refresh}/>
                   </Container>
            </div>
        )
    }
}
export default budState