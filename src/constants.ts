import { Tokens } from "./types";

// Intervals in seconds
export const DAY = 86400;
export const WEEK = 604800;
export const MONTH = 2629743;
export const YEAR = 31556926;
//Binance bridge constants
export const BSC_TOKENHUB = "0x0000000000000000000000000000000000001004";
export const BSC_RELAYER_ADDRESS = "0x0000000000000000000000000000000000001006";
export const BSC_REGISTER_RELAYER_EVENT =
  "event relayerRegister(address _relayer)";
export const BINANCE_BRIDGE_EVENT_TRANSFER_IN =
  "event transferInSuccess(address bep20Addr, address refundAddr, uint256 amount)";
export const BINANCE_BRIDGE_EVENT_TRANSFER_OUT =
  "event transferOutSuccess(address bep20Addr, address senderAddr, uint256 amount, uint256 relayFee)";
export const BNB_DECIMALS = 18;

//HFD3395USQ4YAZU8M11WQI1SQUAVIWMWE1

//Peak defi constants
export const PEAKFUND_ADDRESS = "0x07cDB44fA1E7eCEb638c12A3451A3Dc9CE1400e4";
export const ERC20_TRANSFER_EVENT =
  "event Transfer(address indexed from, address indexed to, uint256 value)";

// UvToken constants
export const UVTOKEN_ADDRESS = "0x36F277165C8b1b80cC3418719BADB1864e2687bc"
export const UVTOKEN_CONTRACT_ADDRESS = "0x196eb1d21c05cc265ea0a1479e924e7983467838"

// TOKENS
export const tokens: Tokens[] = [
  {
    symb: "LINK",
    address: "0x514910771af9ca656af840dff83e8264ecf986ca",
    dec: 18,
  },
  {
    symb: "SUSHI",
    address: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
    dec: 18,
  },
  {
    symb: "BAT",
    address: "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
    dec: 18,
  },
  {
    symb: "MATIC",
    address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
    dec: 18,
  },
  {
    symb: "WBTC",
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    dec: 8,
  },
  {
    symb: "USDC",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    dec: 6,
  },
  {
    symb: "PEAK",
    address: "0x630d98424efe0ea27fb1b3ab7741907dffeaad78",
    dec: 8,
  },
];




