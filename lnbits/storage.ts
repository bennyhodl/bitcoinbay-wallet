import * as SecureStore from 'expo-secure-store'

export const storeUserId = async (id:string) => {
    await SecureStore.setItemAsync('userId', id)
}

export const storeWalletId = async (id:string) => {
    await SecureStore.setItemAsync("walletId", id)
}

export const storeInvoiceKey = async (key:string) => {
    await SecureStore.setItemAsync("invoiceKey", key)
}

export const storeAdminKey = async (key:string) => {
    await SecureStore.setItemAsync("adminKey", key)
}

export const getUserId = async () => {
    let id = await SecureStore.getItemAsync("userId")
    if (id) {
        return id
    } else {
        return "No user id"
    }
}

export const getWalletId = async () => {
    let id = await SecureStore.getItemAsync("walletId")
    if (id) {
        return id
    } else {
        return "No wallet id"
    }
}

export const getAdminKey = async () => {
    let key = await SecureStore.getItemAsync("adminKey")
    if (key) {
        return key
    } else {
        return "No admin key"
    }
}

export const getInvoiceKey = async () => {
    let key = await SecureStore.getItemAsync("invoiceKey")
    if (key) {
        return key
    } else {
        return "No invoice key"
    }
}