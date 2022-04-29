import axios from "axios"
import { lnbitsUrl, lnbitsUserUrl, headers, userInvoiceKey, userAdminKey, userWalletId } from "../util/config"

type CreateInvoice = {
    amount: number,
    memo: string
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

    const pay = await axios.post(`${lnbitsUrl}/payments`, {headers: header, data: body})
    return pay
}

export const getUserTransactions = async () => {
    const tx = await axios.get(`${lnbitsUrl}/wallets${userWalletId}`)
    return tx
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

    const createdInvoice = await axios.post(`${lnbitsUrl}/payments`, {headers: header, data: body})
    return createdInvoice
}

export const decodeInvoice = async (invoice:string) => {
    const body = {
        invoice: invoice
    }

    const header = {
        "X-Api-Key": userInvoiceKey,
        "Content-type": "application/json"
    }

    const decodedInvoice = await axios.post(`${lnbitsUrl}/decode`, {headers: header, data: body})
    return decodeInvoice
}

export const trackInvoice = async (hash:string) => {
    const header = {
        "X-Api-Key": userInvoiceKey,
        "Content-type": "application/json"
    }

    const invoice = await axios.get(`${lnbitsUrl}/payments/${hash}`, {headers: header})
    return invoice
}