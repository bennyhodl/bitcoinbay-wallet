import { action, observable } from 'mobx';

export default class UserStore {
    @observable loggedIn: boolean = false
    @observable user: string | null = null

    @action
    logIn = () => this.loggedIn = true
    @action
    logOut = () => this.loggedIn = false
    
    @action
    addUser = (name:string) => this.user = name
}