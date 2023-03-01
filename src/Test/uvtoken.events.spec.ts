import {
  Finding,
  FindingSeverity,
  FindingType,
  createTransactionEvent,
  HandleTransaction,
} from "forta-agent";
import { TestTransactionEvent } from "forta-agent-tools/lib/test";
import { createAddress } from "forta-agent-tools";
import uvToken from "../uvtoken.events";

import { UVTOKEN_ADDRESS, UVTOKEN_CONTRACT_ADDRESS } from "../constants";
import BigNumber from "bignumber.js";

describe("UvToken ", () => {
  let handleTransaction: HandleTransaction;
  let txEv: TestTransactionEvent;
  const mockTxEvent = createTransactionEvent({
    transaction: { hash: "" },
  } as TestTransactionEvent);

  beforeAll(async () => {
    txEv = new TestTransactionEvent();
    handleTransaction = uvToken.handleTransaction;
  });

  it("return empty finding if no event are captures", async () => {
    const findings = await handleTransaction(txEv);
    expect(findings).toStrictEqual([]);
  });

  it("uvToken agent should return the finding for the event captured ", async () => {
    const addr1 = createAddress("0x01");

    const mockEvent = {
      name: "Transfer",
      args: {
        from: UVTOKEN_ADDRESS,
        to: addr1,
        value: 0x13DB,
      },
      address: UVTOKEN_CONTRACT_ADDRESS,
    };
    mockTxEvent.filterLog = jest.fn().mockReturnValue([mockEvent]);
    const findings = await handleTransaction(mockTxEvent);
    const amount = BigNumber(mockEvent.args.value)
      .dividedBy(10 ** 18)
      .toFixed(2);

    expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
    expect(findings).toStrictEqual([
      Finding.fromObject({
        name: "UvToken Transfer",
        description: `Transfer has been made from UVtoken contract for an amount of ${amount} UVT`,
        alertId: "UVT-1",
        protocol: "UvToken",
        severity: FindingSeverity.High,
        type: FindingType.Suspicious,
        metadata: {
          from: UVTOKEN_ADDRESS,
          to: addr1,
          txHash: "",
        },
        addresses: [],
        labels: [],
      }),
    ]);
  });
});
