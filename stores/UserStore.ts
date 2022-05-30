import { action, makeObservable, observable } from 'mobx';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default class UserStore {

    constructor() {
        makeObservable(this)
    }

    @observable loggedIn: boolean = false
    @observable user: string | null = null

    @action
    logIn = async () => {
        await AsyncStorage.setItem('loggedIn', 'true')
        this.loggedIn = true
        console.log("Logging in mobx", this.loggedIn)
    }
    @action
    logOut = async () => {
        await AsyncStorage.setItem('loggedIn', 'false')
        this.loggedIn = false
        console.log("Logging out", this.loggedIn)
    }

    @action
    checkLoggedIn = async () => {
        const login = await AsyncStorage.getItem('loggedIn')
        console.log("Checking log in", login)
        if (login === 'true') return true
        return false
    }

    @action
    addUser = (name:string) => this.user = name
}