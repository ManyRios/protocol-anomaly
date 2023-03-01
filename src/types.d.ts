import { Finding, TransactionEvent } from "forta-agent";
// types
export type Agent = {
    handleTransaction: (txEvent: TransactionEvent) => Promise<Finding[]>;
  };

export type Tokens = {
    symb: string;
    address: string;
    dec: number;
  };