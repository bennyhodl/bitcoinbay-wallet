import axios from "axios"
import { lnbitsUserUrl, headers } from "../util/config"
import {User} from "../types/user"

export const getUsers = async () => {
    const users = await axios.get(lnbitsUserUrl + "users", {headers: headers})
    return users
}

export const getUser = async (id:User) => {
    const user = await axios.get(`${lnbitsUserUrl}/users/${id}`, {headers: headers})
    return user.data
}

export const getWalletsForUser = async (id:User) => {
    const wallets = await axios.get(`${lnbitsUserUrl}/wallets/${id}`, {headers: headers})
    return wallets
}