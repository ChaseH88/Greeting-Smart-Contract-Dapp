import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./state";

import { ethers } from "ethers";

// Smart Contracts
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import Token from './artifacts/contracts/Token.sol/Token.json';

// Types
import { Ethereum } from "./types/interfaces";

/**
 * Contract Address
 */
const greeterAddress: string = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const tokenAddress: string = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

declare global {
  interface Window {
    ethereum: Ethereum
  }
}

const App: FC = () => {

  const [ userAccount, setUserAccount ] = useState<any>(null);
  const [ userInput, setUserInput ] = useState<string>('This is a test');
  const [ greeting, setContractGreeting ] = useState<string | null>(null);
  const [ maskError, setMaskError ] = useState<string | null>(null);
  const [ userBalance, setUserBalance ] = useState<number | null>(null);
  const [ coinsToSend, setCoinsToSend ] = useState<number>(0);
  const [ userToSend, setUserToSend ] = useState<string>('');

  /**
   * Handles the state update for user input.
   * Also clears errors if any.
   * @param value the user input
   */
  const handleUpdate = (value: string) => {
    setMaskError(null);
    setUserInput(value);
  }

  /**
   * Fetches the greeting from the blockchain
   */
  const fetchGreeting = async () => {
    setMaskError(null);
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);

      try {
        const data = await contract.greet();
        setContractGreeting(data);
      }
      catch(err) {
        const error: any = err;
        setMaskError(error.message)
      }
    }
  }

  /**
   * Prompts the user for their MetaMask account
   */
  const requestAccount = async () => {
    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    setUserAccount(account);
  }

  /**
   * Uses the state for userInput to update the smart contract
   */
  const setGreeting = async () => {
    if(!userInput) return;
    if(typeof window.ethereum !== 'undefined') {
      try {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
        const transaction = await contract.setGreeting(userInput);
        await transaction.wait();
        fetchGreeting();
      }
      catch(err) {
        const error: any = err;
        setMaskError(error.message)
      }
    }
  }

  const getBalance = async () => {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(userAccount);
      setUserBalance(balance.toString());
    }
  }

  const sendTokens = async () => {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userToSend, coinsToSend);
      console.log(transaction);
      return;
      transaction.wait();
      console.log(`${coinsToSend} tokens have been sent to ${userToSend}`)
    }
  }

  return (
    <Provider store={store}>
      <h1>
        Greeting Smart Contract Dapp
      </h1>
      <div>
        <h3>
          Fetch Greeting
        </h3>
        <button
          onClick={fetchGreeting}
        >
          Fetch Greeting
        </button>
        {greeting?.length && greeting}
      </div>
      <div>
        <h3>
          Set Greeting
        </h3>
        <input
          type="text"
          name="greeting"
          onChange={({ target: { value } }) => handleUpdate(value)}
          value={userInput}
        />
        <button
          onClick={setGreeting}
        >
          Set Greeting
        </button>
      </div>
      <div>
        <h3>
          Get Balance
        </h3>
        <button
          onClick={getBalance}
        >
          Get Balance
        </button>
        {userBalance &&
          <p>User Balance: {userBalance} APCH</p>
        }
      </div>
      <div>
        <h3>
          Send Tokens
        </h3>
        <input
          type="number"
          name="tokens"
          onChange={({ target: { value } }) => setCoinsToSend(+value)}
          value={coinsToSend}
        />
        <input
          type="text"
          name="userToSend"
          onChange={({ target: { value } }) => setUserToSend(value)}
          value={userToSend}
        />
        <button
          onClick={sendTokens}
        >
          Send Tokens!
        </button>
      </div>
      {maskError &&
        <div className="error">
          <h3>Error</h3>
          <p>{maskError}</p>
        </div>
      }
    </Provider>
  );
}

const root = document.querySelector("#app");
ReactDOM.render(<App />, root);
