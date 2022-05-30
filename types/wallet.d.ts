type WalletDetails = {
    name: string,
    balance: number
}

type CreateInvoice = {
    amount: number,
    memo: string
}

type Transaction = {
    checking_id: string,
    pending: boolean,
    amount: number,
    fee: number,
    memo: string,
    time: number,
    bolt11: string,
    preimage: string,
    payment_hash: string,
    extra: Object,
    wallet_id: string,
    webhook: string,
    webhook_status: string
}

export type CreateWallet = {
    id: string,
    name: string,
    email: string,
    admin: string,
    password: string,
    wallets: [{
        id: string,
        admin: string,
        name: string,
        user: string,
        adminkey: string,
        inkey:string
    }]
}

export {WalletDetails, CreateInvoice, Transaction}