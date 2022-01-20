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

interface FetchGreetingProps {}

const FetchGreeting: FC<FetchGreetingProps> = (): JSX.Element => {

  const [ greeting, setContractGreeting ] = useState<string | null>(null);
  const { greeterAddress, contracts: { Greeter } } = useAppState();

  /**
   * Fetches the greeting from the blockchain
   */
  const fetchGreeting = async () => {
    // setMaskError(null);
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);

      try {
        const data = await contract.greet();
        setContractGreeting(data);
      }
      catch(err) {
        const error: any = err;
        console.error('ERROR! ', error);
        // setMaskError(error.message)
      }
    }
  }


  return (
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
  )
}

export { FetchGreeting }
