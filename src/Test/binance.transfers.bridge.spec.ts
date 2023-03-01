import { Finding, FindingSeverity, FindingType, ethers } from "forta-agent";
import { TestTransactionEvent } from "forta-agent-tools/lib/test";
import bridgeTransfers from "../binance.transfers.bridge";
import { createAddress } from "forta-agent-tools";
import { BSC_TOKENHUB } from "../constants";
import BigNumber from "bignumber.js";

describe("BSC Bridge TokenHub", () => {
  it("return empty finding if no event is captured", async () => {
    const txEv = new TestTransactionEvent();
    const findings = await bridgeTransfers.handleTransaction(txEv);

    expect(findings).toStrictEqual([]);
  });

  it("Alert should fired if BNB has been minted", async () => {
    const addr1 = createAddress("0x01");
    const refundAddr = createAddress("0x02");
    const amount = 0;
    const txEv = new TestTransactionEvent()
      .setFrom(addr1)
      .addEventLog(
        ethers.utils.EventFragment.from(
          "transferInSuccess(address,address,uint256)"
        ),
        BSC_TOKENHUB,
        [addr1, refundAddr, amount]
      );
    const finding: Finding[] = await bridgeTransfers.handleTransaction(txEv);

    expect(finding).toStrictEqual([
      Finding.fromObject({
        name: "Transfer In Binance Bridge",
        description: `0.00 BNB has been minted`,
        alertId: "BSCBridge-1",
        protocol: "Binance Bridge",
        severity: FindingSeverity.High,
        type: FindingType.Suspicious,
        metadata: {
          from: addr1,
          txHash: "0x",
          amount: "0.00",
        },
        addresses: [],
        labels: [],
      }),
    ]);
  });

  it("Alert is fired with Out transfers from Hub", async () => {
    const bep20 = createAddress("0x01");
    const sender = createAddress("0x01");
    const relayFee = 4;
    const amount = 0;
    const txEv = new TestTransactionEvent()
      .setFrom(sender)
      .addEventLog(
        ethers.utils.EventFragment.from(
          "transferOutSuccess(address,address, uint256,uint256)"
        ),
        BSC_TOKENHUB,
        [bep20, sender, amount, relayFee]
      );
    const finding: Finding[] = await bridgeTransfers.handleTransaction(txEv);
    expect(finding).toStrictEqual([
      Finding.fromObject({
        name: "Transfer Out Binance Bridge",
        description: "0.00 BNB has been swapped cross chain",
        alertId: "BSCBridge-2",
        protocol: "Binance Bridge",
        severity: 1,
        type: 4,
        metadata: {
          from: "0x0000000000000000000000000000000000000001",
          txHash: "0x",
          amount: "0.00",
        },
        addresses: [],
        labels: [],
      }),
    ]);
  });
});
