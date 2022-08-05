import axios, { AxiosRequestConfig } from "axios";
import { action, observable, makeObservable, runInAction } from "mobx";
import { BitcoinPrice } from "../types/bitcoin";

export class BitcoinStore {
  constructor() {
    makeObservable(this)
  }

  @observable
  bitcoinPrice: string = "0"
  @observable
  balanceInUsd: number = 0

  @action
  getBitcoinPrice = async (): Promise<BitcoinPrice> => {
    const options: AxiosRequestConfig = {
      baseURL: "https://api.coinbase.com/v2/prices/spot",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      params: {
        currency: "USD"
      }
    }

    const request = await axios.request(options)
    return request.data.data
  } 

  @action convertSatsToUsd = async (sats: number) => {
    const price = await this.getBitcoinPrice()
    const btcAmount = sats / 100000000 
    const balance = Number(price.amount) * btcAmount
    runInAction(() => this.balanceInUsd = balance)
    return balance
  }
}