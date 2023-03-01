import { Finding, TransactionEvent } from "forta-agent";
import relayerEvents from "./binance.relayer";
import bridgeTransfers from "./binance.transfers.bridge";
import peakDefi from "./peak.events";
import uvToken from "./uvtoken.events";
import { Agent } from "./types";

export const provideHandleTransaction = (
  bridge: Agent,
  relayer: Agent,
  peakDefi: Agent,
  uvToken: Agent
) => {
  return async (txEv: TransactionEvent): Promise<Finding[]> => {
    const findings = (
      await Promise.all([
        bridge.handleTransaction(txEv),
        relayer.handleTransaction(txEv),
        peakDefi.handleTransaction(txEv),
        uvToken.handleTransaction(txEv),
      ])
    ).flat();

    return findings;
  };
};

 module.exports = {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(
    relayerEvents,
    bridgeTransfers,
    peakDefi,
    uvToken
  ),
};
