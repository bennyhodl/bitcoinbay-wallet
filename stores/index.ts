import LnBitsStore from "./LnBitsStore";
import { AppStore } from "./AppStore";
class Stores {
    public lnbitsStore: LnBitsStore
    public appStore: AppStore

    constructor() {
        this.lnbitsStore = new LnBitsStore()
        this.appStore = new AppStore()
    }
}

const stores = new Stores()
export default stores