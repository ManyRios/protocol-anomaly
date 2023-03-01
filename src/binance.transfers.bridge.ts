import BigNumber from "bignumber.js";
import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";
import {
  BSC_TOKENHUB,
  BINANCE_BRIDGE_EVENT_TRANSFER_IN,
  BNB_DECIMALS,
  BINANCE_BRIDGE_EVENT_TRANSFER_OUT,
  WEEK,
} from "./constants";

import { createTransferOutFinding, createTransferInFinding } from "./findings";

import { TransactionsBridge } from "./utils";

const txCounter = new TransactionsBridge(WEEK);

const events = [
  BINANCE_BRIDGE_EVENT_TRANSFER_IN,
  BINANCE_BRIDGE_EVENT_TRANSFER_OUT,
];

 /**
  * This function returns a function that takes a transaction event and returns a promise that resolves
  * to an array of findings.
  * @returns A function that returns a function that returns a promise that returns an array of
  * findings.
  */
 const provideHandleTransaction = (): HandleTransaction => {
  return async function handleTransaction(txEv: TransactionEvent): Promise<Finding[]>{
    const findings: Finding[] = [];
    const bscTransferEvents = txEv.filterLog(events, BSC_TOKENHUB);

    if (!bscTransferEvents) return findings;

    bscTransferEvents.forEach((bscTransfers) => {
      const { from, hash: txHash } = txEv.transaction;

      const amount = new BigNumber(
        bscTransfers.args.amount.toString()
      ).dividedBy(10 ** BNB_DECIMALS);

      txCounter.addTransactions(txHash, amount);
            
      switch (bscTransfers.name) {
        case "transferOutSuccess":
          const val = txCounter.getTransactionsMaxAmount();
          findings.push(
            createTransferOutFinding(amount, from, txHash, val)
          );
          break;
        case "transferInSuccess":
          findings.push(createTransferInFinding(amount, from, txHash));
          break;
        default:
          break;
      }
    });
    return findings;
  };
};

export default {
    provideHandleTransaction,
  handleTransaction: provideHandleTransaction(),
};
