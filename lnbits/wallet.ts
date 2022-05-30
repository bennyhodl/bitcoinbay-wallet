import axios from "axios"
import {WalletDetails, CreateInvoice, CreateWallet} from "../types/wallet"
import { getAdminKey, getInvoiceKey, getWalletId } from "./storage"


// Refactor to an LnBits class with storage of user data.

const lnbitsUrl = "https://legend.lnbits.com/api/v1"
const lnbitsUserUrl = "https://legend.lnbits.com/usermanager/api/v1"

// {"admin_id": <string>, "user_name": <string>, "wallet_name": <string>,"email": <Optional string> ,"password": <Optional string>}
export const createWallet = async (name:string, email?:string): Promise<CreateWallet> => {
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

    const {data} = await axios.post(`${lnbitsUserUrl}/users`, body, {headers: header})
    return data
}

export const walletDetails = async (): Promise<WalletDetails> => {
    const invoiceKey = await getInvoiceKey()
    const header = {
        "X-Api-Key": invoiceKey,
    }
    const {data} = await axios.get<WalletDetails>(`${lnbitsUrl}/wallet`, {headers: header})
    return data
}

export const payBolt11 = async (bolt11:string) => {
    const adminKey = await getAdminKey()
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

export const getUserTransactions = async () => {
    const invoiceKey = await getInvoiceKey()
    const walletId = await getWalletId()
    const header = {
        "X-Api-Key": invoiceKey,
        "Content-type": "application/json"
    }
    const {data} = await axios.get(`${lnbitsUserUrl}/transactions/${walletId}`, {headers: header})
    return data
}

export const createInvoice = async (invoice:CreateInvoice) => {
    const invoiceKey = await getInvoiceKey()
    const body = {
        out: false,
        amount: invoice.amount,
        memo: invoice.memo
    }

    const header = {
        "X-Api-Key": invoiceKey,
        "Content-type": "application/json"
    }
    
    const {data} = await axios.post(`${lnbitsUrl}/payments`, body ,{headers: header})
    return data
}

export const decodeInvoice = async (invoice:string) => {
    const invoiceKey = await getInvoiceKey()
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

export const trackInvoice = async (hash:string) => {
    const invoiceKey = await getInvoiceKey()
    const header = {
        "X-Api-Key": invoiceKey,
        "Content-type": "application/json"
    }

    const invoice = await axios.get(`${lnbitsUrl}/payments/${hash}`, {headers: header})
    return invoice
}