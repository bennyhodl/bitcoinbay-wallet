interface Invoice {
    amount: number;
    description: string;
  }
  
  export type BitcoinBayParamList = {
    Home: undefined;
    Receive: undefined;
    Send: undefined;
    Camera: undefined;
    Invoice: Invoice;
    PayInvoice: undefined;
  };
  