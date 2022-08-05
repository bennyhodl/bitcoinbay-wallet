import LnBitsStore from "./LnBitsStore";
import { AppStore } from "./AppStore";
import {BitcoinStore} from "./BitcoinStore"
class Stores {
    public lnbitsStore: LnBitsStore
    public appStore: AppStore
    public bitcoinStore: BitcoinStore

    constructor() {
        this.lnbitsStore = new LnBitsStore()
        this.appStore = new AppStore()
        this.bitcoinStore = new BitcoinStore()
    }
}

const stores = new Stores()
export default stores