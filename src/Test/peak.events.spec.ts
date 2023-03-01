import {
    Finding,
    FindingSeverity,
    FindingType,
    createTransactionEvent,
    HandleTransaction,
  } from "forta-agent";
  import { TestTransactionEvent } from "forta-agent-tools/lib/test";
  import { createAddress } from "forta-agent-tools";
  import peakEvents from "../peak.events";
  
  import { PEAKFUND_ADDRESS, tokens } from "../constants";
  import BigNumber from "bignumber.js";
  
  describe("Peak Defi ", () => {
    let handleTransaction: HandleTransaction;
    let txEv: TestTransactionEvent;
    const mockTxEvent = createTransactionEvent({
      transaction: { hash: "" },
    } as TestTransactionEvent);
  
    beforeAll(async () => {
      txEv = new TestTransactionEvent();
      handleTransaction = peakEvents.handleTransaction;
    });
  
    it("return empty finding if no event are captures", async () => {
      const findings = await handleTransaction(txEv);
      expect(findings).toStrictEqual([]);
    });
  
    it("Alert fired if tokens are transfered out of the peak defi contract", async () => {
      const addr1 = createAddress("0x01");
      const mockEvent = {
        name: "Transfer",
        args: {
          from: PEAKFUND_ADDRESS,
          to: addr1,
          value: 0x000000000000000000000000000000000000000000000113971372e03df3ec7c,
        },
        address: tokens[3].address,
      };
      mockTxEvent.filterLog = jest.fn().mockReturnValue([mockEvent]);
      const findings = await handleTransaction(mockTxEvent);
      const amount = BigNumber(mockEvent.args.value)
      .dividedBy(10 ** 18)
      .toFixed(2);
      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: 'Peak Defi Transfer',
          description: `Transfer has been made by PeakDefi fund for an amount of ${amount} MATIC`,
          alertId: 'PEAK-1',
          protocol: 'Peak Defi',
          severity: FindingSeverity.High,
          type: FindingType.Suspicious,
          metadata: {
            from: PEAKFUND_ADDRESS,
            to: addr1,
            txHash: "",
          },
          addresses: [],
          labels: [],
        }),
      ]);
    });
  });
  