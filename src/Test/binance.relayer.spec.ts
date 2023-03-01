import {Finding, FindingSeverity, FindingType, ethers} from 'forta-agent'
import {TestTransactionEvent} from 'forta-agent-tools/lib/test'
import binanceRelayer from "../binance.relayer";
import { createAddress } from 'forta-agent-tools';
import { BSC_RELAYER_ADDRESS } from '../constants';


  describe("binance relayer hub", () => {
    it("return empty finding if no event are captures", async ()=> {
        const txEv = new TestTransactionEvent() 
        const findings = await binanceRelayer.handleTransaction(txEv);

        expect(findings).toStrictEqual([])
    })

    it("When someone register as relayer the alert is fired", async () => {
      const add1 = createAddress('0x01')
      const txEv = new TestTransactionEvent()
        .setFrom(add1)
        .setTo(BSC_RELAYER_ADDRESS)
        .addEventLog(ethers.utils.EventFragment.from('relayerRegister(address)'), BSC_RELAYER_ADDRESS,
          [add1]
        )
      const finding: Finding[] = await binanceRelayer.handleTransaction(txEv)

      expect(finding).toStrictEqual([
        Finding.fromObject({
          name: "relayerRegister",
          description:
            `address ${add1} registered as relayer`,
          alertId: "BSCRelayer-1",
          protocol: "Binance smart chain",
          severity: FindingSeverity.High,
          type: FindingType.Info,
          metadata: {
            from: add1,
            txHash: "0x",
          },
          addresses: [],
          labels: [],
        })
      ])
    })
   
  })


  