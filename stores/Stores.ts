import UserStore from "./UserStore";

class Stores {
    public userStore: UserStore

    constructor() {
        this.userStore = new UserStore()
    }
}

const stores = new Stores()
export default stores