import UserStore from "./UserStore";
import LnBitsStore from "./LnBitsStore";

class Stores {
    public userStore: UserStore
    public lnbitsStore: LnBitsStore

    constructor() {
        this.userStore = new UserStore()
        this.lnbitsStore = new LnBitsStore()
    }
}

const stores = new Stores()
export default stores