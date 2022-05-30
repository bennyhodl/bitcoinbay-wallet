interface Invoice {
  amount: number;
  description: string;
  pay_req: string;
}
  
export type BitcoinBayParamList = {
  Home: undefined;
  CreateInvoice: undefined;
  Send: Invoice;
  Camera: undefined;
  Receive: Invoice;
  Transactions: undefined; 
  Deals: undefined;
  Maps: undefined;
  CreateWallet: undefined
  Wallet: undefined
};
  