import {
  Finding,
  FindingSeverity,
  FindingType,
  HandleTransaction,
  TransactionEvent,
} from "forta-agent";
import { BSC_RELAYER_ADDRESS, BSC_REGISTER_RELAYER_EVENT } from "./constants";

// Register as Relayer
const provideHandleTransaction = (): HandleTransaction => {
  return async function handleTransaction(
    txEv: TransactionEvent
  ): Promise<Finding[]> {
    const findings: Finding[] = [];
  
    const bscRelayerEvent = txEv.filterLog(
      BSC_REGISTER_RELAYER_EVENT,
      BSC_RELAYER_ADDRESS
    );

    // If no event is captured then return findings
    if (!bscRelayerEvent) return findings;
    
    bscRelayerEvent.forEach((bscRelayer) => {
      const { from, hash: txHash } = txEv.transaction;
      findings.push(
        Finding.fromObject({
          name: `${bscRelayer.name}`,
          description: `address ${from} registered as relayer`,
          alertId: "BSCRelayer-1",
          protocol: "Binance smart chain",
          severity: FindingSeverity.High,
          type: FindingType.Info,
          metadata: {
            from,
            txHash: txHash,
          },
        })
      );
    });
    return findings;
  };
};

export default {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(),
};
