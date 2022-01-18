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

### Deploy Smart Contract
```shell
npx hardhat run scripts/deploy.js --network localhost
```
This command will deploy the smart contract to the blockchain.

<!--
Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
``` -->
