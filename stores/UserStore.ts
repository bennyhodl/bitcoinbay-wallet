import { action, observable } from 'mobx';

export default class UserStore {
    @observable user: string | null = "Ben"

    @action
    addUser = (name:string) => {
        this.user = name
    }
}