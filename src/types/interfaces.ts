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