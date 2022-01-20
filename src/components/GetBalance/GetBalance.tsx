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

interface GetBalanceProps {
  userAccount: any
  requestAccount: () => Promise<void>
}

const GetBalance: FC<GetBalanceProps> = ({ userAccount, requestAccount }): JSX.Element => {

  const [ userBalance, setUserBalance ] = useState<number | null>(null);
  const { tokenAddress, contracts: { Token } } = useAppState();

  const getBalance = async () => {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(userAccount);
      setUserBalance(balance.toString());
    }
  }


  return (
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
  )
}

export { GetBalance }
