import { HandleTransaction, createTransactionEvent } from "forta-agent";
import { TestTransactionEvent } from "forta-agent-tools/lib/test";
import { provideHandleTransaction } from "../agent";

describe("the Agent listen to any event to return a findig", () => {
  let handleTransaction: HandleTransaction;
  const mockBridgeAgent = {
    handleTransaction: jest.fn(),
  };
  const mockRelayerAgent = {
    handleTransaction: jest.fn(),
  };

  const mockPeakAgent = {
    handleTransaction: jest.fn(),
  };
  const mockUvTokenAgent = {
    handleTransaction: jest.fn(),
  };

  const mockTxEvent = createTransactionEvent({
    transaction: { hash: "" },
  } as TestTransactionEvent);

  beforeAll(() => {
    handleTransaction = provideHandleTransaction(
      mockBridgeAgent,
      mockRelayerAgent,
      mockPeakAgent,
      mockUvTokenAgent
    );
  });

  it("returns findings  events", async () => {
    const mockFinding = { some: "finding" };
    mockBridgeAgent.handleTransaction.mockReturnValueOnce([mockFinding]);
    mockRelayerAgent.handleTransaction.mockReturnValueOnce([mockFinding]);
    mockPeakAgent.handleTransaction.mockReturnValueOnce([mockFinding]);
    mockUvTokenAgent.handleTransaction.mockReturnValueOnce([mockFinding]);

    const findings = await handleTransaction(mockTxEvent);

    expect(findings).toStrictEqual([mockFinding,mockFinding, mockFinding, mockFinding]);

    expect(mockBridgeAgent.handleTransaction).toHaveBeenCalledTimes(1);
    expect(mockBridgeAgent.handleTransaction).toHaveBeenCalledWith(mockTxEvent);

    expect(mockRelayerAgent.handleTransaction).toHaveBeenCalledTimes(1);
    expect(mockRelayerAgent.handleTransaction).toHaveBeenCalledWith(
      mockTxEvent
    );
    expect(mockPeakAgent.handleTransaction).toHaveBeenCalledTimes(1);
    expect(mockPeakAgent.handleTransaction).toHaveBeenCalledWith(mockTxEvent);

    expect(mockUvTokenAgent.handleTransaction).toHaveBeenCalledTimes(1);
    expect(mockUvTokenAgent.handleTransaction).toHaveBeenCalledWith(
      mockTxEvent
    );
  });
});
