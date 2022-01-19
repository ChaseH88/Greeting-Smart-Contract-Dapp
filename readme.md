# Dapp App

*Full readme coming soon!*

## **Scripts**

### Compile Smart Contracts
```shell
npx hardhat compile
```
This command will compile the smart contracts and add them to the `artifacts` folder in the `src` directory.

### Run Test Network
```shell
npx hardhat node
```
Running this command will start up the test network. It will provide 20 different addresses to work with.

### Deploy Smart Contract - Localhost
```shell
npx hardhat run scripts/deploy.js --network localhost
```
This command will deploy the smart contract to the blockchain locally.

### Deploy Smart Rinkeby
```shell
npx hardhat run scripts/deploy.js --network rinkeby
```
This command will deploy the smart contract to the blockchain on Rinkeby.

## Rinkeby Ethereum Test Network

### Links
  - https://ropsten.etherscan.io/ - Testnet Explorer
  - https://faucet.ropsten.be/ - Free Ethereum for testing.
  - https://infura.io/ - Hosted Ethereum node cluster for testing.