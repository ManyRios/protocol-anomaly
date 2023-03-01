/**
 * It takes a transaction event, filters it for ERC20 transfers, and then creates a finding for each
 * transfer
 * @param {string} addr - string - The address of the token contract
 * @returns An object with two properties:
 * 1. provideHandleTransaction: a function that returns a function
 * 2. handleTransaction: a function
 */
import BigNumber from "bignumber.js";
import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";
import { createPeakFinding } from "./findings";
import { PEAKFUND_ADDRESS, ERC20_TRANSFER_EVENT, tokens } from "./constants";
import { Tokens } from "./types";

const getToken = (addr: string): Tokens => {
  let token: Tokens = { symb: "", address: "", dec: 0 };
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].address == addr) {
      token = tokens[i];
      break;
    }
  }
  return token;
};
const provideHandleTransaction = (): HandleTransaction => {
  return async function handleTransaction(
    txEv: TransactionEvent
  ): Promise<Finding[]> {
    const findings: Finding[] = [];

    const erc20Transfers = txEv.filterLog(ERC20_TRANSFER_EVENT);
    if (!erc20Transfers) return findings;
    const { hash: txHash } = txEv.transaction;
    erc20Transfers.forEach((transfers) => {
      if (transfers.args.from !== PEAKFUND_ADDRESS) return;
      const { from, to, value } = transfers.args;
      const token = getToken(transfers.address);
      const amount = BigNumber(value.toString())
        .dividedBy(10 ** token.dec)
        .toFixed(2);
      findings.push(createPeakFinding(amount, token.symb, from, to, txHash));
    });

    return findings;
  };
};

export default {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(),
};
