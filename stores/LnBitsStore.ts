import * as SecureStore from "expo-secure-store"
import {WalletDetails, CreateInvoice, Transaction} from "../types/wallet"
import axios from "axios"
import {lnbitsUrl, lnbitsUserUrl} from "../util/config"
import { action, observable } from "mobx"

export default class LnBitsStore {

    @observable
    walletDetails: WalletDetails | undefined = undefined
    @observable
    transactions: Transaction[] | undefined = undefined

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
    getWalletDetails = async () => {
        let userInvoiceKey = await this.getInvoiceKey()
        const header = {
            "X-Api-Key": userInvoiceKey,
        }
        const wallet = await axios.get<WalletDetails>(`${lnbitsUrl}/wallet`, {headers: header})
        this.walletDetails = wallet.data
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
    
        const pay = await axios.post(`${lnbitsUrl}/payments`, body, {headers: header})
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
        const transactions = await axios.get(`${lnbitsUserUrl}/transactions/${walletId}`, {headers: header})
        this.transactions = transactions.data
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
        
        const createdInvoice = await axios.post(`${lnbitsUrl}/payments`, body ,{headers: header})
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
    
        const decodedInvoice = await axios.post(`${lnbitsUrl}/payments/decode`, body, {headers: header})
        return decodedInvoice
    }

    @action
    trackInvoice = async (hash:string) => {
        let invoiceKey = await this.getInvoiceKey()
        const header = {
            "X-Api-Key": invoiceKey,
            "Content-type": "application/json"
        }
    
        const invoice = await axios.get(`${lnbitsUrl}/payments/${hash}`, {headers: header})
        return invoice
    }
}