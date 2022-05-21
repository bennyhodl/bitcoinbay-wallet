import axios from "axios"
import {WalletDetails, CreateInvoice} from "../types/wallet"
import { lnbitsUrl, lnbitsUserUrl, userInvoiceKey, userAdminKey, userWalletId } from "../util/config"

// Refactor to an LnBits class with storage of user data.

export const walletDetails = async (): Promise<WalletDetails> => {
    const header = {
        "X-Api-Key": userInvoiceKey,
    }
    const {data} = await axios.get<WalletDetails>(`${lnbitsUrl}/wallet`, {headers: header})
    return data
}

export const payBolt11 = async (bolt11:string) => {
    const body = {
        out: true,
        bolt11: bolt11
    }

    const header = {
        "X-Api-Key": userAdminKey,
        "Content-type": "application/json"
    }

    const pay = await axios.post(`${lnbitsUrl}/payments`, body, {headers: header})
    return pay
}

export const getUserTransactions = async () => {
    const header = {
        "X-Api-Key": userInvoiceKey,
        "Content-type": "application/json"
    }
    const {data} = await axios.get(`${lnbitsUserUrl}/transactions/${userWalletId}`, {headers: header})
    return data
}

export const createInvoice = async (data:CreateInvoice) => {
    const body = {
        out: false,
        amount: data.amount,
        memo: data.memo
    }

    const header = {
        "X-Api-Key": userInvoiceKey,
        "Content-type": "application/json"
    }
    
    const createdInvoice = await axios.post(`${lnbitsUrl}/payments`, body ,{headers: header})
    return createdInvoice
}

export const decodeInvoice = async (invoice:string) => {
    const body = {
        data: invoice
    }

    const header = {
        "X-Api-Key": userInvoiceKey,
        "Content-type": "application/json"
    }

    const decodedInvoice = await axios.post(`${lnbitsUrl}/payments/decode`, body, {headers: header})
    return decodedInvoice
}

export const trackInvoice = async (hash:string) => {
    const header = {
        "X-Api-Key": userInvoiceKey,
        "Content-type": "application/json"
    }

    const invoice = await axios.get(`${lnbitsUrl}/payments/${hash}`, {headers: header})
    return invoice
}