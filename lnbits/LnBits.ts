import {createContext, Component} from "react"
import * as SecureStore from "expo-secure-store"
import {WalletDetails, CreateInvoice} from "../types/wallet"
import axios from "axios"
import {lnbitsUrl, lnbitsUserUrl} from "../util/config"

const LnBitsContext = createContext(true)
class LnBits extends Component {
    
    private createAccount = () => {}

    private storeUserId = async (id:string) => {
        await SecureStore.setItemAsync("userId", id)
    }

    private storeWalletId = async (id:string) => {
        await SecureStore.setItemAsync("walletId", id)
    }

    private invoiceKey = async (key:string) => {
        await SecureStore.setItemAsync("invoiceKey", key)
    }

    private adminKey = async (key:string) => {
        await SecureStore.setItemAsync("adminKey", key)
    }

    private getUserId = async () => {
        let id = await SecureStore.getItemAsync("userId")
        if (id) {
            return id
        } else {
            return "No user id"
        }
    }

    private getWalletId = async () => {
        let id = await SecureStore.getItemAsync("walletId")
        if (id) {
            return id
        } else {
            return "No wallet id"
        }
    }

    private getAdminKey = async () => {
        let key = await SecureStore.getItemAsync("adminKey")
        if (key) {
            return key
        } else {
            return "No admin key"
        }
    }

    private getInvoiceKey = async () => {
        let key = await SecureStore.getItemAsync("invoiceKey")
        if (key) {
            return key
        } else {
            return "No invoice key"
        }
    }

    walletDetails = async (): Promise<WalletDetails> => {
        let userInvoiceKey = await this.getInvoiceKey()
        const header = {
            "X-Api-Key": userInvoiceKey,
        }
        const {data} = await axios.get<WalletDetails>(`${lnbitsUrl}/wallet`, {headers: header})
        return data
    }

    payBolt11 = async (bolt11:string) => {
        let adminKey = await this.getAdminKey()
        const body = {
            out: true,
            bolt11: bolt11
        }
    
        const header = {
            "X-Api-Key": adminKey,
            "Content-type": "application/json"
        }
    
        const pay = await axios.post(`${lnbitsUrl}/payments`, body, {headers: header})
        return pay
    }

    getUserTransactions = async () => {
        let walletId = await this.getWalletId()
        const tx = await axios.get(`${lnbitsUserUrl}/wallets${walletId}`)
        return tx
    }

    createInvoice = async (data:CreateInvoice) => {
        let invoiceKey = await this.getInvoiceKey()
        const body = {
            out: false,
            amount: data.amount,
            memo: data.memo
        }
    
        const header = {
            "X-Api-Key": invoiceKey,
            "Content-type": "application/json"
        }
        
        const createdInvoice = await axios.post(`${lnbitsUrl}/payments`, body ,{headers: header})
        return createdInvoice
    }

    decodeInvoice = async (invoice:string) => {
        let invoiceKey = await this.getInvoiceKey()
        const body = {
            data: invoice
        }
    
        const header = {
            "X-Api-Key": invoiceKey,
            "Content-type": "application/json"
        }
    
        const decodedInvoice = await axios.post(`${lnbitsUrl}/payments/decode`, body, {headers: header})
        return decodedInvoice
    }

    trackInvoice = async (hash:string) => {
        let invoiceKey = await this.getInvoiceKey()
        const header = {
            "X-Api-Key": invoiceKey,
            "Content-type": "application/json"
        }
    
        const invoice = await axios.get(`${lnbitsUrl}/payments/${hash}`, {headers: header})
        return invoice
    }

// class UserProvider extends Component {
//   // Context state
//   state = {
//     user: {},
//   }

//   // Method to update state
//   setUser = (user) => {
//     this.setState((prevState) => ({ user }))
//   }

//   render() {
//     const { children } = this.props
//     const { user } = this.state
//     const { setUser } = this

    
//   }
// }

// export default UserContext

// export { UserProvider }

}

export default LnBits