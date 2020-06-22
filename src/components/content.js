import React, { Component } from 'react'
import NewWallet from './initWallet'
import BudState from './budState'
import Navigation from './navigation'
import WalletCard from './walletCard'
import CardDeck from 'react-bootstrap/CardDeck'
import Axios from 'axios'

class content extends Component {

    constructor(props) {
        super(props)

        this.state = {
            walletExist: false,
            changeWalletRequest: false,
            selectedWallet: " ",
            allWallets: []
        }
    }

    async componentDidMount() {
        let walletVerify = await Axios.get("/api/wallets");
        let cont=0
        walletVerify.data.map(wallets=>(cont++))
        if (cont<1) {
            this.setState({
                walletExist: false
            });
        }
        else if(cont>0) { 
            this.setState({ walletExist: true, allWallets: walletVerify }); 
                
            }
      
        
    }

    walletRequest = () => {
        if (this.state.changeWalletRequest === false)
            this.setState({ changeWalletRequest: true })
    }

    walletChanged = () => {
        if (this.state.changeWalletRequest === true) {
            this.setState({ changeWalletRequest: false })
        }
        
            this.componentDidMount()
        }

    chooseWallet = (walletID) => {
        this.setState({ selectedWallet: walletID})
    }

    unchooseWallet=()=>{
        this.setState({selectedWallet:" "})
        
    }

    addWallet=()=>{
    this.setState({walletExist:false, selectedWallet:" "})
        if(this.state.changeWalletRequest===false)
        this.setState({changeWalletRequest:true})
    }

    refresh=()=>{
        this.componentDidMount()
    }
    
        render() {
        const walletExist = this.state.walletExist
        const walletRequest = this.state.changeWalletRequest
        const walletSelected = this.state.selectedWallet

        if (walletExist === false || walletRequest === true) {
            return <NewWallet
                walletIDHandle={walletSelected}    
                refresh={this.walletChanged} />
        }

        else if (walletExist === true && walletSelected === " ") {
            return (
                <div><CardDeck style={{marginLeft:"1%",marginRight:"1%"}}>{this.state.allWallets.data.map(eachWallet => (
                    <WalletCard key={eachWallet._id} eachWalletHandle={eachWallet} 
                    chooseWalletHandle={this.chooseWallet} 
                    refresh={this.refresh}/>
                )
                )}
                </CardDeck></div>
            )
        }
        else {
            return (
                <div>
                    <Navigation  walletRequestHandle={this.walletRequest} 
                                unchooseWalletHandle={this.unchooseWallet}
                                 addWalletHandle={this.addWallet}/>

                    <BudState selectedWalletHandle={walletSelected}/>
                </div>
            )

        }
    }
}

export default content



