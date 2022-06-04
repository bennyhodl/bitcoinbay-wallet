import * as SecureStore from "expo-secure-store"
import {WalletDetails, CreateInvoice, Transaction, CreateWallet} from "../types/wallet"
import axios from "axios"
import { action, makeObservable, observable, runInAction } from "mobx"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default class LnBitsStore {
    constructor() {
        makeObservable(this)
    }
    
    @observable
    walletDetails: WalletDetails = {name: "", balance: 0}
    @observable
    transactions: Transaction[] | undefined = undefined
    private lnbitsUrl = "https://legend.lnbits.com/api/v1"
    private userUrl = "https://legend.lnbits.com/usermanager/api/v1"

    @action
    reset = async () => {
        await SecureStore.setItemAsync("walletId", "")
        await SecureStore.setItemAsync("invoiceKey", "")
        await SecureStore.setItemAsync("adminKey", "")
        await AsyncStorage.setItem('loggedIn', 'false')
    }

    @action
    storeWalletId = async (id:string) => {
        await SecureStore.setItemAsync("walletId", id)
    }

    @action
    storeInvoiceKey = async (key:string) => {
        await SecureStore.setItemAsync("invoiceKey", key)
    }

    @action
    storeAdminKey = async (key:string) => {
        await SecureStore.setItemAsync("adminKey", key)
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

    @action
    createWallet = async (name:string, email?:string) => {
        const invoiceKey = "150a396709934a9ea2d0f6ee8b11b3fa"

        const header = {
            "X-Api-Key": invoiceKey,
            "Content-type": "application/json"
        }
   
        const body = {
            admin_id: "51b170b5296941d4bfd2c5cb553e117c",
            user_name: name,
            wallet_name: name,
            email: email
        }

        const data = await axios.post(`${this.userUrl}/users`, body, {headers: header})
        return data
    }

    @action
    getWalletDetails = async () => {
        let userInvoiceKey = await this.getInvoiceKey()
        const header = {
            "X-Api-Key": userInvoiceKey,
        }
        const wallet = await axios.get<WalletDetails>(`${this.lnbitsUrl}/wallet`, {headers: header})
        
        runInAction(() => {
            this.walletDetails = wallet.data
        })
    }

    @action
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
    
        const pay = await axios.post(`${this.lnbitsUrl}/payments`, body, {headers: header})
        return pay
    }

    @action
    getUserTransactions = async () => {
        let walletId = await this.getWalletId()
        let invoiceKey = await this.getInvoiceKey()
        const header = {
            "X-Api-Key": invoiceKey,
            "Content-type": "application/json"
        }
        const transactions = await axios.get(`${this.userUrl}/transactions/${walletId}`, {headers: header})

        runInAction(() => {
            this.transactions = transactions.data
        })
    }

    @action
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
        
        const createdInvoice = await axios.post(`${this.lnbitsUrl}/payments`, body ,{headers: header})
        return createdInvoice
    }

    @action
    decodeInvoice = async (invoice:string) => {
        let invoiceKey = await this.getInvoiceKey()
        const body = {
            data: invoice
        }
    
        const header = {
            "X-Api-Key": invoiceKey,
            "Content-type": "application/json"
        }
    
        const decodedInvoice = await axios.post(`${this.lnbitsUrl}/payments/decode`, body, {headers: header})
        return decodedInvoice
    }

    @action
    trackInvoice = async (hash:string) => {
        let invoiceKey = await this.getInvoiceKey()
        const header = {
            "X-Api-Key": invoiceKey,
            "Content-type": "application/json"
        }
    
        const invoice = await axios.get(`${this.lnbitsUrl}/payments/${hash}`, {headers: header})
        return invoice
    }
}