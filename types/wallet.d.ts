type WalletDetails = {
    name: string,
    balance: number
}

type CreateInvoice = {
    amount: number,
    memo: string
}

export {WalletDetails, CreateInvoice}