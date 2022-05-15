interface Invoice {
  amount: number;
  description: string;
}
  
export type BitcoinBayParamList = {
  Home: undefined;
  Receive: undefined;
  Send: Invoice;
  Camera: undefined;
  CreateInvoice: Invoice;
  Transactions: undefined; 
  Deals: undefined;
  Maps: undefined;
};
  