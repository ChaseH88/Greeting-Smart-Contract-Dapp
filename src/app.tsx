import React, { FC, useEffect, useState } from "react";

// Types
import { Ethereum } from "./types/interfaces";

// Components
import { FetchGreeting } from './components/FetchGreeting';
import { GetBalance } from './components/GetBalance';
import { SendTokens } from './components/SendTokens';
import { SetGreeting } from './components/SetGreeting';

declare global {
  interface Window {
    ethereum: Ethereum
  }
}

const App: FC = () => {

  const [ userAccount, setUserAccount ] = useState<any>(null);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ appReady, setAppReady ] = useState<boolean>(false);

  /**
   * Prompts the user for their MetaMask account
   */
  const requestAccount = async () => {
    try {
      if(typeof window.ethereum == 'undefined') {
        throw new Error();
      }
      const [ account ] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setUserAccount(account);
      setAppReady(true);
    }
    catch(err){
      // console.error('ERROR', err);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => await requestAccount())();
  }, [window.ethereum]);

  if(loading){
    return (
      <div>
        <p>
          Loading...
        </p>
      </div>
    )
  }

  if(!loading && appReady){
    return (
      <div>
        <h1>
          Greeting Smart Contract Dapp
        </h1>
        <FetchGreeting />
        <SetGreeting requestAccount={requestAccount} />
        <GetBalance userAccount={userAccount} requestAccount={requestAccount} />
        <SendTokens requestAccount={requestAccount} />
      </div>
    );
  }

  return <div>ERROR</div>
}

export { App }
