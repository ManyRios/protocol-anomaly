# Protocol Anomaly detection Bot

## Description

This agent detects transactions from Binance Bridge, Peak Defi, UVToken

## Supported Chains

- Ethereum
- Binance Smart Chain

## Alerts

- BSCBridge-1
  - Fired when is minted bnb tokens and transfer it to an EOA or contract.
  - Severity is set to "high" when the value is less than a threshold, else is set to "critical".
  - Type is set to "suspicius" when the value is less than a threshold, else is set to "exploit".
- BSCBridge-2
  - Fired when regular transfers from the token hub contract is largest than max value stored from oldest transactions max a week. 
  - Severity is set to "high" when the value is greater than a threshold, else is set to "info".
  - Type is set to "suspicius" when the value is greater than a threshold, else is set to "info".
- BSCRelayer-1
  - Fired when someone register as relayer.
  - Severity is always set to "high".
  - Type is always set to "info".
- PEAK-1
  - Fired transfers from Peak Defi contract is in erc20 token(internal, not a regular behavior).
  - Severity is always set to "high".
  - Type is always set to "suspicius".
- UVT-1
  - Fired when transfer from UvToken contract in UVT(Universe Token) to an EOA or contract (not regular behavior).
  - Severity is set to "Critical" when the value is greater than 1000000UVT, else is set to "high".
  - Type is set to "exploit" when the value is greater than 1000000UVT, else is set to "suspicius"

## Test Data

The agent behaviour can be verified with the following transactions:

- 0xebf83628ba893d35b496121fb8201666b8e09f3cbadf0e269162baa72efe3b8b (Mint of BNB)
- 0x41ab8cb36a10ec491ed53d8d9f8513d5d09d19b35a07ae9277209f26fbadbb49 (Regular Transfer bridge, value less than threshold)
- 0xe1fe5fef26e93e6389910545099303e4fee774427d9e628d2aab80f1b53396d6 (Register as relayer)
- 0x937a03268cd13c1b7afb1dd621794d58e4d2674069e24caf8ab694c60c43cd41 (Transfer erc20 token chainlink)
- 0x54121ed538f27ffee2dbb232f9d9be33e39fdaf34adf993e5e019c00f6afd499 (Transfer UVT)
