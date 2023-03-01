import BigNumber from "bignumber.js";
import LRU from "lru-cache";

export class TransactionsBridge {
  
  maxVal: BigNumber;
  cache: LRU<string, BigNumber>;

  constructor(timeInt: number) {
    this.maxVal = BigNumber(0);
    this.cache = new LRU<string, BigNumber>({
      max: 10000,
      ttl: timeInt * 1000,
    });
  }

  addTransactions(txHash: string, value: BigNumber) {
    this.cache.set(txHash, value);
  }

  getTransactionsMaxAmount() {

    this.cache.forEach((value) => {
      if (value.isGreaterThan(this.maxVal)) this.maxVal = value;
    });

    return this.maxVal;
  }
}
