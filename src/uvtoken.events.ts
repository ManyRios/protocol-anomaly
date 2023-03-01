import BigNumber from "bignumber.js";
import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";
import { createUvtokenFinding } from "./findings";

import { UVTOKEN_ADDRESS, ERC20_TRANSFER_EVENT, UVTOKEN_CONTRACT_ADDRESS } from "./constants";


const provideHandleTransaction = (): HandleTransaction => {
  return async function handleTransaction(
    txEv: TransactionEvent
  ): Promise<Finding[]> {
    const findings: Finding[] = [];
    const erc20Transfers = txEv.filterLog(ERC20_TRANSFER_EVENT, UVTOKEN_CONTRACT_ADDRESS);
    if (!erc20Transfers) return findings;
    const { hash: txHash } = txEv.transaction;

    erc20Transfers.forEach((transfers) => {
      if (transfers.args.from !== UVTOKEN_ADDRESS ) return;
      const { from, to, value} = transfers.args;  

      const amount = BigNumber(value.toString())
        .dividedBy(10 ** 18)
        .toFixed(2);
      findings.push(createUvtokenFinding(amount, from, to, txHash));
    });
    return findings;
  };
};

export default {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(),
};
