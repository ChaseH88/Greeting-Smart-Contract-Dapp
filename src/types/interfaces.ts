import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json';
import Token from '../artifacts/contracts/Token.sol/Token.json';

export type GreeterContract = typeof Greeter;
export type TokenContract = typeof Token;

// Redux Action
export interface Action {
  type: string,
  payload: any
}

export interface Ethereum {
  chainId: string
  enable: any
  isMetaMask: true
  networkVersion: string
  request: (param: { method: 'eth_requestAccounts' } | any) => any
  selectedAddress: null | string
  send: any
  sendAsync: any
}

export interface ApplicationState {
  app: AppState
}

export interface AppState {
  greeterAddress: string
  tokenAddress: string
  contracts: {
    Greeter: GreeterContract
    Token: TokenContract
  }
}