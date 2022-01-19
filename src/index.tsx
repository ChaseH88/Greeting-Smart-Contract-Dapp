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
const tokenAddress: string = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';

declare global {
  interface Window {
    ethereum: Ethereum
  }
}

const App: FC = () => {

  const [ userInput, setUserInput ] = useState<string>('This is a test');
  const [ greeting, setContractGreeting ] = useState<string | null>(null);
  const [ maskError, setMaskError ] = useState<string | null>(null);
  const [ userBalance, setUserBalance ] = useState<number | null>(null);

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
    await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
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
      const [ account ] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      setUserBalance(balance.toString());
    }
  }

  return (
    <Provider store={store}>
      <h1>
        Greeting Smart Contract Dapp
      </h1>
      <div>
        <button
          onClick={fetchGreeting}
        >
          Fetch Greeting
        </button>
        {greeting?.length && greeting}
      </div>
      <div>
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
        <button
            onClick={getBalance}
          >
            Get Balance
          </button>
          {userBalance &&
            <p>User Balance: {userBalance} APCH</p>
          }
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
