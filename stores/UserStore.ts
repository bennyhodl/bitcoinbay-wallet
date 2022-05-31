import { action, makeObservable, observable, runInAction } from 'mobx';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default class UserStore {

    constructor() {
        makeObservable(this)
    }

    @observable loggedIn: boolean = false
    @observable user: string | null = null

    @action
    login = async () => {
        await AsyncStorage.setItem('loggedIn', 'true')
        runInAction(() => {
            this.loggedIn = true
        })
    }

    @action
    logout = async () => {
        await AsyncStorage.setItem('loggedIn', 'false')
        runInAction(() => {
            this.loggedIn = false
        })
    }

    @action
    checkLoggedIn = async () => {
        const login = await AsyncStorage.getItem('loggedIn')
        runInAction(() => {
            if (login === 'true') return this.loggedIn = true
            return this.loggedIn = false
        })
    }

    @action
    addUser = (name:string) => this.user = name
}