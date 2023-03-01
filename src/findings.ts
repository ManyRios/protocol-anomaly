import BigNumber from "bignumber.js";
import { Finding, FindingSeverity, FindingType, ethers } from "forta-agent";
const AMOUNT_THRESHOLD = "100000";

/**
 * This function creates a Finding object with the given parameters and returns it.
 * @param {BigNumber} amount - BigNumber,
 * @param {string} from - The address that sent the transaction
 * @param {string} txHash - The transaction hash of the transaction that minted the BNB
 * @returns A Finding object
 */
export const createTransferInFinding = (
  amount: BigNumber,
  from: string,
  txHash: string
): Finding => {
  return Finding.fromObject({
    name: "Transfer In Binance Bridge",
    description: `${amount.toFixed(2)} BNB has been minted`,
    protocol: "Binance Bridge",
    alertId: "BSCBridge-1",
    severity: amount.isGreaterThan(AMOUNT_THRESHOLD)
      ? FindingSeverity.Critical
      : FindingSeverity.High,
    type: amount.isGreaterThan(AMOUNT_THRESHOLD)
      ? FindingType.Exploit
      : FindingType.Suspicious,
    metadata: {
      from: from,
      txHash: txHash,
      amount: amount.toFixed(2),
    },
  });
};

/**
 * This function creates a Finding object with the given parameters and returns it.
 * @param {BigNumber} amount - BigNumber,
 * @param {string} from - string,
 * @param {string} txHash - string,
 * @param {BigNumber} trHold - BigNumber - This is the threshold amount that you want to set for the
 * alert.
 * @returns A Finding object
 */
export const createTransferOutFinding = (
  amount: BigNumber,
  from: string,
  txHash: string,
  trHold: BigNumber
): Finding => {
  return Finding.fromObject({
    name: "Transfer Out Binance Bridge",
    description: `${amount.toFixed(2)} BNB has been swapped cross chain`,
    protocol: "Binance Bridge",
    alertId: "BSCBridge-2",
    severity: amount.isGreaterThan(trHold)
      ? FindingSeverity.High
      : FindingSeverity.Info,
    type: amount.isGreaterThan(trHold)
      ? FindingType.Suspicious
      : FindingType.Info,
    metadata: {
      from: from,
      txHash: txHash,
      amount: amount.toFixed(2),
    },
  });
};

/**
 * This function takes in 4 parameters and returns a Finding object with the parameters as metadata.
 * @param {string} amount - string,
 * @param {string} symb - The token symbol
 * @param {string} from - The address that sent the transaction
 * @param {string} to - address of the recipient
 * @param {string} txHash - string,
 * @returns A Finding object
 */
export const createPeakFinding = (
  amount: string,
  symb: string,
  from: string,
  to: string,
  txHash: string
) => {
  return Finding.fromObject({
    name: `Peak Defi Transfer`,
    description: `Transfer has been made by PeakDefi fund for an amount of ${amount} ${symb}`,
    alertId: "PEAK-1",
    protocol: "Peak Defi",
    severity: FindingSeverity.High,
    type: FindingType.Suspicious,
    metadata: {
      from,
      to,
      txHash: txHash,
    },
  });
};

export const createUvtokenFinding = (
  amount: string,
  from: string,
  to: string,
  txHash: string
) => {
  return Finding.fromObject({
    name: `UvToken Transfer`,
    description: `Transfer has been made from UVtoken contract for an amount of ${amount} UVT`,
    alertId: "UVT-1",
    protocol: "UvToken",
    severity: BigNumber(amount).isGreaterThan(1000000) ? FindingSeverity.Critical: FindingSeverity.High,
    type: BigNumber(amount).isGreaterThan(1000000) ? FindingType.Exploit : FindingType.Suspicious,
    metadata: {
      from,
      to,
      txHash: txHash,
    },
  });
};
