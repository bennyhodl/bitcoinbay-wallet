import axios from "axios"
import { lnbitsUrl, lnbitsInvoiceKey } from "../util/config"
import {User} from "../types/user"

const headers = {headers: {"X-Api-Key": lnbitsInvoiceKey}}

export const getUsers = async () => {
    const users = await axios.get(lnbitsUrl, headers)
    return users
}

export const getUser = async (id:User) => {
    const user = await axios.get(`${lnbitsUrl}/${id}`, headers)
    return user
}