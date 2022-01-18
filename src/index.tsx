import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./state";

import { ethers } from "ethers";
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import { Ethereum } from "./types/interfaces";

/**
 * Contract Address
 */
const address: string = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

declare global {
  interface Window {
    ethereum: Ethereum
  }
}

const App: FC = () => {

  const [ userInput, setUserInput ] = useState<string>('This is a test');
  const [ greeting, setContractGreeting ] = useState<string | null>(null);
  const [ maskError, setMaskError ] = useState<string | null>(null);

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
      const contract = new ethers.Contract(address, Greeter.abi, provider);

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
        const contract = new ethers.Contract(address, Greeter.abi, signer);
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
