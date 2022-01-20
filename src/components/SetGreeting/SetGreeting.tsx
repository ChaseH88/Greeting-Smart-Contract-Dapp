import React, { FC, useState } from "react";
import { ethers } from "ethers";

// Types
import { Ethereum } from '../../types/interfaces';

// Hooks
import { useAppState } from '../../hooks';

declare global {
  interface Window {
    ethereum: Ethereum
  }
}

interface SetGreetingProps {
  requestAccount: () => Promise<void>
}

const SetGreeting: FC<SetGreetingProps> = ({ requestAccount }): JSX.Element => {

  const [ userInput, setUserInput ] = useState<string>('This is a test');
  const { greeterAddress, contracts: { Greeter } } = useAppState();

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
        // fetchGreeting();
      }
      catch(err) {
        const error: any = err;
        console.error('ERROR! ', error);
        // setMaskError(error.message)
      }
    }
  }

  /**
   * Handles the state update for user input.
   * Also clears errors if any.
   * @param value the user input
   */
   const handleUpdate = (value: string) => {
    // setMaskError(null);
    setUserInput(value);
  }

  return (
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
  )
}

export { SetGreeting }
